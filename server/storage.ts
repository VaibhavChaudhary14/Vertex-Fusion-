import { 
  users, alerts, simulations, knowledgeArticles, threatFeeds, 
  chatMessages, datasets, systemMetrics,
  type User, type UpsertUser, type Alert, type InsertAlert,
  type Simulation, type InsertSimulation, type KnowledgeArticle,
  type ThreatFeed, type ChatMessage, type InsertChatMessage,
  type Dataset, type InsertDataset
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  
  getAlerts(userId?: string, limit?: number): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  acknowledgeAlert(id: string): Promise<Alert | undefined>;
  getAlertsLast24h(): Promise<number>;
  
  getSimulations(userId: string): Promise<Simulation[]>;
  getSimulation(id: string): Promise<Simulation | undefined>;
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
  updateSimulation(id: string, data: Partial<Simulation>): Promise<Simulation | undefined>;
  
  getChatMessages(userId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  getDatasets(userId: string): Promise<Dataset[]>;
  createDataset(dataset: InsertDataset): Promise<Dataset>;
  
  getKnowledgeArticles(): Promise<KnowledgeArticle[]>;
  getThreatFeeds(limit?: number): Promise<ThreatFeed[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getAlerts(userId?: string, limit: number = 50): Promise<Alert[]> {
    if (userId) {
      return db.select().from(alerts)
        .where(eq(alerts.userId, userId))
        .orderBy(desc(alerts.createdAt))
        .limit(limit);
    }
    return db.select().from(alerts)
      .orderBy(desc(alerts.createdAt))
      .limit(limit);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async acknowledgeAlert(id: string): Promise<Alert | undefined> {
    const [alert] = await db
      .update(alerts)
      .set({ isAcknowledged: true })
      .where(eq(alerts.id, id))
      .returning();
    return alert;
  }

  async getAlertsLast24h(): Promise<number> {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await db.select({ count: sql<number>`count(*)` })
      .from(alerts)
      .where(gte(alerts.createdAt, yesterday));
    return result[0]?.count || 0;
  }

  async getSimulations(userId: string): Promise<Simulation[]> {
    return db.select().from(simulations)
      .where(eq(simulations.userId, userId))
      .orderBy(desc(simulations.createdAt));
  }

  async getSimulation(id: string): Promise<Simulation | undefined> {
    const [simulation] = await db.select().from(simulations).where(eq(simulations.id, id));
    return simulation;
  }

  async createSimulation(simulation: InsertSimulation): Promise<Simulation> {
    const [newSimulation] = await db.insert(simulations).values(simulation).returning();
    return newSimulation;
  }

  async updateSimulation(id: string, data: Partial<Simulation>): Promise<Simulation | undefined> {
    const [simulation] = await db
      .update(simulations)
      .set(data)
      .where(eq(simulations.id, id))
      .returning();
    return simulation;
  }

  async getChatMessages(userId: string): Promise<ChatMessage[]> {
    return db.select().from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values(message).returning();
    return newMessage;
  }

  async getDatasets(userId: string): Promise<Dataset[]> {
    return db.select().from(datasets)
      .where(eq(datasets.userId, userId))
      .orderBy(desc(datasets.createdAt));
  }

  async createDataset(dataset: InsertDataset): Promise<Dataset> {
    const [newDataset] = await db.insert(datasets).values(dataset).returning();
    return newDataset;
  }

  async getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return db.select().from(knowledgeArticles).orderBy(knowledgeArticles.category);
  }

  async getThreatFeeds(limit: number = 20): Promise<ThreatFeed[]> {
    return db.select().from(threatFeeds)
      .orderBy(desc(threatFeeds.publishedAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();

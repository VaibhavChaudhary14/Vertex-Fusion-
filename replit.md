# GridGuardian AI

## Overview

GridGuardian AI is a real-time cybersecurity monitoring and intrusion detection platform for smart power grids. The application implements a Graph Neural Network (GNN)-based detection system that fuses cyber and physical features to identify attacks on critical infrastructure. It provides a comprehensive SaaS solution including virtual lab simulations, AI-powered threat analysis, dataset generation, and interactive grid visualization.

The platform is designed for cybersecurity analysts, academic researchers, and utility operators who need to detect and respond to cyber-physical attacks such as False Data Injection (FDI), Ransomware (RW), Reverse Shell (RS), Brute Force (BF), and Backdoor (BD) attacks targeting power grid infrastructure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Wouter for client-side routing

**UI Component System**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows a custom dashboard system inspired by enterprise monitoring platforms (Grafana, Datadog) optimized for high information density and real-time data visualization.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Authentication state is managed through a custom `useAuth` hook.

**Styling Strategy**: Tailwind CSS with a custom design system defined in `tailwind.config.ts`. Supports both light and dark themes with CSS variables. Design guidelines emphasize scan-first design, information hierarchy, and operational stability for mission-critical monitoring.

**Key Design Principles**:
- Information hierarchy with critical alerts always visible
- 2-second comprehension target for system state
- Progressive disclosure for detailed data
- Consistent layouts to reduce cognitive load during incidents
- Typography system using Inter (UI) and JetBrains Mono (code/data)

### Backend Architecture

**Runtime**: Node.js with Express.js server framework

**API Design**: RESTful API with session-based authentication using Replit Auth (OpenID Connect). Routes are organized in `server/routes.ts` with middleware for authentication checks.

**Session Management**: PostgreSQL-backed sessions using `connect-pg-simple` with 7-day TTL. Sessions are required for Replit Auth integration.

**Business Logic**: Storage abstraction layer (`server/storage.ts`) implements data access patterns for users, alerts, simulations, chat messages, datasets, knowledge articles, and threat feeds.

**Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling. Server dependencies are selectively bundled to reduce cold start times.

### Data Storage

**Database**: PostgreSQL via Neon serverless with WebSocket connection support

**ORM**: Drizzle ORM for type-safe database operations with schema-first design

**Schema Design**:
- **Users**: Stores user profiles, roles (admin/analyst/researcher), subscription tiers (free/professional/enterprise), and API usage quotas
- **Alerts**: Attack detection events with severity levels, attack types, affected nodes, and acknowledgment status
- **Simulations**: Virtual lab configurations including topology (IEEE 14/30/118-bus), load profiles, observability modes, and GNN inference results
- **Knowledge Articles**: Categorized technical documentation with full-text content, tags, and related article references
- **Threat Feeds**: External cybersecurity intelligence with severity, category, and source attribution
- **Chat Messages**: Conversational AI interactions with role-based message tracking
- **Datasets**: Generated multi-modal cyber-physical datasets with metadata about topology, attack types, sample counts, and file formats
- **System Metrics**: Time-series performance data for model analytics

**Migration Strategy**: Drizzle Kit for schema migrations with PostgreSQL dialect

### Authentication & Authorization

**Authentication Provider**: Replit Auth using OpenID Connect (OIDC) with Passport.js strategy

**Session Strategy**: Server-side sessions stored in PostgreSQL with HTTP-only secure cookies. Session secret required via environment variable.

**User Management**: Automatic user upsert on login with profile data from OIDC claims. User roles determine access to admin features and API quotas based on subscription tier.

**Authorization Pattern**: Route-level middleware (`isAuthenticated`) checks for valid sessions. User ID extracted from request and used for data isolation.

### External Dependencies

**AI/ML Services**:
- **Google Gemini AI**: Chat assistant with Google Search grounding for threat intelligence queries. Requires `GEMINI_API_KEY` environment variable. Gracefully degrades if API key not provided.

**Database Services**:
- **Neon Serverless PostgreSQL**: Primary data store accessed via `DATABASE_URL` environment variable. Uses WebSocket connections for serverless compatibility.

**Authentication**:
- **Replit Auth**: OIDC provider for user authentication. Requires `ISSUER_URL`, `REPL_ID`, and `SESSION_SECRET` environment variables.

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner (development only)

**Frontend Libraries**:
- Recharts for data visualization (line charts, bar charts for model analytics)
- Radix UI for accessible component primitives
- Lucide React for iconography
- date-fns for time formatting

**Build Dependencies**:
- Vite for frontend bundling with React plugin
- esbuild for server bundling with selective dependency externalization
- TypeScript for type checking across client, server, and shared code

**Data Visualization**: Grid topology rendered using HTML Canvas with pan/zoom controls. Real-time metrics displayed using custom dashboard components with Recharts integration.

**WebSocket Consideration**: Architecture includes WebSocket support in database layer (Neon) but application-level WebSocket implementation for real-time updates is not yet implemented in current routing structure.
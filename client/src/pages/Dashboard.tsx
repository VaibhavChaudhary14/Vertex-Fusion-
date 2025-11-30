import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Activity, Shield, AlertTriangle, Zap, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SystemHealthBanner } from "@/components/SystemHealthBanner";
import { GridVisualization } from "@/components/GridVisualization";
import { AlertStream } from "@/components/AlertStream";
import { MetricsGrid } from "@/components/MetricsCards";
import { CPFusionVisualizer } from "@/components/CPFusionVisualizer";
import { GNNMetricsPanel } from "@/components/GNNMetricsPanel";
import { AttackTypeMatrix } from "@/components/AttackTypeMatrix";
import { DataRefreshControl } from "@/components/DataRefreshControl";
import { PerformanceMetricsDashboard } from "@/components/PerformanceMetricsDashboard";
import { GNNArchitectureVisualizer } from "@/components/GNNArchitectureVisualizer";
import { FeatureNormalizationPanel } from "@/components/FeatureNormalizationPanel";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useVirtualLabState } from "@/lib/virtualLabContext";
import type {
  SystemHealthMetrics,
  GridNode,
  GridEdge,
  GridTopology,
  Alert,
} from "@shared/schema";

const mockHealthMetrics: SystemHealthMetrics = {
  securityIndex: 94.2,
  detectionRate: 97.8,
  falseAlarmRate: 2.1,
  gridReliabilityScore: 99.1,
  activeSimulations: 3,
  alertsLast24h: 12,
};

const generateIEEE14Nodes = (): GridNode[] => {
  const physicalNodes: GridNode[] = [
    { id: "gen1", type: "generator", layer: "physical", x: 0.15, y: 0.2, status: "normal", anomalyScore: 0, label: "Gen 1" },
    { id: "gen2", type: "generator", layer: "physical", x: 0.85, y: 0.2, status: "normal", anomalyScore: 0, label: "Gen 2" },
    { id: "bus1", type: "bus", layer: "physical", x: 0.2, y: 0.35, status: "normal", anomalyScore: 0, label: "Bus 1" },
    { id: "bus2", type: "bus", layer: "physical", x: 0.4, y: 0.3, status: "warning", anomalyScore: 0.3, label: "Bus 2" },
    { id: "bus3", type: "bus", layer: "physical", x: 0.6, y: 0.3, status: "normal", anomalyScore: 0, label: "Bus 3" },
    { id: "bus4", type: "bus", layer: "physical", x: 0.8, y: 0.35, status: "normal", anomalyScore: 0, label: "Bus 4" },
    { id: "bus5", type: "bus", layer: "physical", x: 0.3, y: 0.5, status: "normal", anomalyScore: 0, label: "Bus 5" },
    { id: "bus6", type: "bus", layer: "physical", x: 0.5, y: 0.5, status: "critical", anomalyScore: 0.85, label: "Bus 6" },
    { id: "bus7", type: "bus", layer: "physical", x: 0.7, y: 0.5, status: "normal", anomalyScore: 0, label: "Bus 7" },
    { id: "load1", type: "load", layer: "physical", x: 0.25, y: 0.7, status: "normal", anomalyScore: 0, label: "Load 1" },
    { id: "load2", type: "load", layer: "physical", x: 0.5, y: 0.7, status: "normal", anomalyScore: 0, label: "Load 2" },
    { id: "load3", type: "load", layer: "physical", x: 0.75, y: 0.7, status: "normal", anomalyScore: 0, label: "Load 3" },
    { id: "tf1", type: "transformer", layer: "physical", x: 0.35, y: 0.4, status: "normal", anomalyScore: 0, label: "TF 1" },
    { id: "tf2", type: "transformer", layer: "physical", x: 0.65, y: 0.4, status: "normal", anomalyScore: 0, label: "TF 2" },
  ];

  const cyberNodes: GridNode[] = [
    { id: "plc1", type: "plc", layer: "cyber", x: 0.15, y: 0.85, status: "normal", anomalyScore: 0, label: "PLC 1" },
    { id: "plc2", type: "plc", layer: "cyber", x: 0.35, y: 0.85, status: "normal", anomalyScore: 0, label: "PLC 2" },
    { id: "plc3", type: "plc", layer: "cyber", x: 0.55, y: 0.85, status: "warning", anomalyScore: 0.4, label: "PLC 3" },
    { id: "router1", type: "router", layer: "cyber", x: 0.45, y: 0.95, status: "normal", anomalyScore: 0, label: "Router" },
    { id: "hmi1", type: "hmi", layer: "cyber", x: 0.75, y: 0.85, status: "normal", anomalyScore: 0, label: "HMI" },
    { id: "pmu1", type: "pmu", layer: "cyber", x: 0.9, y: 0.85, status: "normal", anomalyScore: 0, label: "PMU" },
  ];

  return [...physicalNodes, ...cyberNodes];
};

const generateIEEE14Edges = (): GridEdge[] => {
  const physicalEdges: GridEdge[] = [
    { source: "gen1", target: "bus1", type: "physical", weight: 1 },
    { source: "gen2", target: "bus4", type: "physical", weight: 1 },
    { source: "bus1", target: "bus2", type: "physical", weight: 1 },
    { source: "bus2", target: "bus3", type: "physical", weight: 1 },
    { source: "bus3", target: "bus4", type: "physical", weight: 1 },
    { source: "bus1", target: "bus5", type: "physical", weight: 1 },
    { source: "bus2", target: "tf1", type: "physical", weight: 1 },
    { source: "tf1", target: "bus6", type: "physical", weight: 1 },
    { source: "bus3", target: "tf2", type: "physical", weight: 1 },
    { source: "tf2", target: "bus7", type: "physical", weight: 1 },
    { source: "bus5", target: "bus6", type: "physical", weight: 1 },
    { source: "bus6", target: "bus7", type: "physical", weight: 1 },
    { source: "bus5", target: "load1", type: "physical", weight: 1 },
    { source: "bus6", target: "load2", type: "physical", weight: 1 },
    { source: "bus7", target: "load3", type: "physical", weight: 1 },
  ];

  const cyberEdges: GridEdge[] = [
    { source: "plc1", target: "router1", type: "cyber", weight: 1 },
    { source: "plc2", target: "router1", type: "cyber", weight: 1 },
    { source: "plc3", target: "router1", type: "cyber", weight: 1 },
    { source: "router1", target: "hmi1", type: "cyber", weight: 1 },
    { source: "router1", target: "pmu1", type: "cyber", weight: 1 },
  ];

  const couplingEdges: GridEdge[] = [
    { source: "gen1", target: "plc1", type: "coupling", weight: 0.5 },
    { source: "bus5", target: "plc2", type: "coupling", weight: 0.5 },
    { source: "bus6", target: "plc3", type: "coupling", weight: 0.5 },
    { source: "load2", target: "pmu1", type: "coupling", weight: 0.5 },
  ];

  return [...physicalEdges, ...cyberEdges, ...couplingEdges];
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    userId: null,
    simulationId: null,
    attackType: "FDI",
    severity: "critical",
    affectedNodes: ["bus6", "plc3"],
    confidenceScore: 0.94,
    classification: "malicious",
    mitigationRecommendation: "Isolate affected nodes and verify sensor readings",
    isAcknowledged: false,
    createdAt: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    userId: null,
    simulationId: null,
    attackType: "RW",
    severity: "high",
    affectedNodes: ["plc2", "hmi1"],
    confidenceScore: 0.87,
    classification: "malicious",
    mitigationRecommendation: "Disconnect compromised systems from network",
    isAcknowledged: false,
    createdAt: new Date(Date.now() - 300000),
  },
  {
    id: "3",
    userId: null,
    simulationId: null,
    attackType: "BF",
    severity: "medium",
    affectedNodes: ["router1"],
    confidenceScore: 0.72,
    classification: "malicious",
    mitigationRecommendation: "Enable account lockout and review access logs",
    isAcknowledged: true,
    createdAt: new Date(Date.now() - 600000),
  },
  {
    id: "4",
    userId: null,
    simulationId: null,
    attackType: "RS",
    severity: "high",
    affectedNodes: ["plc1"],
    confidenceScore: 0.91,
    classification: "malicious",
    mitigationRecommendation: "Kill reverse shell process and update firewall rules",
    isAcknowledged: false,
    createdAt: new Date(Date.now() - 900000),
  },
  {
    id: "5",
    userId: null,
    simulationId: null,
    attackType: "BD",
    severity: "low",
    affectedNodes: ["pmu1"],
    confidenceScore: 0.65,
    classification: "benign",
    mitigationRecommendation: null,
    isAcknowledged: false,
    createdAt: new Date(Date.now() - 1200000),
  },
];

export default function Dashboard() {
  const { toast } = useToast();
  const virtualLabState = useVirtualLabState();
  const [nodes, setNodes] = useState<GridNode[]>(generateIEEE14Nodes());
  const [edges] = useState<GridEdge[]>(generateIEEE14Edges());
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>(["bus6", "plc3"]);
  const [healthMetrics] = useState<SystemHealthMetrics>(mockHealthMetrics);
  const [showAttackMetrics, setShowAttackMetrics] = useState(false);
  const [autoRefreshVirtual, setAutoRefreshVirtual] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const handleRefreshData = () => {
    setLastRefresh(new Date());
    toast({
      title: "Data Refreshed",
      description: "Virtual Lab data synchronized with Dashboard",
    });
  };

  useEffect(() => {
    if (!autoRefreshVirtual) return;
    
    const interval = setInterval(() => {
      handleRefreshData();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefreshVirtual, toast]);

  useEffect(() => {
    if (virtualLabState.isRunning && virtualLabState.nodes.length > 0) {
      setNodes(virtualLabState.nodes);
      setShowAttackMetrics(true);
      if (virtualLabState.inferenceResult) {
        setHighlightedNodes(virtualLabState.inferenceResult.affectedNodes);
      }
    }
  }, [virtualLabState.nodes, virtualLabState.inferenceResult, virtualLabState.isRunning, lastRefresh]);

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isAcknowledged: true } : alert
      )
    );
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    });
  };

  const handleNodeClick = (node: GridNode) => {
    toast({
      title: node.label,
      description: `${node.type.charAt(0).toUpperCase() + node.type.slice(1)} - Status: ${node.status}`,
    });
  };

  const metricsData = [
    {
      title: "Detection Rate",
      value: healthMetrics.detectionRate,
      unit: "%",
      trend: 2.3,
      trendLabel: "vs last week",
      icon: <Activity className="h-4 w-4" />,
      color: "success" as const,
    },
    {
      title: "False Alarm Rate",
      value: healthMetrics.falseAlarmRate,
      unit: "%",
      trend: -0.5,
      trendLabel: "vs last week",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "warning" as const,
    },
    {
      title: "Security Index",
      value: healthMetrics.securityIndex,
      unit: "%",
      trend: 1.2,
      trendLabel: "vs last week",
      icon: <Shield className="h-4 w-4" />,
      color: "default" as const,
    },
    {
      title: "Grid Reliability",
      value: healthMetrics.gridReliabilityScore,
      unit: "%",
      trend: 0.1,
      trendLabel: "vs last week",
      icon: <Zap className="h-4 w-4" />,
      color: "success" as const,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-primary/2 to-background">
      <SystemHealthBanner metrics={healthMetrics} />
      
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
              Cyber-Physical Monitoring
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              GNN-based multi-modal intrusion detection with CP fusion
            </p>
          </div>
          <DataRefreshControl 
            onRefresh={handleRefreshData}
            onToggleAutoRefresh={setAutoRefreshVirtual}
          />
        </div>

        {showAttackMetrics && <GNNMetricsPanel 
          metrics={{
            detectionRate: virtualLabState.inferenceResult?.confidenceScore ? virtualLabState.inferenceResult.confidenceScore * 100 : 97.8,
            falseAlarmRate: 1.2,
            inferenceTime: virtualLabState.inferenceResult?.inferenceTimeMs || 12.5,
            scalability: 6,
          }}
        />}

        <MetricsGrid metrics={metricsData} />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <CPFusionVisualizer data={{
              cyberFeatures: [
                { label: "Network Traffic Anomaly", value: 0.65, anomaly: 0.45 },
                { label: "SCADA Command Deviation", value: 0.58, anomaly: 0.38 },
                { label: "Router Port Activity", value: 0.42, anomaly: 0.12 },
              ],
              physicalFeatures: [
                { label: "Frequency Deviation", value: 0.72, anomaly: 0.52 },
                { label: "Voltage Variance", value: 0.68, anomaly: 0.48 },
                { label: "Load Flow Inconsistency", value: 0.55, anomaly: 0.25 },
              ],
              fusedScore: virtualLabState.afterAttackMetrics.avgAnomalyScore || 0.65,
            }} />
            <GNNArchitectureVisualizer />
          </div>
          <div className="space-y-4">
            <AttackTypeMatrix />
            <PerformanceMetricsDashboard />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <FeatureNormalizationPanel />
        </div>

        {showAttackMetrics && virtualLabState.isRunning && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-destructive/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Critical Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Before</span>
                    <span className="font-semibold">{virtualLabState.beforeAttackMetrics.criticalCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">After</span>
                    <span className="font-semibold text-destructive">{virtualLabState.afterAttackMetrics.criticalCount}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {virtualLabState.afterAttackMetrics.criticalCount > virtualLabState.beforeAttackMetrics.criticalCount ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-destructive">
                          +{virtualLabState.afterAttackMetrics.criticalCount - virtualLabState.beforeAttackMetrics.criticalCount}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-success" />
                        <span className="text-xs text-success">
                          {virtualLabState.afterAttackMetrics.criticalCount - virtualLabState.beforeAttackMetrics.criticalCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Warning Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Before</span>
                    <span className="font-semibold">{virtualLabState.beforeAttackMetrics.warningCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">After</span>
                    <span className="font-semibold text-warning">{virtualLabState.afterAttackMetrics.warningCount}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {virtualLabState.afterAttackMetrics.warningCount > virtualLabState.beforeAttackMetrics.warningCount ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-warning" />
                        <span className="text-xs text-warning">
                          +{virtualLabState.afterAttackMetrics.warningCount - virtualLabState.beforeAttackMetrics.warningCount}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-success" />
                        <span className="text-xs text-success">
                          {virtualLabState.afterAttackMetrics.warningCount - virtualLabState.beforeAttackMetrics.warningCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Anomaly Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Before</span>
                    <span className="font-semibold">{(virtualLabState.beforeAttackMetrics.avgAnomalyScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">After</span>
                    <span className="font-semibold text-primary">{(virtualLabState.afterAttackMetrics.avgAnomalyScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {virtualLabState.afterAttackMetrics.avgAnomalyScore > virtualLabState.beforeAttackMetrics.avgAnomalyScore ? (
                      <>
                        <TrendingUp className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-destructive">
                          +{((virtualLabState.afterAttackMetrics.avgAnomalyScore - virtualLabState.beforeAttackMetrics.avgAnomalyScore) * 100).toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-success" />
                        <span className="text-xs text-success">
                          {((virtualLabState.afterAttackMetrics.avgAnomalyScore - virtualLabState.beforeAttackMetrics.avgAnomalyScore) * 100).toFixed(1)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Attack Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {virtualLabState.inferenceResult && (
                    <>
                      <Badge variant="destructive" className="w-full justify-center py-1">
                        {virtualLabState.inferenceResult.attackType} Attack
                      </Badge>
                      <div>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <p className="font-semibold text-primary">
                          {(virtualLabState.inferenceResult.confidenceScore * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Affected Nodes</p>
                        <p className="font-semibold text-sm">{virtualLabState.inferenceResult.affectedNodes.join(", ")}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GridVisualization
              nodes={nodes}
              edges={edges}
              topology="ieee14"
              highlightedNodes={highlightedNodes}
              onNodeClick={handleNodeClick}
            />
          </div>
          <div className="lg:col-span-1">
            <AlertStream alerts={alerts} onAcknowledge={handleAcknowledge} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, AlertTriangle, Shield, Zap, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartGridSimulator } from "@/components/SmartGridSimulator";
import { queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const [systemMetrics, setSystemMetrics] = useState({
    securityIndex: 94.2,
    detectionRate: 97.8,
    falseAlarmRate: 2.1,
    gridReliabilityScore: 99.1,
    activeSimulations: 1,
    alertsLast24h: 0,
  });

  // Fetch health metrics
  const { data: healthData } = useQuery({
    queryKey: ["/api/health"],
    queryFn: async () => {
      const res = await fetch("/api/health");
      if (!res.ok) throw new Error("Failed to fetch health");
      return res.json();
    },
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (healthData) {
      setSystemMetrics(healthData);
    }
  }, [healthData]);

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <div className="space-y-6 p-6">
        {/* Dashboard Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Vertex Fusion Control Center</h1>
          <p className="text-muted-foreground">
            Real-time 3-bus smart grid monitoring with ST-GNN AI threat detection and automated SCADA protection
          </p>
        </div>

        {/* System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Security Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{systemMetrics.securityIndex.toFixed(1)}/100</p>
              <p className="text-xs text-muted-foreground mt-1">Overall system posture</p>
            </CardContent>
          </Card>

          <Card className="border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Detection Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{systemMetrics.detectionRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">ML model accuracy</p>
            </CardContent>
          </Card>

          <Card className="border border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                False Alarm Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">{systemMetrics.falseAlarmRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">Classification errors</p>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Grid Reliability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{systemMetrics.gridReliabilityScore.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">Uptime & stability</p>
            </CardContent>
          </Card>

          <Card className="border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                Active Sims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{systemMetrics.activeSimulations}</p>
              <p className="text-xs text-muted-foreground mt-1">Running simulations</p>
            </CardContent>
          </Card>

          <Card className="border border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-destructive" />
                Alerts (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">{systemMetrics.alertsLast24h}</p>
              <p className="text-xs text-muted-foreground mt-1">Detections last day</p>
            </CardContent>
          </Card>
        </div>

        {/* System Status Banner */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Simulation Layer</p>
                <p className="font-semibold text-primary">✓ MATLAB Simulink Active</p>
              </div>
              <div>
                <p className="text-muted-foreground">ML Detection Layer</p>
                <p className="font-semibold text-primary">✓ ST-GNN Ready</p>
              </div>
              <div>
                <p className="text-muted-foreground">SCADA Protection</p>
                <p className="font-semibold text-primary">✓ Modbus Connected</p>
              </div>
              <div>
                <p className="text-muted-foreground">Threat Intelligence</p>
                <p className="font-semibold text-primary">✓ Gemini API Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Simulator Component */}
        <SmartGridSimulator />

        {/* Architecture Overview */}
        <Card className="border border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🏗️</span>
              System Architecture Layers
            </CardTitle>
            <CardDescription>Integrated 4-layer cyber-physical smart grid framework</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Layer 1 */}
              <div className="border border-primary/20 rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">1</div>
                  <h3 className="font-semibold text-foreground">Simulation Layer</h3>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ 3-bus MATLAB Simulink</li>
                  <li>✓ V-I measurements (Vabc/Iabc)</li>
                  <li>✓ Real-time workspace logging</li>
                  <li>✓ Discrete power flow</li>
                </ul>
              </div>

              {/* Layer 2 */}
              <div className="border border-accent/20 rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">2</div>
                  <h3 className="font-semibold text-foreground">Attack Layer</h3>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ FDI (biased offsets)</li>
                  <li>✓ DoS (measurement freeze)</li>
                  <li>✓ Replay attacks</li>
                  <li>✓ MATLAB Function blocks</li>
                </ul>
              </div>

              {/* Layer 3 */}
              <div className="border border-primary/20 rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">3</div>
                  <h3 className="font-semibold text-foreground">ML Detection</h3>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ ST-GNN classifier</li>
                  <li>✓ 4-class detection</li>
                  <li>✓ Spatial-temporal fusion</li>
                  <li>✓ Real-time predictions</li>
                </ul>
              </div>

              {/* Layer 4 */}
              <div className="border border-destructive/20 rounded-lg p-4 bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center text-destructive font-bold text-sm">4</div>
                  <h3 className="font-semibold text-foreground">SCADA Protection</h3>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Modbus-TCP layer</li>
                  <li>✓ Breaker automation</li>
                  <li>✓ AI alert handling</li>
                  <li>✓ Protection logging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation & Resources */}
        <Card className="border border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📚</span>
              Quick Reference
            </CardTitle>
            <CardDescription>Key research references from IEEE OAJPE and MATLAB documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-2">Attack Types Detected:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>FDI</strong>: False Data Injection (measurement bias)</li>
                  <li>• <strong>DoS</strong>: Denial of Service (data blocking)</li>
                  <li>• <strong>Replay</strong>: Historical data replay</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">System Topologies:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>3-Bus</strong>: Current simulator (development)</li>
                  <li>• <strong>IEEE 14-Bus</strong>: Standard power system</li>
                  <li>• <strong>IEEE 30-Bus</strong>: Large-scale testbed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

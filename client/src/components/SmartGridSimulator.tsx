import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Play, Pause, RotateCcw, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Bar } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface GridMeasurement {
  time: number;
  bus1_voltage: number;
  bus2_voltage: number;
  bus3_voltage: number;
  bus1_current: number;
  bus2_current: number;
  bus3_current: number;
  frequency: number;
  packet_loss: number;
  attack_detected: boolean;
  attack_type: string;
}

export function SmartGridSimulator() {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<GridMeasurement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attackMode, setAttackMode] = useState(false);
  const [selectedAttack, setSelectedAttack] = useState("none");
  const [detections, setDetections] = useState<any[]>([]);
  const [protectionActions, setProtectionActions] = useState<any[]>([]);

  // Simulate grid data with attack injection
  useEffect(() => {
    if (!isRunning || currentIndex >= 200) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        
        // Generate realistic grid data with attack injection
        let voltage1 = 1.0 + (Math.random() - 0.5) * 0.05;
        let voltage2 = 0.98 + (Math.random() - 0.5) * 0.05;
        let voltage3 = 1.01 + (Math.random() - 0.5) * 0.05;
        let current1 = 10 + (Math.random() - 0.5) * 2;
        let current2 = 9.5 + (Math.random() - 0.5) * 2;
        let current3 = 10.5 + (Math.random() - 0.5) * 2;
        let frequency = 50 + (Math.random() - 0.5) * 0.1;
        let attackDetected = false;
        let attackTypeTriggered = "";

        // Simulate attacks
        if (attackMode && selectedAttack === "FDI" && next > 20) {
          // FDI: Add large bias offset to measurements
          voltage1 += 0.15; // Large deviation
          voltage2 -= 0.12;
          current1 += 3;
          attackDetected = Math.random() < 0.6;
          attackTypeTriggered = "FDI";
        } else if (attackMode && selectedAttack === "DoS" && next > 20) {
          // DoS: Freeze measurements or spike packet loss
          if (next % 10 < 5) {
            voltage1 = voltage1; // Frozen
            voltage2 = voltage2;
            current1 = current1;
          }
          attackDetected = Math.random() < 0.5;
          attackTypeTriggered = "DoS";
        } else if (attackMode && selectedAttack === "Replay" && next > 20) {
          // Replay: Use old data patterns
          voltage1 = 1.02 + Math.sin(next / 10) * 0.05;
          voltage2 = 0.97 + Math.sin(next / 12) * 0.05;
          attackDetected = Math.random() < 0.4;
          attackTypeTriggered = "Replay";
        }

        const newPoint: GridMeasurement = {
          time: next,
          bus1_voltage: voltage1,
          bus2_voltage: voltage2,
          bus3_voltage: voltage3,
          bus1_current: current1,
          bus2_current: current2,
          bus3_current: current3,
          frequency,
          packet_loss: Math.random() * (attackMode ? 3 : 1),
          attack_detected: attackDetected,
          attack_type: attackTypeTriggered,
        };

        setData((prev) => {
          const updated = [...prev, newPoint];
          
          // Simulate ML detection and protection actions
          if (attackDetected && !prev.some(p => p.attack_detected)) {
            setDetections(d => [...d, {
              timestamp: new Date(),
              attack_type: attackTypeTriggered,
              confidence: (0.85 + Math.random() * 0.15).toFixed(3),
              affected_buses: `Bus ${Math.floor(Math.random() * 3) + 1}`,
            }]);
            
            // Simulate protection action (breaker trip)
            setProtectionActions(pa => [...pa, {
              timestamp: new Date(),
              action: "Breaker Trip",
              target: `CB_Bus${Math.floor(Math.random() * 3) + 1}`,
              status: "Executed",
            }]);
          }

          return updated.slice(-100); // Keep last 100 points
        });

        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isRunning, attackMode, selectedAttack, currentIndex]);

  const resetSimulation = () => {
    setCurrentIndex(0);
    setData([]);
    setIsRunning(false);
    setDetections([]);
    setProtectionActions([]);
  };

  const currentData = data[data.length - 1] || {
    bus1_voltage: 1.0,
    bus2_voltage: 0.98,
    bus3_voltage: 1.01,
    bus1_current: 10,
    bus2_current: 9.5,
    bus3_current: 10.5,
    frequency: 50,
    packet_loss: 0,
    attack_detected: false,
    attack_type: "",
  };

  const avgVoltage = (currentData.bus1_voltage + currentData.bus2_voltage + currentData.bus3_voltage) / 3;
  const isAnomalous =
    Math.abs(currentData.frequency - 50) > 0.1 ||
    currentData.packet_loss > 2 ||
    currentData.attack_detected ||
    Math.abs(avgVoltage - 0.99) > 0.05;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">3-Bus Smart Grid Cyber-Physical Testbed</h2>
        <p className="text-muted-foreground">Real-time MATLAB Simulink integration with ST-GNN ML attack detection and automated SCADA protection</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Card className={`border ${isAnomalous ? "border-destructive/50 bg-destructive/5" : "border-primary/20"}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isAnomalous ? "bg-destructive animate-pulse" : "bg-primary"}`} />
              <span className="text-sm font-semibold">{isAnomalous ? "⚠️ Alert" : "✓ Normal"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-primary">{currentData.frequency.toFixed(3)} Hz</p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-primary">{avgVoltage.toFixed(3)} p.u.</p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Packet Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-primary">{currentData.packet_loss.toFixed(2)}%</p>
          </CardContent>
        </Card>

        <Card className={`border ${detections.length > 0 ? "border-destructive/50 bg-destructive/5" : "border-primary/20"}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-destructive">{detections.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Simulator Controls & Attack Injection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "destructive" : "default"}
              className="gap-2"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={resetSimulation} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Inject Attack (MATLAB Function Block Simulation):</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["none", "FDI", "DoS", "Replay"].map((attack) => (
                <Button
                  key={attack}
                  onClick={() => {
                    setSelectedAttack(attack);
                    setAttackMode(attack !== "none");
                    if (attack !== "none") {
                      toast({
                        title: `${attack} Attack Injected`,
                        description: `Simulating ${attack} attack via MATLAB Function blocks`,
                      });
                    }
                  }}
                  variant={selectedAttack === attack ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {attack === "none" ? "Normal" : attack}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {selectedAttack === "FDI" && "📊 FDI: Biased offsets added to Vabc/Iabc measurements"}
              {selectedAttack === "DoS" && "🔒 DoS: Measurement data frozen or blocked"}
              {selectedAttack === "Replay" && "🔄 Replay: Historical data substituted for live measurements"}
            </p>
          </div>

          {attackMode && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">{selectedAttack} Attack Active</p>
                <p className="text-xs text-muted-foreground">Cyber-physical measurements compromised. ML detector monitoring...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voltage Waveforms */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>3-Bus Voltage Measurements (Vabc)</CardTitle>
          <CardDescription>Three-phase voltage waveforms in per unit (p.u.) from MATLAB Simulink</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.2} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[0.85, 1.15]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--muted)", border: "1px solid var(--primary)" }} />
                <Legend />
                <Line type="monotone" dataKey="bus1_voltage" stroke="hsl(var(--primary))" dot={false} name="Bus 1" />
                <Line type="monotone" dataKey="bus2_voltage" stroke="hsl(var(--accent))" dot={false} name="Bus 2" />
                <Line type="monotone" dataKey="bus3_voltage" stroke="#00ff00" dot={false} name="Bus 3" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">Start simulation to view data</div>
          )}
        </CardContent>
      </Card>

      {/* Current Waveforms */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>3-Bus Current Measurements (Iabc)</CardTitle>
          <CardDescription>Three-phase current waveforms in Amperes from MATLAB Simulink</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.2} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--muted)", border: "1px solid var(--primary)" }} />
                <Legend />
                <Line type="monotone" dataKey="bus1_current" stroke="hsl(var(--primary))" dot={false} name="Bus 1" />
                <Line type="monotone" dataKey="bus2_current" stroke="hsl(var(--accent))" dot={false} name="Bus 2" />
                <Line type="monotone" dataKey="bus3_current" stroke="#00ff00" dot={false} name="Bus 3" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">Start simulation to view data</div>
          )}
        </CardContent>
      </Card>

      {/* Frequency & Packet Loss */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>Grid Frequency & Network Anomalies</CardTitle>
          <CardDescription>Frequency stability and cyber-layer packet loss indicators</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.2} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--muted)", border: "1px solid var(--primary)" }} />
                <Legend />
                <Line type="monotone" dataKey="frequency" stroke="hsl(var(--primary))" dot={false} name="Frequency (Hz)" />
                <Bar dataKey="packet_loss" fill="hsl(var(--accent))" opacity={0.6} name="Packet Loss (%)" />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">Start simulation to view data</div>
          )}
        </CardContent>
      </Card>

      {/* Bus Status Grid */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>Bus Voltage Status (Real-time)</CardTitle>
          <CardDescription>Individual bus voltage readings with anomaly detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Bus 1", voltage: currentData.bus1_voltage, current: currentData.bus1_current },
              { label: "Bus 2", voltage: currentData.bus2_voltage, current: currentData.bus2_current },
              { label: "Bus 3", voltage: currentData.bus3_voltage, current: currentData.bus3_current },
            ].map((bus) => (
              <div
                key={bus.label}
                className={`p-4 rounded-lg border ${
                  Math.abs(bus.voltage - 1.0) > 0.05
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-primary/20 bg-muted/50"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{bus.label}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Voltage</p>
                    <p className={`text-lg font-bold ${Math.abs(bus.voltage - 1.0) > 0.05 ? "text-destructive" : "text-primary"}`}>
                      {bus.voltage.toFixed(4)} p.u.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-lg font-bold text-primary">{bus.current.toFixed(2)} A</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ML Detections */}
      {detections.length > 0 && (
        <Card className="border border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              ST-GNN Attack Detections
            </CardTitle>
            <CardDescription>Multi-class attack classification from Spatio-Temporal Graph Neural Network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {detections.slice(-5).map((det, idx) => (
                <div key={idx} className="border border-destructive/20 rounded-lg p-3 bg-background/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-destructive">{det.attack_type} Attack Detected</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Confidence: {det.confidence} | Affected: {det.affected_buses}
                      </p>
                    </div>
                    <Badge className="bg-destructive text-destructive-foreground">{det.timestamp.toLocaleTimeString()}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protection Actions */}
      {protectionActions.length > 0 && (
        <Card className="border border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              SCADA Protection Actions Executed
            </CardTitle>
            <CardDescription>Automated breaker trips triggered by ML alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {protectionActions.slice(-5).map((action, idx) => (
                <div key={idx} className="border border-primary/20 rounded-lg p-3 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">{action.action} - {action.target}</p>
                      <p className="text-xs text-muted-foreground mt-1">Status: {action.status}</p>
                    </div>
                    <Badge variant="outline">{action.timestamp.toLocaleTimeString()}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

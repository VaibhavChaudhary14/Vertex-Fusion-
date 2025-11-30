import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Play, Pause, RotateCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface GridData {
  time: number;
  frequency: number;
  bus1_voltage: number;
  bus2_voltage: number;
  bus3_voltage: number;
  bus4_voltage: number;
  bus5_voltage: number;
  bus6_voltage: number;
  packet_loss: number;
  attack_detected: boolean;
}

export function SmartGridSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<GridData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attackMode, setAttackMode] = useState(false);
  const [selectedAttack, setSelectedAttack] = useState("none");

  // Simulate grid data
  useEffect(() => {
    if (!isRunning || currentIndex >= 100) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        
        // Generate realistic grid data
        const newPoint: GridData = {
          time: next,
          frequency: 50 + (Math.random() - 0.5) * 0.1,
          bus1_voltage: 1.0 + (Math.random() - 0.5) * 0.05,
          bus2_voltage: 0.98 + (Math.random() - 0.5) * 0.05,
          bus3_voltage: 1.01 + (Math.random() - 0.5) * 0.05,
          bus4_voltage: 0.99 + (Math.random() - 0.5) * 0.05,
          bus5_voltage: 1.0 + (Math.random() - 0.5) * 0.05,
          bus6_voltage: 0.97 + (Math.random() - 0.5) * 0.05,
          packet_loss: Math.random() * 2,
          attack_detected: attackMode && selectedAttack !== "none" && Math.random() < 0.3,
        };

        setData((prev) => {
          const updated = [...prev, newPoint];
          return updated.slice(-50); // Keep last 50 points
        });

        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, attackMode, selectedAttack, currentIndex]);

  const resetSimulation = () => {
    setCurrentIndex(0);
    setData([]);
    setIsRunning(false);
  };

  const currentData = data[data.length - 1] || {
    frequency: 50,
    bus1_voltage: 1.0,
    bus2_voltage: 0.98,
    bus3_voltage: 1.01,
    bus4_voltage: 0.99,
    bus5_voltage: 1.0,
    bus6_voltage: 0.97,
    packet_loss: 0,
    attack_detected: false,
  };

  const isAnomalous =
    Math.abs(currentData.frequency - 50) > 0.05 ||
    currentData.packet_loss > 1.5 ||
    currentData.attack_detected ||
    Math.abs(currentData.bus1_voltage - 1.0) > 0.04;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Smart Grid Real-Time Simulator</h2>
        <p className="text-muted-foreground">Live 6-bus system monitoring with attack injection capability</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`border ${isAnomalous ? "border-destructive/50 bg-destructive/5" : "border-primary/20"}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isAnomalous ? "bg-destructive animate-pulse" : "bg-primary"}`} />
              <span className="text-sm font-semibold">{isAnomalous ? "⚠️ Anomaly" : "✓ Normal"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{currentData.frequency.toFixed(3)} Hz</p>
            <p className="text-xs text-muted-foreground mt-1">Nominal: 50 Hz</p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Bus Voltage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {((currentData.bus1_voltage + currentData.bus2_voltage + currentData.bus3_voltage + 
                currentData.bus4_voltage + currentData.bus5_voltage + currentData.bus6_voltage) / 6).toFixed(3)} p.u.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Nominal: 1.0 p.u.</p>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Packet Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{currentData.packet_loss.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">Network health</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎮</span>
            Simulator Controls
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
            <p className="text-sm font-semibold">Attack Injection:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["none", "FDI", "RW", "RS"].map((attack) => (
                <Button
                  key={attack}
                  onClick={() => {
                    setSelectedAttack(attack);
                    setAttackMode(attack !== "none");
                  }}
                  variant={selectedAttack === attack ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {attack === "none" ? "Normal" : attack}
                </Button>
              ))}
            </div>
          </div>

          {attackMode && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">{selectedAttack} Attack Active</p>
                <p className="text-xs text-muted-foreground">Injecting anomalies in system measurements</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-time Voltage Chart */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>Bus Voltages (Real-time)</CardTitle>
          <CardDescription>6-bus system voltage measurements in per unit (p.u.)</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.2} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[0.9, 1.1]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--muted)", border: "1px solid var(--primary)" }} />
                <Legend />
                <Line type="monotone" dataKey="bus1_voltage" stroke="hsl(var(--primary))" dot={false} />
                <Line type="monotone" dataKey="bus2_voltage" stroke="hsl(var(--accent))" dot={false} />
                <Line type="monotone" dataKey="bus3_voltage" stroke="#00ff00" dot={false} />
                <Line type="monotone" dataKey="bus4_voltage" stroke="#00ffff" dot={false} />
                <Line type="monotone" dataKey="bus5_voltage" stroke="#ff00ff" dot={false} />
                <Line type="monotone" dataKey="bus6_voltage" stroke="#ffff00" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <p>Start simulation to view real-time data</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Frequency Chart */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>Grid Frequency</CardTitle>
          <CardDescription>Real-time frequency deviation from 50 Hz nominal</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.2} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[49.9, 50.1]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--muted)", border: "1px solid var(--primary)" }} />
                <Line type="monotone" dataKey="frequency" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">
              <p>Start simulation to view frequency data</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bus Status Grid */}
      <Card className="border border-primary/20 bg-card">
        <CardHeader>
          <CardTitle>Bus Voltage Status</CardTitle>
          <CardDescription>Individual bus voltage readings (p.u.)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Bus 1", value: currentData.bus1_voltage },
              { label: "Bus 2", value: currentData.bus2_voltage },
              { label: "Bus 3", value: currentData.bus3_voltage },
              { label: "Bus 4", value: currentData.bus4_voltage },
              { label: "Bus 5", value: currentData.bus5_voltage },
              { label: "Bus 6", value: currentData.bus6_voltage },
            ].map((bus) => (
              <div
                key={bus.label}
                className={`p-4 rounded-lg border ${
                  Math.abs(bus.value - 1.0) > 0.04
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-primary/20 bg-muted/50"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{bus.label}</p>
                <p className={`text-2xl font-bold mt-2 ${Math.abs(bus.value - 1.0) > 0.04 ? "text-destructive" : "text-primary"}`}>
                  {bus.value.toFixed(4)}
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {Math.abs(bus.value - 1.0) > 0.04 ? "⚠️ Anomaly" : "✓ Normal"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

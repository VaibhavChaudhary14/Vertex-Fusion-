import { Link } from "wouter";
import {
  Shield,
  Activity,
  FlaskConical,
  BookOpen,
  MessageSquareText,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Interactive D3.js visualization of cyber-physical grid topology with live node health status and sub-second updates via WebSocket.",
  },
  {
    icon: FlaskConical,
    title: "Virtual Lab",
    description:
      "Simulate IEEE 14/30/118-bus systems, inject attacks (RW, FDI, RS, BF, BD), and observe GNN detection in a safe environment.",
  },
  {
    icon: MessageSquareText,
    title: "AI Threat Analyst",
    description:
      "Gemini-powered chatbot with Google Search grounding for conversational threat intelligence and mitigation recommendations.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:
      "Comprehensive documentation on attack types, GNN theory, smart grid protocols (SCADA, Modbus/TCP, IEC 61850).",
  },
];

const stats = [
  { value: "26%", label: "Faster Detection", description: "vs. benchmark models" },
  { value: "16%", label: "DR Improvement", description: "with CP fusion" },
  { value: "<20ms", label: "Inference Time", description: "real-time classification" },
  { value: "1-2%", label: "Partial Loss", description: "under reduced observability" },
];

const benefits = [
  "GNN-based multi-modal intrusion detection",
  "Cyber-physical data fusion for enhanced accuracy",
  "Support for IEEE 14, 30, and 118-bus topologies",
  "Detection of advanced threats: Ransomware, Reverse Shell, Backdoor",
  "Role-based access for operators, analysts, and researchers",
  "Dataset generation and model analytics tools",
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Vertex Fusion</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="/api/login">
              <Button data-testid="button-sign-in">Sign In</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container max-w-7xl mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Based on IEEE OAJPE Research
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Detect Cyber-Physical Attacks{" "}
                <span className="text-primary">26% Faster</span> with GNN Fusion
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Vertex Fusion brings cutting-edge Graph Neural Network research to real-world
                smart grid security. Fuse cyber and physical features for superior threat detection.
              </p>
              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex items-center justify-center gap-4">
                  <a href="/signup">
                    <Button size="lg" data-testid="button-get-started">
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                  <a href="/api/login">
                    <Button variant="outline" size="lg" data-testid="button-sign-in-existing">
                      Sign In
                    </Button>
                  </a>
                </div>
                <a href="/signup" className="flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" data-testid="button-create-account-alt">
                    <SiGoogle className="h-4 w-4 mr-2" />
                    Or create account with Google
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-medium">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A comprehensive suite of tools for smart grid cybersecurity research and operations
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover-elevate transition-colors">
                  <CardHeader>
                    <div className="rounded-md p-2 bg-primary/10 w-fit mb-2">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Built on Peer-Reviewed Research
                </h2>
                <p className="text-muted-foreground mb-6">
                  GridGuardian AI implements the GNN-based intrusion detection system from 
                  "Cyber-Physical Fusion for GNN-Based Attack Detection in Smart Power Grids" 
                  (IEEE Open Access Journal of Power and Energy, 2025).
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Chebyshev Graph Convolution</div>
                      <div className="text-sm text-muted-foreground">
                        Multi-layer GNN architecture for spatial-temporal features
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-success/10">
                      <BarChart3 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold">Multi-Modal Fusion</div>
                      <div className="text-sm text-muted-foreground">
                        Combines cyber (network logs) and physical (SCADA/PMU) data
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-2 bg-warning/10">
                      <Users className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <div className="font-semibold">Role-Based Access</div>
                      <div className="text-sm text-muted-foreground">
                        Tailored for operators, analysts, and academic researchers
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Grid?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join utility operators, cybersecurity analysts, and academic researchers using 
              GridGuardian AI to detect and prevent cyber-physical attacks.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="/api/login">
                <Button size="lg" data-testid="button-start-free">
                  Start Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <Button variant="outline" size="lg" data-testid="button-contact-sales">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold">GridGuardian AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                GNN-powered intrusion detection for smart power grids.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Dashboard</li>
                <li>Virtual Lab</li>
                <li>Knowledge Base</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Research Paper</li>
                <li>Dataset Downloads</li>
                <li>Model Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>Built on research from IEEE OAJPE 2025. Not affiliated with the original authors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
import { InteractiveCyberSpace } from "@/components/InteractiveCyberSpace";

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
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3 float-in">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Vertex Fusion
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="/api/login">
              <Button className="hover-elevate" data-testid="button-sign-in">Sign In</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Interactive Cyber Space Section */}
        <section className="relative py-8 overflow-hidden">
          <InteractiveCyberSpace />
        </section>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-secondary/5 to-transparent" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full filter blur-3xl liquid-blob opacity-60" />
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full filter blur-3xl liquid-blob opacity-50" />
          
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6 stagger-in">
              <Badge variant="secondary" className="mb-4 fade-in-up">
                Based on IEEE OAJPE Research
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight fade-in-up">
                Detect Cyber-Physical Attacks{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  26% Faster
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up">
                Vertex Fusion brings cutting-edge Graph Neural Network research to real-world
                smart grid security. Fuse cyber and physical features for superior threat detection.
              </p>
              <div className="flex flex-col items-center gap-4 pt-4 fade-in-up">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a href="/signup">
                    <Button size="lg" className="hover-elevate bg-gradient-to-r from-primary to-secondary" data-testid="button-get-started">
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                  <a href="/api/login">
                    <Button variant="outline" size="lg" className="hover-elevate" data-testid="button-sign-in-existing">
                      Sign In
                    </Button>
                  </a>
                </div>
                <a href="/signup" className="flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover-elevate" data-testid="button-create-account-alt">
                    <SiGoogle className="h-4 w-4 mr-2" />
                    Or create account with Google
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-card/50 to-background">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4 stagger-in">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-lg bg-card border border-primary/20 hover-elevate group">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mt-2">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-12 stagger-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in-up">
                Powerful Features for Enterprise Security
              </h2>
              <p className="text-muted-foreground fade-in-up">
                Everything you need to detect and respond to cyber-physical threats in real-time
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-in">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Card key={i} className="border-primary/20 hover-elevate group overflow-hidden shimmer">
                    <CardHeader>
                      <div className="p-2 w-fit rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-20 bg-card/30">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12 stagger-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in-up">
                Why Choose Vertex Fusion?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto stagger-in">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 hover:bg-background border border-primary/10 hover-elevate fade-in-up">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl liquid-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-secondary/30 to-transparent rounded-full filter blur-3xl liquid-blob" />
          
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-6 stagger-in">
              <h2 className="text-4xl md:text-5xl font-bold fade-in-up">
                Ready to Secure Your Grid?
              </h2>
              <p className="text-lg text-muted-foreground fade-in-up">
                Join enterprise security teams protecting critical infrastructure with AI-powered intrusion detection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 fade-in-up">
                <a href="/signup">
                  <Button size="lg" className="hover-elevate bg-gradient-to-r from-primary to-secondary" data-testid="button-get-started-cta">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <a href="/api/login">
                  <Button variant="outline" size="lg" className="hover-elevate" data-testid="button-sign-in-cta">
                    Sign In
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Vertex Fusion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Research-backed GNN intrusion detection for smart grids
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

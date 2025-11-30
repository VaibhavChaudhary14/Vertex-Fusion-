import { Link } from "wouter";
import {
  Shield,
  Activity,
  FlaskConical,
  BookOpen,
  MessageSquareText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdvancedCyberScene } from "@/components/AdvancedCyberScene";
import { LiquidMorphShape } from "@/components/LiquidMorphShape";

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Interactive D3.js visualization with live node health status and sub-second updates via WebSocket.",
  },
  {
    icon: FlaskConical,
    title: "Virtual Lab",
    description:
      "Simulate IEEE 14/30/118-bus systems and observe GNN detection in a safe environment.",
  },
  {
    icon: MessageSquareText,
    title: "AI Threat Analyst",
    description:
      "Gemini-powered chatbot with conversational threat intelligence and mitigation recommendations.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description:
      "Comprehensive documentation on attack types, GNN theory, and smart grid protocols.",
  },
];

const stats = [
  { value: "26%", label: "Faster Detection" },
  { value: "97.8%", label: "Detection Rate" },
  { value: "<30ms", label: "Latency" },
  { value: "80+", label: "Samples/sec" },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <Button className="hover-elevate" data-testid="button-sign-in">
                Sign In
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero with Advanced 3D Scene */}
        <section className="relative py-8 px-4 overflow-hidden">
          <div className="container max-w-7xl mx-auto">
            {/* 3D Cyber Scene Canvas */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <AdvancedCyberScene />
            </div>

            {/* Hero Text Content */}
            <div className="max-w-3xl mx-auto text-center space-y-6 stagger-in">
              <Badge variant="secondary" className="mb-4 fade-in-up">
                Based on IEEE OAJPE Research
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight fade-in-up">
                Detect Cyber-Physical Attacks{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
                  26% Faster
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto fade-in-up">
                Enterprise-grade GNN-powered intrusion detection for smart grids. Fuse cyber and
                physical features for superior threat detection.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center gap-4 pt-4 fade-in-up">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a href="/signup">
                    <Button
                      size="lg"
                      className="hover-elevate bg-gradient-to-r from-primary to-secondary"
                      data-testid="button-get-started"
                    >
                      Create Account
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                  <a href="/api/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="hover-elevate"
                      data-testid="button-sign-in-existing"
                    >
                      Sign In
                    </Button>
                  </a>
                </div>
                <a href="/signup">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover-elevate"
                  >
                    <SiGoogle className="h-4 w-4 mr-2" />
                    Or sign up with Google
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Liquid Morph Background Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-card/30 to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <LiquidMorphShape />
          </div>

          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            {/* Stats Grid */}
            <div className="mb-16">
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg bg-card/50 backdrop-blur border border-primary/20 hover-elevate fade-in-up text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent fade-in-up">
                Powerful Features for Enterprise Security
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={i}
                      className="border-primary/20 hover-elevate group overflow-hidden shimmer fade-in-up"
                    >
                      <CardHeader>
                        <div className="p-3 w-fit rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 mb-4">
                          <Icon className="h-6 w-6 text-primary" />
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
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full filter blur-3xl liquid-blob opacity-30 pointer-events-none" />

          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 fade-in-up">
              Why Choose Vertex Fusion?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                "GNN-based multi-modal intrusion detection",
                "Cyber-physical data fusion for enhanced accuracy",
                "Support for IEEE 14, 30, and 118-bus topologies",
                "Detection of advanced threats: Ransomware, Reverse Shell, Backdoor",
                "Role-based access for operators, analysts, and researchers",
                "Dataset generation and model analytics tools",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background/50 hover:bg-background border border-primary/10 hover-elevate fade-in-up"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full filter blur-3xl liquid-blob opacity-40" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full filter blur-3xl liquid-blob opacity-30" />

          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-6 stagger-in">
              <h2 className="text-4xl md:text-5xl font-bold fade-in-up">Ready to Secure Your Grid?</h2>
              <p className="text-lg text-muted-foreground fade-in-up">
                Join enterprise security teams protecting critical infrastructure with AI-powered
                intrusion detection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 fade-in-up">
                <a href="/signup">
                  <Button
                    size="lg"
                    className="hover-elevate bg-gradient-to-r from-primary to-secondary"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <a href="/api/login">
                  <Button variant="outline" size="lg" className="hover-elevate">
                    Sign In
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-8">
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

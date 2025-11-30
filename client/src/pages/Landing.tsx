import { Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedHeroText } from "@/components/AnimatedHeroText";
import { NewLandingHero } from "@/components/NewLandingHero";

const stats = [
  { value: "26%", label: "Faster" },
  { value: "97.8%", label: "Accurate" },
  { value: "<30ms", label: "Latency" },
  { value: "80+", label: "Ops/sec" },
];

export default function Landing() {
  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
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

      <main className="w-full">
        {/* Animated Hero Section */}
        <AnimatedHeroText />

        {/* Stats Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary to-transparent rounded-full filter blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-secondary to-transparent rounded-full filter blur-3xl" />
          </div>

          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur hover-elevate fade-in-up"
                  style={{
                    animation: `fade-in-up 0.6s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <NewLandingHero />

        {/* Testimonial/Trust Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />

          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="fade-in-up">
                  Trusted by Security Teams
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold fade-in-up">
                  Protecting{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Critical Infrastructure
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground fade-in-up">
                  Deployed across enterprise utility companies detecting cyber-physical threats in
                  real-time
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-6 py-8">
                {[
                  { number: "50+", text: "Power Utilities" },
                  { number: "10K+", text: "Daily Detections" },
                  { number: "99.9%", text: "Uptime" },
                ].map((metric, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg bg-card/50 border border-primary/20 fade-in-up"
                    style={{
                      animation: `fade-in-up 0.6s ease-out ${i * 0.1}s both`,
                    }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{metric.number}</div>
                    <div className="text-sm text-muted-foreground">{metric.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in-up">
              Powerful Capabilities
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "GNN Architecture",
                  desc: "Advanced graph neural networks for cyber-physical fusion",
                },
                {
                  title: "Real-Time Processing",
                  desc: "Sub-30ms latency with WebSocket streaming",
                },
                {
                  title: "Virtual Lab",
                  desc: "Safe testing environment for IEEE topologies",
                },
                {
                  title: "Attack Simulation",
                  desc: "5 attack types including RW, FDI, RS, BF, BD",
                },
                {
                  title: "AI Analysis",
                  desc: "Gemini-powered threat intelligence engine",
                },
                {
                  title: "Scalability",
                  desc: "Distributed processing with hardware acceleration",
                },
              ].map((cap, i) => (
                <Card
                  key={i}
                  className="border-primary/20 hover-elevate bg-card/50 backdrop-blur fade-in-up group"
                  style={{
                    animation: `fade-in-up 0.6s ease-out ${i * 0.08}s both`,
                  }}
                >
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{cap.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cap.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Highlight */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-card/20 to-transparent">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <Badge variant="secondary">Research-Backed</Badge>
                <h2 className="text-4xl md:text-5xl font-bold">
                  IEEE OAJPE Foundation
                </h2>
                <p className="text-lg text-muted-foreground">
                  Built on peer-reviewed research for intrusion detection in smart grids using
                  graph neural networks
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Multi-Modal Fusion",
                    points: [
                      "Cyber data integration",
                      "Physical sensor inputs",
                      "Temporal correlation analysis",
                      "Real-time state estimation",
                    ],
                  },
                  {
                    title: "Advanced Detection",
                    points: [
                      "Graph-based anomaly detection",
                      "Online learning capabilities",
                      "Slow injection detection",
                      "Attack localization",
                    ],
                  },
                ].map((section, i) => (
                  <Card
                    key={i}
                    className="border-primary/20 bg-card/50 backdrop-blur fade-in-up p-8"
                    style={{
                      animation: `fade-in-up 0.6s ease-out ${i * 0.1}s both`,
                    }}
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />

          <div className="container max-w-3xl mx-auto px-4 relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold fade-in-up">
                Start Protecting Your Grid Today
              </h2>
              <p className="text-xl text-muted-foreground fade-in-up">
                Deploy Vertex Fusion in minutes. No credit card required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 fade-in-up">
              <a href="/signup">
                <Button size="lg" className="hover-elevate bg-gradient-to-r from-primary to-secondary">
                  Create Free Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
              <a href="/api/login">
                <Button variant="outline" size="lg" className="hover-elevate">
                  Sign In
                </Button>
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              Enterprise deployments available. Contact us for custom solutions.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-12 mt-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Research
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Vertex Fusion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Vertex Fusion. IEEE OAJPE Research-backed GNN intrusion detection.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

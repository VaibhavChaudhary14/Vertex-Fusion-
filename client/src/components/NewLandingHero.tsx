import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Real-Time Detection",
    description: "Sub-second GNN-powered threat analysis with D3.js visualization",
  },
  {
    title: "Virtual Lab",
    description: "Simulate IEEE 14/30/118-bus systems safely in the cloud",
  },
  {
    title: "AI Threat Analyst",
    description: "Gemini-powered conversational intelligence and recommendations",
  },
  {
    title: "Enterprise Grade",
    description: "Cyber-physical data fusion with 97.8% detection accuracy",
  },
];

const benefits = [
  "GNN-based multi-modal intrusion detection",
  "Cyber-physical data fusion for accuracy",
  "IEEE 14, 30, and 118-bus support",
  "Advanced threat detection (Ransomware, Shell, Backdoor)",
  "Role-based access control",
  "Dataset generation and analytics",
];

export function NewLandingHero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Features Grid Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary" className="fade-in-up">
              Powered by IEEE OAJPE Research
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold fade-in-up">
              Enterprise Security{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="border-primary/20 group hover-elevate shimmer fade-in-up bg-card/50 backdrop-blur"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose Us</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 fade-in-up">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-center">
        <div className="container max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Secure Your Grid?</h2>
          <p className="text-lg text-muted-foreground">
            Join enterprise security teams protecting critical infrastructure
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="/signup">
              <Button size="lg" className="hover-elevate">
                Create Account
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
      </section>
    </div>
  );
}

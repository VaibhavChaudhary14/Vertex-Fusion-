import { useEffect, useRef } from "react";

export function AnimatedHeroText() {
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textContainer = textRef.current;
    if (!canvas || !textContainer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const text = "Detect Cyber-Physical Attacks";
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background animated grid
      ctx.strokeStyle = "rgba(124, 58, 255, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(time * 0.5) * 5, 0);
        ctx.lineTo(x + Math.sin(time * 0.5) * 5, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.cos(time * 0.3) * 5);
        ctx.lineTo(canvas.width, y + Math.cos(time * 0.3) * 5);
        ctx.stroke();
      }

      // Animated particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time * 0.3 + i * 0.5) * canvas.width) / 2 + canvas.width / 2;
        const y = (Math.cos(time * 0.2 + i * 0.7) * canvas.height) / 2 + canvas.height / 2;
        const size = Math.sin(time * 0.5 + i) * 1.5 + 2;

        ctx.fillStyle = `rgba(124, 58, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 200, 200, ${0.2 + Math.sin(time * 0.7 + i) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Animated lines connecting particles
      for (let i = 0; i < 15; i++) {
        const x1 = (Math.sin(time * 0.3 + i * 0.8) * canvas.width) / 2 + canvas.width / 2;
        const y1 = (Math.cos(time * 0.2 + i * 0.9) * canvas.height) / 2 + canvas.height / 2;
        const x2 = (Math.sin(time * 0.3 + i * 0.8 + 2) * canvas.width) / 2 + canvas.width / 2;
        const y2 = (Math.cos(time * 0.2 + i * 0.9 + 2) * canvas.height) / 2 + canvas.height / 2;

        ctx.strokeStyle = `rgba(0, 200, 200, ${0.15 + Math.sin(time + i) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Pulsing glow rings
      for (let i = 0; i < 3; i++) {
        const radius = 100 + i * 80 + Math.sin(time * 0.5 + i) * 30;
        const opacity = 0.1 + Math.sin(time * 0.7 + i * 1.5) * 0.1;

        ctx.strokeStyle = `rgba(124, 58, 255, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30, 10, 60, 0.95) 0%, rgba(10, 5, 30, 0.98) 100%)",
        }}
      />

      {/* Text container */}
      <div ref={textRef} className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
        {/* Main hero text with animation */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span
            className="inline-block animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, rgba(124,58,255,1) 0%, rgba(0,200,200,1) 50%, rgba(186,118,255,1) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 3s ease infinite, float 3s ease-in-out infinite",
            }}
          >
            Detect
          </span>
          <br />
          <span
            className="inline-block"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,200,200,1) 0%, rgba(124,58,255,1) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 3s ease infinite reverse, glitch 0.3s ease-in-out infinite",
            }}
          >
            Cyber-Physical
          </span>
          <br />
          <span
            className="inline-block"
            style={{
              background:
                "linear-gradient(45deg, rgba(186,118,255,1) 0%, rgba(0,200,200,1) 50%, rgba(124,58,255,1) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 3s ease infinite, wave 2s ease-in-out infinite",
            }}
          >
            Attacks
          </span>
        </h1>

        {/* Subtext with shimmer effect */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          <span
            style={{
              animation: "shimmer 2s ease-in-out infinite",
              background:
                "linear-gradient(90deg, transparent, rgba(0, 200, 200, 0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          >
            Enterprise-grade GNN-powered intrusion detection for smart grids
          </span>
        </p>

        {/* CTA Buttons with hover effects */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a href="/signup">
            <button
              className="px-8 py-4 rounded-lg font-bold relative overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, rgb(124, 58, 255) 0%, rgb(0, 200, 200) 100%)",
                animation: "pulse-border 2s ease-in-out infinite",
              }}
            >
              <span className="relative z-10">Create Account</span>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: "shimmer-button 2s ease-in-out infinite",
                }}
              />
            </button>
          </a>
          <a href="/api/login">
            <button
              className="px-8 py-4 rounded-lg font-bold border-2 backdrop-blur"
              style={{
                borderColor: "rgba(0, 200, 200, 0.5)",
                animation: "border-glow 2s ease-in-out infinite",
              }}
            >
              Sign In
            </button>
          </a>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 200% center; }
          50% { background-position: -200% center; }
        }
        @keyframes shimmer-button {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 10px rgba(124, 58, 255, 0.5), 0 0 20px rgba(0, 200, 200, 0.3); }
          50% { box-shadow: 0 0 20px rgba(124, 58, 255, 0.7), 0 0 30px rgba(0, 200, 200, 0.5); }
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 200, 200, 0.3), inset 0 0 10px rgba(0, 200, 200, 0.1); }
          50% { box-shadow: 0 0 20px rgba(0, 200, 200, 0.5), inset 0 0 15px rgba(0, 200, 200, 0.2); }
        }
      `}</style>
    </div>
  );
}

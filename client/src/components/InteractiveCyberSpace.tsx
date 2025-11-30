import { useEffect, useRef, useState } from "react";

export function InteractiveCyberSpace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-96 w-full overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent perspective"
      style={{ perspective: "1200px" }}
    >
      {/* Central rotating orb */}
      <div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/60 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-2 rounded-full border border-secondary/40 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
          <div className="absolute inset-4 rounded-full border border-accent/30 animate-pulse" />

          {/* Center sphere with gradient */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-60 blur-md" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-tl from-primary via-transparent to-secondary opacity-40" />
        </div>
      </div>

      {/* Floating cyber nodes */}
      <div
        className="absolute top-1/4 left-1/4 w-12 h-12 rounded-lg"
        style={{
          background: "linear-gradient(135deg, rgba(124, 58, 255, 0.6), rgba(186, 118, 255, 0.3))",
          transform: `translateZ(${mousePos.x * 20}px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: "0 0 30px rgba(124, 58, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(124, 58, 255, 0.5)",
        }}
      />

      <div
        className="absolute top-2/3 right-1/4 w-10 h-10 rounded"
        style={{
          background: "linear-gradient(135deg, rgba(186, 118, 255, 0.5), rgba(124, 58, 255, 0.2))",
          transform: `translateZ(${-mousePos.x * 15}px) rotateX(${-mousePos.y * 0.2}deg)`,
          transition: "transform 0.2s ease-out",
          boxShadow: "0 0 20px rgba(186, 118, 255, 0.3)",
          border: "1px solid rgba(186, 118, 255, 0.4)",
        }}
      />

      <div
        className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(0, 200, 200, 0.7), rgba(0, 150, 200, 0.3))",
          transform: `translateZ(${mousePos.x * 25}px) scale(${1 + Math.sin(Date.now() / 1000) * 0.1})`,
          transition: "transform 0.12s ease-out",
          boxShadow: "0 0 25px rgba(0, 200, 200, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(0, 200, 200, 0.6)",
        }}
      />

      {/* Particle field */}
      <div
        ref={particlesRef}
        className="absolute inset-0"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.sin(i) * 40 + 50}%`,
              top: `${Math.cos(i) * 40 + 50}%`,
              background: i % 3 === 0 ? "rgba(124, 58, 255, 0.8)" : i % 3 === 1 ? "rgba(0, 200, 200, 0.8)" : "rgba(255, 255, 255, 0.6)",
              boxShadow: i % 3 === 0 ? "0 0 10px rgba(124, 58, 255, 0.8)" : i % 3 === 1 ? "0 0 8px rgba(0, 200, 200, 0.8)" : "0 0 6px rgba(255, 255, 255, 0.6)",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(124, 58, 255, 0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="75%" y1="65%" x2="50%" y2="50%" stroke="rgba(0, 200, 200, 0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="50%" y1="35%" x2="50%" y2="50%" stroke="rgba(186, 118, 255, 0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Glow layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x / 2}% ${50 + mousePos.y / 2}%, rgba(124, 58, 255, 0.1) 0%, transparent 70%)`,
          transition: "background 0.3s ease-out",
        }}
      />
    </div>
  );
}

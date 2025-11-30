import { useEffect, useRef, useState } from "react";

interface Vector2 {
  x: number;
  y: number;
}

export function AdvancedCyberScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<Vector2>({ x: 0, y: 0 });
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
    }>
  >([]);
  const mouseTrailRef = useRef<Array<Vector2>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      vz: (Math.random() - 0.5) * 1,
      size: Math.random() * 2 + 1,
      color: ["rgba(124, 58, 255, 0.8)", "rgba(0, 200, 200, 0.8)", "rgba(255, 255, 255, 0.6)"][
        Math.floor(Math.random() * 3)
      ],
    }));

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        mouseTrailRef.current.push({ x, y });
        if (mouseTrailRef.current.length > 20) mouseTrailRef.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid background
      ctx.strokeStyle = "rgba(124, 58, 255, 0.1)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Keep Z within bounds to prevent negative radius
        if (p.z < -50) p.z = 100;
        if (p.z > 100) p.z = -50;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Dampen velocity to prevent chaotic movement
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Mouse attraction with distance check
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          p.vx += (dx / dist) * 0.3;
          p.vy += (dy / dist) * 0.3;
        }

        // Size based on Z depth - ensure always positive
        const scale = Math.max(0.1, 100 / (100 + Math.max(0, p.z)));
        const size = Math.max(0.5, p.size * scale);

        // Draw particle with safe radius
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = p.color.replace("0.8", "0.3");
        ctx.lineWidth = Math.max(0.5, size);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size + 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw mouse trail with glow
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < mouseTrailRef.current.length - 1; i++) {
        const p1 = mouseTrailRef.current[i];
        const p2 = mouseTrailRef.current[i + 1];

        ctx.strokeStyle = `rgba(124, 58, 255, ${0.3 * (i / mouseTrailRef.current.length)})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Draw connections to nearest neighbors
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        let nearestDist = Infinity;
        let nearest = null;

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150 && dist < nearestDist) {
            nearestDist = dist;
            nearest = p2;
          }
        }

        if (nearest) {
          ctx.strokeStyle = `rgba(0, 200, 200, ${0.2 * (1 - nearestDist / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(nearest.x, nearest.y);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mousePos]);

  return (
    <div ref={containerRef} className="relative w-full h-96 overflow-hidden rounded-xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "linear-gradient(135deg, rgba(20, 5, 50, 0.8) 0%, rgba(10, 30, 60, 0.8) 100%)",
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

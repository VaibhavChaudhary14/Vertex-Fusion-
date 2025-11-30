import { useEffect, useRef, useState } from "react";

export function LiquidMorphShape() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector("path");
    if (!path) return;

    let time = 0;
    const animate = () => {
      time += 0.01;
      const width = svg.clientWidth;
      const height = svg.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      // Create morphing blob path
      const points = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const baseRadius = Math.min(width, height) * 0.25;
        const noise =
          Math.sin(time + i) * 20 +
          Math.sin(time * 0.5 + i * 2) * 15 +
          Math.sin(time * 0.3 + i * 3) * 10;

        const x = centerX + Math.cos(angle) * (baseRadius + noise);
        const y = centerY + Math.sin(angle) * (baseRadius + noise);
        points.push([x, y]);
      }

      // Create smooth curve through points
      let pathData = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 1; i < points.length; i++) {
        const p0 = points[(i - 1 + points.length) % points.length];
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];

        const cp1x = p0[0] + (p1[0] - p0[0]) * 0.5;
        const cp1y = p0[1] + (p1[1] - p0[1]) * 0.5;
        const cp2x = p1[0] + (p2[0] - p1[0]) * 0.5;
        const cp2y = p1[1] + (p2[1] - p1[1]) * 0.5;

        pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1[0]} ${p1[1]}`;
      }
      pathData += " Z";

      if (path) {
        path.setAttribute("d", pathData);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox="0 0 400 300"
      style={{ cursor: "crosshair" }}
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(124, 58, 255, 0.6)" />
          <stop offset="50%" stopColor="rgba(0, 200, 200, 0.4)" />
          <stop offset="100%" stopColor="rgba(186, 118, 255, 0.5)" />
        </linearGradient>
        <filter id="blobGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        fill="url(#blobGradient)"
        filter="url(#blobGlow)"
        style={{
          opacity: 0.7,
          mixBlendMode: "screen",
        }}
      />
    </svg>
  );
}

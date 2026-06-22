import { useEffect, useState } from "react";

interface StageProps {
  children: React.ReactNode;
}

// Wrapper 1200x675 escalado proporcionalmente sem scroll.
export default function Stage({ children }: StageProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / 1200, window.innerHeight / 675);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 1200,
          height: 675,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

import { fundoMaker, leo } from "@/assets/placeholders";

interface ScreenShellProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showLeo?: boolean;
}

export default function ScreenShell({ title, subtitle, children, showLeo = true }: ScreenShellProps) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <img src={fundoMaker} alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "relative", width: "100%", height: "100%", padding: 18 }}>
        {(title || subtitle) && (
          <header style={{ textAlign: "center", marginBottom: 10 }}>
            {title && (
              <h1 style={{
                margin: 0, fontSize: 30, color: "#1e293b",
                fontFamily: "system-ui, sans-serif", fontWeight: 800,
                textShadow: "0 2px 0 rgba(255,255,255,0.5)",
              }}>{title}</h1>
            )}
            {subtitle && (
              <p style={{
                margin: "6px 0 0", fontSize: 20, color: "#334155",
                fontFamily: "system-ui, sans-serif", fontWeight: 500,
              }}>{subtitle}</p>
            )}
          </header>
        )}
        {showLeo && (
          <img src={leo} alt="Leo"
            style={{ position: "absolute", bottom: 8, left: 8, width: 110 }} />
        )}
        {children}
      </div>
    </div>
  );
}

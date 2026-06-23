import { fundoMaker, rostoLeo } from "@/assets/placeholders";

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
          <header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(255, 255, 255, 0.95)",
              border: "3px solid #f97316",
              borderRadius: 18,
              padding: "12px 20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              maxWidth: "92%",
              margin: "0 auto 12px",
            }}
          >
            {showLeo && (
              <img
                src={rostoLeo}
                alt="Léo"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  border: "2px solid #f97316",
                  background: "#fff",
                }}
              />
            )}
            <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
              {title && (
                <h1
                  style={{
                    margin: 0,
                    fontSize: 26,
                    color: "#0f172a",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 800,
                    lineHeight: 1.15,
                  }}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 18,
                    color: "#1e3a8a",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

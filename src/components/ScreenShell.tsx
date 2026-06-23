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
              background: "rgba(255, 255, 255, 0.94)",
              border: "2px solid #f97316",
              borderRadius: 24,
              padding: "10px 18px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              width: "fit-content",
              maxWidth: 720,
              margin: "14px auto 10px",
            }}
          >
            {showLeo && (
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#dbeafe",
                  border: "2px solid #f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <img
                  src={rostoLeo}
                  alt="Léo"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <div style={{ textAlign: "left", minWidth: 0 }}>
              {title && (
                <h1
                  style={{
                    margin: 0,
                    fontSize: 28,
                    color: "#0f172a",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 16,
                    color: "#1e40af",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 500,
                    lineHeight: 1.3,
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

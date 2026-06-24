import ImageButton from "./ImageButton";
import { btnEntendi, btnSeguir } from "@/assets/placeholders";

interface FeedbackModalProps {
  open: boolean;
  message: string;
  tone?: "success" | "info" | "warn";
  variant?: "info" | "final";
  onClose: () => void;
}

export default function FeedbackModal({
  open, message, tone = "info", variant = "info", onClose,
}: FeedbackModalProps) {
  if (!open) return null;
  const isFinal = variant === "final";

  if (isFinal) {
    const cleanMessage = message.replace(/^\s*muito bem!?\s*/i, "");
    return (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.96)",
            border: "3px solid #f97316",
            borderRadius: 22,
            padding: "22px 26px 20px",
            maxWidth: 420,
            width: "min(420px, 86%)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
            textAlign: "center",
          }}
        >
          <h2 style={{
            fontSize: 26, fontWeight: 800, color: "#0f172a",
            margin: "0 0 10px",
          }}>
            Muito bem!
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.4, color: "#1e293b",
            margin: "0 0 18px", fontWeight: 500,
          }}>
            {cleanMessage}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ImageButton src={btnSeguir} alt="Seguir" width={160} onClick={onClose} />
          </div>
        </div>
      </div>
    );
  }

  const colors = {
    success: { border: "#16a34a", bg: "#ecfdf5" },
    info:    { border: "#2563eb", bg: "#eff6ff" },
    warn:    { border: "#ea580c", bg: "#fff7ed" },
  }[tone];

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
      }}
    >
      <div
        style={{
          background: colors.bg,
          border: `5px solid ${colors.border}`,
          borderRadius: 22,
          padding: "26px 34px",
          maxWidth: 720,
          width: "70%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <p style={{
          fontSize: 26, lineHeight: 1.35, color: "#0f172a",
          margin: "0 0 22px", fontWeight: 600,
        }}>
          {message}
        </p>
        <ImageButton
          src={btnEntendi}
          alt="Entendi"
          width={180}
          onClick={onClose}
        />
      </div>
    </div>
  );
}


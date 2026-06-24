import ImageButton from "./ImageButton";
import { btnEntendi, btnSeguir } from "@/assets/placeholders";

interface FeedbackModalProps {
  open: boolean;
  message: string;
  tone?: "success" | "info" | "warn";
  variant?: "info" | "final";
  onClose: () => void;
}

export default function FeedbackModal({ open, message, tone = "info", variant = "info", onClose }: FeedbackModalProps) {
  if (!open) return null;
  const colors = {
    success: { border: "#16a34a", bg: "#ecfdf5" },
    info: { border: "#2563eb", bg: "#eff6ff" },
    warn: { border: "#ea580c", bg: "#fff7ed" },
  }[tone];

  const isFinal = variant === "final";

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
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
        <p
          style={{
            fontSize: 26,
            lineHeight: 1.35,
            color: "#0f172a",
            margin: "0 0 22px",
            fontWeight: 600,
          }}
        >
          {message}
        </p>
        <ImageButton
          src={isFinal ? btnSeguir : btnEntendi}
          alt={isFinal ? "Seguir" : "Entendi"}
          width={isFinal ? 165 : 135}
          onClick={onClose}
        />
      </div>
    </div>
  );
}

import ImageButton from "@/components/ImageButton";
import ScreenShell from "@/components/ScreenShell";
import { btnComecar, caparobo } from "@/assets/placeholders";

export default function CoverScreen({ onStart }: { onStart: () => void }) {
  return (
    <ScreenShell showLeo>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: 40,
      }}>
        <img src={caparobo} alt="" style={{ width: 200, marginBottom: 18 }} />
        <h1 style={{
          fontSize: 54, margin: 0, color: "#0f172a",
          fontFamily: "system-ui, sans-serif", fontWeight: 900,
          textShadow: "0 3px 0 rgba(255,255,255,0.6)",
        }}>
          Robôs de montar, jeitos de contar
        </h1>
        <p style={{
          fontSize: 24, marginTop: 16, marginBottom: 36, color: "#1e293b",
          maxWidth: 760, fontFamily: "system-ui, sans-serif",
        }}>
          Combine peças, descubra robôs e aprenda diferentes formas de contar.
        </p>
        <ImageButton src={btnComecar} alt="Começar" width={260} onClick={onStart} />
      </div>
    </ScreenShell>
  );
}

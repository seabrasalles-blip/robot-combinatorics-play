import ImageButton from "@/components/ImageButton";
import ScreenShell from "@/components/ScreenShell";
import { btnSeguir, leoMeioCorpo } from "@/assets/placeholders";

export default function MissionScreen({ onNext }: { onNext: () => void }) {
  return (
    <ScreenShell title="A taarefa de hoje" showLeo={false}>
      <img
        src={leoMeioCorpo}
        alt="Léo"
        draggable={false}
        style={{
          position: "absolute",
          left: 12,
          bottom: 0,
          width: 320,
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 340,
          right: 60,
          top: 110,
          bottom: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 22,
            padding: "28px 36px",
            maxWidth: 760,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            border: "4px solid #fbbf24",
          }}
        >
          <p style={{ fontSize: 24, margin: 0, color: "#0f172a", lineHeight: 1.45 }}>
            Vamos montar robôs diferentes. Para isso, você vai combinar cabeças e corpos. Será que existe um jeito
            esperto de descobrir todas as combinações?
          </p>
          <p style={{ fontSize: 22, margin: "16px 0 0", color: "#475569", lineHeight: 1.4 }}>
            Observe, teste e organize suas descobertas.
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 24, right: 28 }}>
        <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
      </div>
    </ScreenShell>
  );
}

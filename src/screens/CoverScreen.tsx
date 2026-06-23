import ImageButton from "@/components/ImageButton";
import { btnComecar, caparobo } from "@/assets/placeholders";

export default function CoverScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <img
        src={caparobo}
        alt="Robôs de montar, jeitos de contar"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "6%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageButton src={btnComecar} alt="Começar" width={260} onClick={onStart} />
      </div>
    </div>
  );
}

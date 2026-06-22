import { useDroppable } from "@dnd-kit/core";
import { Piece } from "@/data/robots";

interface DropSlotProps {
  id: string;
  accepts: "head" | "body";
  current?: Piece | null;
  width?: number;
  height?: number;
  label: string;
}

export default function DropSlot({
  id, accepts, current, width = 130, height = 110, label,
}: DropSlotProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id, data: { accepts },
  });
  const activeKind = active?.data.current?.kind;
  const willAccept = activeKind === accepts;

  return (
    <div
      ref={setNodeRef}
      style={{
        width, height,
        border: `3px dashed ${isOver ? (willAccept ? "#16a34a" : "#dc2626") : "#94a3b8"}`,
        background: isOver
          ? (willAccept ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)")
          : "rgba(255,255,255,0.7)",
        borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        transition: "background 120ms",
      }}
    >
      {current ? (
        <img src={current.imagem} alt={current.nome}
          style={{ maxWidth: "85%", maxHeight: "85%", display: "block" }} />
      ) : (
        <span style={{ color: "#64748b", fontSize: 16, fontWeight: 600 }}>{label}</span>
      )}
    </div>
  );
}

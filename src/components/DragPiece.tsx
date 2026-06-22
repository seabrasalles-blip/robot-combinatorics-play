import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Piece } from "@/data/robots";

interface DragPieceProps {
  piece: Piece;
  kind: "head" | "body";
  width?: number;
  disabled?: boolean;
}

export default function DragPiece({ piece, kind, width = 90, disabled }: DragPieceProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${kind}-${piece.id}`,
    data: { piece, kind },
    disabled,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
        cursor: disabled ? "default" : "grab",
        touchAction: "none",
        width,
        padding: 4,
        background: "white",
        border: "2px solid #cbd5e1",
        borderRadius: 12,
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <img src={piece.imagem} alt={piece.nome}
        draggable={false}
        style={{ width: "100%", display: "block", pointerEvents: "none" }} />
    </div>
  );
}

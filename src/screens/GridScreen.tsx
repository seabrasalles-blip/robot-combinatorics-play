import { Fragment, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ScreenShell from "@/components/ScreenShell";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import RobotPreview from "@/components/RobotPreview";
import { btnSeguir } from "@/assets/placeholders";
import { getBodies, getCombinationId, getHeads, Piece } from "@/data/robots";

// Tela 5 - Quadro de dupla entrada
export default function GridScreen({ onNext }: { onNext: () => void }) {
  const heads = useMemo(() => getHeads(3), []);
  const bodies = useMemo(() => getBodies(3), []);
  const total = 9;

  const [filled, setFilled] = useState<Record<string, string>>({});
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const done = Object.keys(filled).length === total;

  const allCombos = useMemo(() => {
    const list: { id: string; head: Piece; body: Piece }[] = [];
    heads.forEach((h) => bodies.forEach((b) => list.push({ id: getCombinationId(h.id, b.id), head: h, body: b })));
    return list;
  }, [heads, bodies]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    setInlineMsg(null);
    const { active, over } = e;
    if (!over) return;
    const comboId = active.id as string;
    const cellId = over.id as string;
    const [, headId, bodyId] = cellId.split("-");
    const expectedId = getCombinationId(headId, bodyId);
    if (comboId !== expectedId) {
      setInlineMsg(
        "Observe com calma: a coluna mostra a cabeça e a linha mostra o corpo. O robô deve ficar no encontro dessas duas pistas.",
      );
      return;
    }
    if (filled[cellId]) return;
    const next = { ...filled, [cellId]: comboId };
    setFilled(next);
    if (Object.keys(next).length === total) {
      setShowFinalPopup(true);
    }
  };

  const placed = new Set(Object.values(filled));
  const pool = allCombos.filter((c) => !placed.has(c.id));

  const handleFinalNext = () => {
    setShowFinalPopup(false);
    setInlineMsg(null);
    onNext();
  };

  return (
    <ScreenShell
      title="Quadro de dupla entrada"
      subtitle="Observe a cabeça no topo e o corpo na lateral. O robô fica no encontro entre os dois."
    >
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 130,
            width: 560,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "70px repeat(3, 130px)",
              gridTemplateRows: "70px repeat(3, 110px)",
              gap: 6,
              background: "rgba(255,255,255,0.85)",
              padding: 10,
              borderRadius: 16,
              border: "3px solid #1e293b",
            }}
          >
            <div />
            {heads.map((h) => (
              <div key={h.id} style={headerCell}>
                <img src={h.imagem} alt={h.nome} style={{ width: 60 }} />
              </div>
            ))}
            {bodies.map((b) => (
              <Fragment key={`row-${b.id}`}>
                <div style={headerCell}>
                  <img src={b.imagem} alt={b.nome} style={{ width: 60 }} />
                </div>
                {heads.map((h) => {
                  const cellId = `cell-${h.id}-${b.id}`;
                  return <Cell key={cellId} id={cellId} filled={filled[cellId]} allCombos={allCombos} />;
                })}
              </Fragment>
            ))}
          </div>
          {inlineMsg && <div style={{ ...inlineMsgStyle, marginTop: 12 }}>{inlineMsg}</div>}
        </div>

        <div
          style={{
            position: "absolute",
            right: 18,
            top: 110,
            width: 230,
            bottom: 110,
            background: "rgba(255,255,255,0.92)",
            padding: 12,
            borderRadius: 18,
            border: "3px solid #60a5fa",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800 }}>Arraste os robôs</h3>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: 6,
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            {pool.map((c) => (
              <ComboPiece key={c.id} id={c.id} head={c.head} body={c.body} />
            ))}
          </div>
        </div>

        {done && !showFinalPopup && (
          <div style={{ position: "absolute", bottom: 22, right: 28 }}>
            <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
          </div>
        )}

        <FeedbackModal
          open={showFinalPopup}
          message="Muito bem! O quadro mostra 9 combinações: 3 cabeças × 3 corpos = 9 robôs."
          tone="success"
          variant="final"
          onClose={handleFinalNext}
        />
      </DndContext>
    </ScreenShell>
  );
}

const headerCell: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fde68a",
  borderRadius: 10,
};

const inlineMsgStyle: React.CSSProperties = {
  background: "#fff7ed",
  border: "2px solid #ea580c",
  color: "#9a3412",
  fontSize: 14,
  fontWeight: 600,
  padding: "6px 12px",
  borderRadius: 10,
  textAlign: "center",
};

function Cell({
  id,
  filled,
  allCombos,
}: {
  id: string;
  filled?: string;
  allCombos: { id: string; head: Piece; body: Piece }[];
}) {
  const { setNodeRef, isOver, active } = useDroppable({ id });
  const expected = id.replace("cell-", "").split("-");
  const isExpected = active?.id === `${expected[0]}__${expected[1]}`;
  const combo = filled ? allCombos.find((c) => c.id === filled) : null;
  return (
    <div
      ref={setNodeRef}
      style={{
        background: filled
          ? "#ecfdf5"
          : isOver
            ? isExpected
              ? "rgba(34,197,94,0.2)"
              : "rgba(239,68,68,0.15)"
            : "white",
        border: `2px dashed ${filled ? "#16a34a" : "#94a3b8"}`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {combo && <RobotPreview head={combo.head} body={combo.body} size={60} />}
    </div>
  );
}

function ComboPiece({ id, head, body }: { id: string; head: Piece; body: Piece }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        touchAction: "none",
        background: "white",
        border: "2px solid #cbd5e1",
        borderRadius: 10,
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <RobotPreview head={head} body={body} size={48} />
    </div>
  );
}

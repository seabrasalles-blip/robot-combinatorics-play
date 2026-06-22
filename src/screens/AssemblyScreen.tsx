import { useMemo, useState } from "react";
import {
  DndContext, DragEndEvent, PointerSensor, TouchSensor,
  useSensor, useSensors,
} from "@dnd-kit/core";
import ScreenShell from "@/components/ScreenShell";
import DragPiece from "@/components/DragPiece";
import DropSlot from "@/components/DropSlot";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import RobotPreview from "@/components/RobotPreview";
import { btnSeguir } from "@/assets/placeholders";
import { getBodies, getCombinationId, getHeads, Piece } from "@/data/robots";

interface AssemblyScreenProps {
  headsCount: number;
  bodiesCount: number;
  title: string;
  helper: string;
  showTotalInCounter: boolean;
  completionMessage: string;
  onNext: () => void;
}

export default function AssemblyScreen({
  headsCount, bodiesCount, title, helper,
  showTotalInCounter, completionMessage, onNext,
}: AssemblyScreenProps) {
  const heads = useMemo(() => getHeads(headsCount), [headsCount]);
  const bodies = useMemo(() => getBodies(bodiesCount), [bodiesCount]);
  const total = headsCount * bodiesCount;

  const [head, setHead] = useState<Piece | null>(null);
  const [body, setBody] = useState<Piece | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ msg: string; tone: "success" | "info" | "warn" } | null>(null);
  const [done, setDone] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } }),
  );

  const tryCheck = (h: Piece | null, b: Piece | null) => {
    if (!h || !b) return;
    const id = getCombinationId(h.id, b.id);
    if (found.has(id)) {
      setFeedback({ msg: "Esse robô já foi descoberto. Tente combinar outra cabeça com outro corpo.", tone: "warn" });
      return;
    }
    const next = new Set(found); next.add(id);
    setFound(next);
    if (next.size === total) {
      setDone(true);
      setFeedback({ msg: completionMessage, tone: "success" });
    } else {
      setFeedback({ msg: "Boa! Você montou um robô diferente.", tone: "success" });
    }
    setHead(null); setBody(null);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const piece: Piece = active.data.current?.piece;
    const kind: "head" | "body" = active.data.current?.kind;
    const accepts = over.data.current?.accepts;
    if (kind !== accepts) {
      setFeedback({
        msg: "Arraste uma cabeça para o espaço de cabeça e um corpo para o espaço de corpo.",
        tone: "warn",
      });
      return;
    }
    if (kind === "head") {
      setHead(piece);
      tryCheck(piece, body);
    } else {
      setBody(piece);
      tryCheck(head, piece);
    }
  };

  const counterText = showTotalInCounter
    ? `Robôs descobertos: ${found.size}/${total}`
    : `Robôs descobertos: ${found.size}`;

  return (
    <ScreenShell title={title} subtitle={helper}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        {/* Painel esquerdo - peças */}
        <div style={panelLeft}>
          <h3 style={panelTitle}>Peças</h3>
          <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 700, color: "#475569" }}>Cabeças</div>
          <div style={pieceGrid}>
            {heads.map(p => <DragPiece key={p.id} piece={p} kind="head" width={70} />)}
          </div>
          <div style={{ margin: "12px 0 10px", fontSize: 14, fontWeight: 700, color: "#475569" }}>Corpos</div>
          <div style={pieceGrid}>
            {bodies.map(p => <DragPiece key={p.id} piece={p} kind="body" width={80} />)}
          </div>
        </div>

        {/* Área central - montagem */}
        <div style={centerArea}>
          <div style={counter}>{counterText}</div>
          <DropSlot id="slot-head" accepts="head" current={head} label="cabeça" width={140} height={120} />
          <div style={{ fontSize: 28, color: "#1e293b", margin: "2px 0" }}>↓</div>
          <DropSlot id="slot-body" accepts="body" current={body} label="corpo" width={160} height={130} />
          <button
            onClick={() => { setHead(null); setBody(null); }}
            style={{
              marginTop: 14, padding: "6px 16px", borderRadius: 12,
              border: "2px solid #cbd5e1", background: "white",
              fontSize: 14, cursor: "pointer", fontWeight: 600,
            }}>limpar</button>
        </div>

        {/* Painel direito - galeria */}
        <div style={panelRight}>
          <h3 style={panelTitle}>Robôs descobertos</h3>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
            maxHeight: 380, overflow: "auto",
          }}>
            {[...found].map(id => {
              const [h, b] = id.split("__");
              const hp = heads.find(x => x.id === h)!;
              const bp = bodies.find(x => x.id === b)!;
              return (
                <div key={id} style={{
                  background: "white", padding: 6, borderRadius: 10,
                  border: "2px solid #86efac", display: "flex", justifyContent: "center",
                }}>
                  <RobotPreview head={hp} body={bp} size={70} />
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div style={{ position: "absolute", bottom: 22, right: 28 }}>
            <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
          </div>
        )}

        <FeedbackModal
          open={!!feedback}
          message={feedback?.msg || ""}
          tone={feedback?.tone}
          onClose={() => setFeedback(null)}
        />
      </DndContext>
    </ScreenShell>
  );
}

const panelLeft: React.CSSProperties = {
  position: "absolute", left: 18, top: 110, width: 200, bottom: 18,
  background: "rgba(255,255,255,0.92)", borderRadius: 18, padding: 14,
  border: "3px solid #fbbf24",
};
const panelRight: React.CSSProperties = {
  position: "absolute", right: 18, top: 110, width: 260, bottom: 110,
  background: "rgba(255,255,255,0.92)", borderRadius: 18, padding: 14,
  border: "3px solid #60a5fa",
};
const panelTitle: React.CSSProperties = {
  margin: "0 0 10px", fontSize: 18, color: "#0f172a", fontWeight: 800,
};
const centerArea: React.CSSProperties = {
  position: "absolute", left: 240, right: 300, top: 110, bottom: 18,
  display: "flex", flexDirection: "column", alignItems: "center",
  justifyContent: "flex-start", paddingTop: 8, gap: 4,
};
const counter: React.CSSProperties = {
  background: "white", padding: "6px 18px", borderRadius: 999,
  fontWeight: 800, fontSize: 18, color: "#0f172a",
  border: "3px solid #1e293b", marginBottom: 14,
};
const pieceGrid: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
  justifyItems: "center",
};

import { useEffect, useMemo, useRef, useState } from "react";
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
  showCounter?: boolean;
  completionMessage: string;
  onNext: () => void;
}

type Revealing = { head: Piece; body: Piece; id: string };

export default function AssemblyScreen({
  headsCount, bodiesCount, title, helper,
  showTotalInCounter, showCounter = true, completionMessage, onNext,
}: AssemblyScreenProps) {
  const heads = useMemo(() => getHeads(headsCount), [headsCount]);
  const bodies = useMemo(() => getBodies(bodiesCount), [bodiesCount]);
  const total = headsCount * bodiesCount;

  const [head, setHead] = useState<Piece | null>(null);
  const [body, setBody] = useState<Piece | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [inlineTone, setInlineTone] = useState<"success" | "warn">("warn");
  const [revealing, setRevealing] = useState<Revealing | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const revealTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } }),
  );

  const tryCheck = (h: Piece | null, b: Piece | null) => {
    if (!h || !b) return;
    const id = getCombinationId(h.id, b.id);
    if (found.has(id)) {
      setInlineTone("warn");
      setInlineMsg("Esse robô já está na galeria. Para não repetir, escolha uma cabeça e teste todos os corpos com ela antes de trocar.");
      setHead(null); setBody(null);
      return;
    }
    // Nova combinação: revela montagem no centro por 1,2s antes de enviar à galeria
    setRevealing({ head: h, body: b, id });
    setInlineTone("success");
    setInlineMsg("Robô descoberto!");
    revealTimer.current = window.setTimeout(() => {
      setFound(prev => {
        const next = new Set(prev); next.add(id);
        if (next.size === total) setShowFinalPopup(true);
        return next;
      });
      setHead(null); setBody(null);
      setRevealing(null);
      setInlineMsg(null);
      revealTimer.current = null;
    }, 1200);
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (revealing) return;
    setInlineMsg(null);
    const { active, over } = e;
    if (!over) return;
    const piece: Piece = active.data.current?.piece;
    const kind: "head" | "body" = active.data.current?.kind;
    const accepts = over.data.current?.accepts;
    if (kind !== accepts) {
      setInlineTone("warn");
      setInlineMsg("Observe os espaços: a cabeça fica em cima e o corpo fica embaixo. Arraste cada peça para o lugar certo.");
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

  const handleFinalNext = () => {
    setShowFinalPopup(false);
    setInlineMsg(null);
    onNext();
  };

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
          {showCounter && <div style={counter}>{counterText}</div>}
          <DropSlot id="slot-head" accepts="head" current={head} label="cabeça" width={140} height={120} />
          <div style={{ fontSize: 28, color: "#1e293b", margin: "2px 0" }}>↓</div>
          <DropSlot id="slot-body" accepts="body" current={body} label="corpo" width={160} height={130} />
          {!showFinalPopup && !revealing && (
            <button
              onClick={() => { setHead(null); setBody(null); setInlineMsg(null); }}
              style={{
                marginTop: 14, padding: "6px 16px", borderRadius: 12,
                border: "2px solid #cbd5e1", background: "white",
                fontSize: 14, cursor: "pointer", fontWeight: 600,
              }}>limpar</button>
          )}

          {inlineMsg && <div style={inlineStyle(inlineTone)}>{inlineMsg}</div>}

          {revealing && (
            <div
              className="animate-scale-in"
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{
                background: "rgba(255,255,255,0.96)",
                border: "3px solid #16a34a",
                borderRadius: 18,
                padding: 14,
                boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
              }}>
                <RobotPreview head={revealing.head} body={revealing.body} size={180} />
              </div>
            </div>
          )}
        </div>

        {/* Painel direito - galeria */}
        <div style={{ ...panelRight, display: "flex", flexDirection: "column" }}>
          <h3 style={panelTitle}>Robôs descobertos</h3>
          {(() => {
            const cols = total >= 9 ? 3 : 2;
            const rows = total <= 4 ? 2 : total === 6 ? 3 : Math.ceil(total / cols);
            const thumb = total <= 4 ? 70 : total === 6 ? 56 : 48;
            const cardPad = total <= 4 ? 6 : 4;
            return (
              <div style={{
                flex: 1, minHeight: 0,
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: 6,
              }}>
                {[...found].map(id => {
                  const [h, b] = id.split("__");
                  const hp = heads.find(x => x.id === h)!;
                  const bp = bodies.find(x => x.id === b)!;
                  return (
                    <div key={id} style={{
                      background: "white", padding: cardPad, borderRadius: 10,
                      border: "2px solid #86efac",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      minHeight: 0, minWidth: 0,
                    }}>
                      <RobotPreview head={hp} body={bp} size={thumb} />
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {found.size === total && !showFinalPopup && (
          <div style={{ position: "absolute", bottom: 22, right: 28 }}>
            <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
          </div>
        )}

        <FeedbackModal
          open={showFinalPopup}
          message={completionMessage}
          tone="success"
          variant="final"
          onClose={handleFinalNext}
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
const inlineStyle = (tone: "success" | "warn"): React.CSSProperties =>
  tone === "success"
    ? {
        marginTop: 12, background: "#f0fdf4", border: "2px solid #16a34a",
        color: "#166534", fontSize: 14, fontWeight: 700,
        padding: "6px 12px", borderRadius: 10, maxWidth: 260, textAlign: "center",
      }
    : {
        marginTop: 12, background: "#fff7ed", border: "2px solid #ea580c",
        color: "#9a3412", fontSize: 14, fontWeight: 600,
        padding: "6px 12px", borderRadius: 10, maxWidth: 260, textAlign: "center",
      };

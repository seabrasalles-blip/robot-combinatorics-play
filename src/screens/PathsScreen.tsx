import { useMemo, useRef, useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import { btnSeguir } from "@/assets/placeholders";
import { getBodies, getHeads } from "@/data/robots";

// Tela 6 - Diagrama de caminhos
export default function PathsScreen({ onNext }: { onNext: () => void }) {
  const heads = useMemo(() => getHeads(3), []);
  const bodies = useMemo(() => getBodies(2), []);
  const total = 6;

  const [paths, setPaths] = useState<Set<string>>(new Set());
  const [dragging, setDragging] = useState<{ from: string; x: number; y: number } | null>(null);
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  const areaRef = useRef<HTMLDivElement>(null);
  const headPositions: Record<string, { x: number; y: number }> = {};
  const bodyPositions: Record<string, { x: number; y: number }> = {};

  const W = 600,
    H = 420;
  heads.forEach((h, i) => {
    headPositions[h.id] = { x: 90, y: 60 + i * 130 };
  });
  bodies.forEach((b, i) => {
    bodyPositions[b.id] = { x: W - 90, y: 110 + i * 180 };
  });

  const done = paths.size === total;

  const startDrag = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    setInlineMsg(null);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const rect = areaRef.current!.getBoundingClientRect();
    const p = headPositions[id];
    setDragging({ from: id, x: p.x, y: p.y });
    const move = (ev: PointerEvent) => {
      setDragging({
        from: id,
        x: (ev.clientX - rect.left) * (W / rect.width),
        y: (ev.clientY - rect.top) * (H / rect.height),
      });
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const bodyId = el?.dataset?.bodyid;
      if (!bodyId) {
        setInlineMsg("Ligue uma cabeça a um corpo para formar um caminho.");
      } else {
        addPath(id, bodyId);
      }
      setDragging(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const addPath = (headId: string, bodyId: string) => {
    const key = `${headId}__${bodyId}`;
    if (paths.has(key)) {
      setInlineMsg("Esse caminho já foi feito. Procure uma ligação que ainda falta.");
      return;
    }
    const next = new Set(paths);
    next.add(key);
    setPaths(next);
    if (next.size === total) {
      setShowFinalPopup(true);
    }
  };

  const colors = ["#ef4444", "#3b82f6", "#16a34a", "#a855f7", "#f59e0b", "#0ea5e9"];

  const handleFinalNext = () => {
    setShowFinalPopup(false);
    setInlineMsg(null);
    onNext();
  };

  return (
    <ScreenShell title="Diagrama de caminhos" subtitle="Ligue cada cabeça a cada corpo arrastando.">
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 200,
          right: 30,
          bottom: 100,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 18,
          border: "3px solid #1e293b",
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
            <div style={{ textAlign: "center", fontWeight: 800, color: "#1e293b" }}>
              Caminhos: {paths.size}/{total}
            </div>
            <div
              ref={areaRef}
              style={{
                position: "relative",
                width: W,
                height: H,
                background: "#f8fafc",
                borderRadius: 12,
                touchAction: "none",
              }}
            >
              <svg
                width={W}
                height={H}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                {[...paths].map((key, i) => {
                  const [h, b] = key.split("__");
                  const a = headPositions[h],
                    c = bodyPositions[b];
                  return (
                    <line
                      key={key}
                      x1={a.x}
                      y1={a.y}
                      x2={c.x}
                      y2={c.y}
                      stroke={colors[i % colors.length]}
                      strokeWidth={4}
                    />
                  );
                })}
                {dragging && (
                  <line
                    x1={headPositions[dragging.from].x}
                    y1={headPositions[dragging.from].y}
                    x2={dragging.x}
                    y2={dragging.y}
                    stroke="#64748b"
                    strokeDasharray="6 6"
                    strokeWidth={3}
                  />
                )}
              </svg>

              {heads.map((h) => {
                const p = headPositions[h.id];
                return (
                  <div
                    key={h.id}
                    onPointerDown={startDrag(h.id)}
                    style={{
                      position: "absolute",
                      left: p.x - 35,
                      top: p.y - 35,
                      width: 70,
                      height: 70,
                      borderRadius: 16,
                      background: "white",
                      border: "3px solid #f59e0b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "grab",
                      touchAction: "none",
                      userSelect: "none",
                    }}
                  >
                    <img src={h.imagem} alt={h.nome} draggable={false} style={{ width: 56, pointerEvents: "none" }} />
                  </div>
                );
              })}
              {bodies.map((b) => {
                const p = bodyPositions[b.id];
                return (
                  <div
                    key={b.id}
                    data-bodyid={b.id}
                    style={{
                      position: "absolute",
                      left: p.x - 40,
                      top: p.y - 45,
                      width: 80,
                      height: 90,
                      borderRadius: 16,
                      background: "white",
                      border: "3px solid #3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={b.imagem}
                      alt={b.nome}
                      draggable={false}
                      data-bodyid={b.id}
                      style={{ width: 68, pointerEvents: "none" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {inlineMsg && <div style={inlineMsgStyle}>{inlineMsg}</div>}
        </div>
      </div>

      {done && !showFinalPopup && (
        <div style={{ position: "absolute", bottom: 22, right: 28 }}>
          <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
        </div>
      )}

      <FeedbackModal
        open={showFinalPopup}
        message="Você encontrou os 6 caminhos. Cada uma das 3 cabeças se ligou aos 2 corpos: 3 × 2 = 6."
        tone="success"
        variant="final"
        onClose={handleFinalNext}
      />
    </ScreenShell>
  );
}

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

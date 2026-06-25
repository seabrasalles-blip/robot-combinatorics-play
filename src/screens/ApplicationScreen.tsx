import { useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import { btnSeguir } from "@/assets/placeholders";

const situations: { title: string; text: string; lines: string[]; answers: string[] }[] = [
  {
    title: "Situação 1 — Sorveteria",
    text: "Na sorveteria, há 2 sabores de sorvete e 4 coberturas. Quantas escolhas diferentes podem ser feitas?",
    lines: [
      "Tenho {0} sabores.",
      "Cada sabor pode combinar com {1} coberturas.",
      "Então posso pensar em {2} grupos de {3}.",
      "Conta: {4} × {5} = {6}.",
      "Resposta: podem ser feitas {7} escolhas diferentes.",
    ],
    answers: ["2", "4", "2", "4", "2", "4", "8", "8"],
  },
  {
    title: "Situação 2 — Caminhos",
    text: "Para chegar ao lago, Ana pode escolher 3 entradas do parque. De cada entrada, saem 4 caminhos. Quantos trajetos diferentes ela pode fazer?",
    lines: [
      "Ana pode começar por {0} entradas.",
      "De cada entrada, saem {1} caminhos.",
      "Então posso pensar em {2} grupos de {3}.",
      "Conta: {4} × {5} = {6}.",
      "Resposta: Ana pode fazer {7} trajetos.",
    ],
    answers: ["3", "4", "3", "4", "3", "4", "12", "12"],
  },
  {
    title: "Situação 3 — Pulseiras",
    text: "Na oficina de artes, há 5 cores de pulseira e 2 pingentes. Quantos modelos diferentes podem ser criados?",
    lines: [
      "Há {0} cores de pulseira.",
      "Cada cor pode combinar com {1} pingentes.",
      "Então são {2} grupos de {3}.",
      "Conta: {4} × {5} = {6}.",
      "Resposta: podem ser criados {7} modelos de pulseira.",
    ],
    answers: ["5", "2", "5", "2", "5", "2", "10", "10"],
  },
];

export default function ApplicationScreen({ onNext }: { onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const [values, setValues] = useState<string[][]>(situations.map(s => s.answers.map(() => "")));
  const [solved, setSolved] = useState<boolean[]>([false, false, false]);
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  const allDone = solved.every(Boolean);
  const s = situations[idx];

  const check = () => {
    setInlineMsg(null);
    const vs = values[idx];
    if (vs.some(v => v.trim() === "")) {
      setInlineMsg("Faltou completar uma parte do raciocínio. Volte ao enunciado e procure quais são os dois grupos de opções.");
      return;
    }
    const ok = vs.every((v, i) => v.trim() === s.answers[i]);
    if (ok) {
      const ns = [...solved]; ns[idx] = true; setSolved(ns);
      if (ns.every(Boolean)) {
        setShowFinalPopup(true);
      }
    } else {
      setInlineMsg("Parece que você somou os dois grupos. Mas aqui queremos descobrir todas as combinações: cada opção de um grupo pode se juntar com todas as opções do outro.");
    }
  };

  const setVal = (i: number, v: string) => {
    setInlineMsg(null);
    setValues(prev => prev.map((arr, k) => k === idx ? arr.map((x, j) => j === i ? v : x) : arr));
  };

  const handleFinalNext = () => {
    setShowFinalPopup(false);
    setInlineMsg(null);
    onNext();
  };

  return (
    <ScreenShell title="Outras situações" subtitle="Use o mesmo raciocínio dos robôs.">
      <div style={{
        position: "absolute", top: 110, left: 180, right: 30,
        display: "flex", gap: 8,
      }}>
        {situations.map((sit, i) => (
          <button key={i}
            onClick={() => { setIdx(i); setInlineMsg(null); }}
            disabled={i > 0 && !solved[i - 1]}
            style={{
              flex: 1, padding: "8px 10px", fontWeight: 700, fontSize: 14,
              borderRadius: 12, border: "2px solid #1e293b",
              background: idx === i ? "#fde68a" : "white",
              cursor: i > 0 && !solved[i - 1] ? "not-allowed" : "pointer",
              opacity: i > 0 && !solved[i - 1] ? 0.5 : 1,
            }}>
            {sit.title}{solved[i] ? " ✓" : ""}
          </button>
        ))}
      </div>

      <div style={{
        position: "absolute", top: 160, left: 180, right: 30, bottom: 90,
        background: "rgba(255,255,255,0.95)", borderRadius: 16,
        border: "3px solid #60a5fa", padding: "14px 18px 0 18px",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <p style={{ fontSize: 17, margin: "0 0 10px", color: "#0f172a", fontWeight: 600 }}>
            {s.text}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 16 }}>
            {s.lines.map((line, li) => (
              <div key={li} style={{ color: "#0f172a", lineHeight: 1.4 }}>
                {renderLine(line, values[idx], setVal)}
              </div>
            ))}
          </div>
        </div>
        <div style={{
          flexShrink: 0, padding: "8px 6px 10px 0", marginTop: 4,
          borderTop: "1px solid #e2e8f0",
          display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12,
        }}>
          {inlineMsg && <div style={inlineMsgStyle}>{inlineMsg}</div>}
          <button onClick={check} disabled={solved[idx]}
            style={{
              padding: "8px 20px", fontSize: 16, fontWeight: 700,
              background: solved[idx] ? "#94a3b8" : "#16a34a", color: "white",
              border: "none", borderRadius: 12,
              cursor: solved[idx] ? "default" : "pointer",
            }}>
            {solved[idx] ? "concluído" : "conferir"}
          </button>
        </div>
      </div>


      {allDone && !showFinalPopup && (
        <div style={{ position: "absolute", bottom: 22, right: 28 }}>
          <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
        </div>
      )}

      <FeedbackModal
        open={showFinalPopup}
        message="Muito bem! Você usou o mesmo jeito de pensar dos robôs em todas as situações."
        tone="success"
        variant="final"
        onClose={handleFinalNext}
      />
    </ScreenShell>
  );
}

function renderLine(template: string, values: string[], setVal: (i: number, v: string) => void) {
  const parts = template.split(/(\{\d+\})/g);
  return parts.map((p, k) => {
    const m = p.match(/^\{(\d+)\}$/);
    if (m) {
      const i = parseInt(m[1], 10);
      return (
        <input key={k} type="text" inputMode="numeric" value={values[i] || ""}
          onChange={e => setVal(i, e.target.value)}
          style={{
            width: 56, fontSize: 19, padding: "4px 8px", textAlign: "center",
            border: "2px solid #1e293b", borderRadius: 8, margin: "0 4px",
          }} />
      );
    }
    return <span key={k}>{p}</span>;
  });
}

const inlineMsgStyle: React.CSSProperties = {
  background: "#fff7ed", border: "2px solid #ea580c",
  color: "#9a3412", fontSize: 14, fontWeight: 600,
  padding: "6px 12px", borderRadius: 10,
};

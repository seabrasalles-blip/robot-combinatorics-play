import { useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import { btnSeguir } from "@/assets/placeholders";

const situations: { title: string; text: string; lines: string[]; answers: string[] }[] = [
  {
    title: "Situação 1 - Roupas",
    text: "Lia tem 3 camisetas e 2 shorts. Quantos conjuntos diferentes ela pode formar?",
    lines: [
      "Tenho {0} camisetas.",
      "Tenho {1} shorts.",
      "Cada camiseta combina com {2} shorts.",
      "Então: {3} × {4} = {5}.",
      "Resposta: Lia pode formar {6} conjuntos.",
    ],
    answers: ["3", "2", "2", "3", "2", "6", "6"],
  },
  {
    title: "Situação 2 - Lanches",
    text: "Na cantina há 2 tipos de pão e 3 recheios. Quantos sanduíches diferentes podem ser montados?",
    lines: [
      "Tenho {0} tipos de pão.",
      "Tenho {1} recheios.",
      "Cada pão combina com {2} recheios.",
      "Então: {3} × {4} = {5}.",
      "Resposta: podem ser montados {6} sanduíches.",
    ],
    answers: ["2", "3", "3", "2", "3", "6", "6"],
  },
  {
    title: "Situação 3 - Crachás",
    text: "Para criar crachás, há 4 cores e 2 símbolos. Quantos crachás diferentes podem ser feitos?",
    lines: [
      "Tenho {0} cores.",
      "Tenho {1} símbolos.",
      "Cada cor combina com {2} símbolos.",
      "Então: {3} × {4} = {5}.",
      "Resposta: podem ser feitos {6} crachás.",
    ],
    answers: ["4", "2", "2", "4", "2", "8", "8"],
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
      setInlineMsg("Preencha todos os campos da situação.");
      return;
    }
    const ok = vs.every((v, i) => v.trim() === s.answers[i]);
    if (ok) {
      const ns = [...solved]; ns[idx] = true; setSolved(ns);
      if (ns.every(Boolean)) {
        setShowFinalPopup(true);
      }
    } else {
      setInlineMsg("Não some os dois grupos. Cada opção do primeiro grupo combina com todas as opções do segundo.");
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
              flex: 1, padding: "10px 12px", fontWeight: 700, fontSize: 16,
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
        position: "absolute", top: 170, left: 180, right: 30, bottom: 100,
        background: "rgba(255,255,255,0.95)", borderRadius: 16,
        border: "3px solid #60a5fa", padding: 18, overflow: "auto",
      }}>
        <p style={{ fontSize: 20, margin: "0 0 16px", color: "#0f172a", fontWeight: 600 }}>
          {s.text}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 19 }}>
          {s.lines.map((line, li) => (
            <div key={li} style={{ color: "#0f172a", lineHeight: 1.7 }}>
              {renderLine(line, values[idx], setVal)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          {inlineMsg && <div style={inlineMsgStyle}>{inlineMsg}</div>}
          <button onClick={check} disabled={solved[idx]}
            style={{
              padding: "10px 22px", fontSize: 18, fontWeight: 700,
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

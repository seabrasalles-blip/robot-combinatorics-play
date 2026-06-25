import { useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import FeedbackModal from "@/components/FeedbackModal";
import ImageButton from "@/components/ImageButton";
import { btnSeguir } from "@/assets/placeholders";
import { getHeads, getBodies } from "@/data/robots";

// Tela 7 - Registro matemático
export default function MathRecordScreen({ onNext }: { onNext: () => void }) {
  const heads = getHeads(4);
  const bodies = getBodies(3);

  const expected = ["3", "4", "12", "12"];
  const [values, setValues] = useState(["", "", "", ""]);
  const [inlineMsg, setInlineMsg] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  const check = () => {
    setInlineMsg(null);
    if (values.some((v) => v.trim() === "")) {
      setInlineMsg("Ainda há espaços vazios. Complete cada parte do registro para mostrar como você pensou.");
      return;
    }
    const ok = values.every((v, i) => v.trim() === expected[i]);
    if (ok) {
      setSolved(true);
      setShowFinalPopup(true);
    } else {
      setInlineMsg("Observe os dois grupos. Primeiro veja quantas opções há em um grupo. Depois pense: quantas opções combinam com cada uma delas?");
    }
  };

  const updateVal = (i: number, v: string) => {
    setInlineMsg(null);
    setValues((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  };

  const handleFinalNext = () => {
    setShowFinalPopup(false);
    setInlineMsg(null);
    onNext();
  };

  return (
    <ScreenShell title="Vamos registrar com matemática" subtitle="Como podemos contar sem montar um por um?">
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 180,
          right: 30,
          bottom: 100,
          display: "flex",
          gap: 16,
        }}
      >
        <div
          style={{
            flex: "0 0 320px",
            background: "rgba(255,255,255,0.9)",
            borderRadius: 16,
            border: "3px solid #fbbf24",
            padding: 14,
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 6, color: "#0f172a" }}>Cabeças</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {heads.map((h) => (
              <img key={h.id} src={h.imagem} alt="" style={{ width: 60 }} />
            ))}
          </div>
          <div style={{ fontWeight: 800, marginBottom: 6, color: "#0f172a" }}>Corpos</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {bodies.map((b) => (
              <img key={b.id} src={b.imagem} alt="" style={{ width: 70 }} />
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 16,
            border: "3px solid #60a5fa",
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 20,
          }}
        >
          <Line>
            1. Cada cabeça combina com <Input value={values[0]} onChange={(v) => updateVal(0, v)} /> corpos.
          </Line>
          <Line>
            2. Temos <Input value={values[1]} onChange={(v) => updateVal(1, v)} /> cabeças.
          </Line>
          <Line>
            3. Podemos somar: 3 + 3 + 3 + 3 = <Input value={values[2]} onChange={(v) => updateVal(2, v)} />.
          </Line>
          <Line>
            4. Também podemos multiplicar: 4 × 3 = <Input value={values[3]} onChange={(v) => updateVal(3, v)} />.
          </Line>

          <div
            style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}
          >
            {inlineMsg && <div style={inlineMsgStyle}>{inlineMsg}</div>}
            <button
              onClick={check}
              style={{
                padding: "10px 22px",
                fontSize: 18,
                fontWeight: 700,
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              conferir
            </button>
          </div>
        </div>
      </div>

      {solved && !showFinalPopup && (
        <div style={{ position: "absolute", bottom: 22, right: 28 }}>
          <ImageButton src={btnSeguir} alt="Seguir" width={220} onClick={onNext} />
        </div>
      )}

      <FeedbackModal
        open={showFinalPopup}
        message="Isso mesmo! São 4 grupos de 3 combinações. Por isso, 4 × 3 = 12."
        tone="success"
        variant="final"
        onClose={handleFinalNext}
      />
    </ScreenShell>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "#0f172a", lineHeight: 1.7 }}>{children}</div>;
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: 60,
        fontSize: 20,
        padding: "4px 8px",
        textAlign: "center",
        border: "2px solid #1e293b",
        borderRadius: 8,
        margin: "0 4px",
      }}
    />
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
};

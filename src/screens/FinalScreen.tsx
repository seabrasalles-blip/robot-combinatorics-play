import { useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import ImageButton from "@/components/ImageButton";
import { btnRecomecar } from "@/assets/placeholders";

interface FinalScreenProps { onRestart: () => void; }

const options = [
  "Montar os robôs.",
  "Organizar no quadro.",
  "Ligar os caminhos.",
  "Fazer a conta.",
];

export default function FinalScreen({ onRestart }: FinalScreenProps) {
  const [chosen, setChosen] = useState<number | null>(null);

  return (
    <ScreenShell title="Antes de terminar, pense:" subtitle="O que mais ajudou você a descobrir as combinações?">
      <div style={{
        position: "absolute", top: 130, left: 180, right: 30, bottom: 90,
        display: "flex", flexDirection: "column", gap: 14, overflow: "auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {options.map((o, i) => (
            <button key={i}
              onClick={() => setChosen(i)}
              style={{
                padding: "14px 16px", fontSize: 18, fontWeight: 700,
                background: chosen === i ? "#bbf7d0" : "white",
                border: `3px solid ${chosen === i ? "#16a34a" : "#1e293b"}`,
                borderRadius: 14, cursor: "pointer", textAlign: "left",
              }}>
              {o}
            </button>
          ))}
        </div>

        {chosen !== null && (
          <>
            <div style={{
              background: "#ecfdf5", border: "3px solid #16a34a",
              padding: "10px 16px", borderRadius: 14, fontSize: 18, color: "#0f172a",
            }}>
              Boa escolha! Cada pessoa pode encontrar um jeito que ajuda mais a pensar.
            </div>
            <div style={{
              background: "white", border: "3px solid #60a5fa",
              padding: "12px 16px", borderRadius: 14,
            }}>
              <p style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                Hoje você descobriu que existem vários jeitos de contar combinações.
              </p>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 17, color: "#0f172a", lineHeight: 1.6 }}>
                <li>2 cabeças e 2 corpos → 2 × 2 = 4 robôs.</li>
                <li>3 cabeças e 2 corpos → 3 × 2 = 6 robôs.</li>
                <li>3 cabeças e 3 corpos → 3 × 3 = 9 robôs.</li>
                <li>4 cabeças e 3 corpos → 4 × 3 = 12 robôs.</li>
              </ul>
              <p style={{ margin: "10px 0 0", fontSize: 17, color: "#1e293b", fontStyle: "italic" }}>
                Quando cada opção de um grupo combina com todas as opções de outro grupo, podemos multiplicar.
              </p>
            </div>
          </>
        )}
      </div>

      <div style={{ position: "absolute", bottom: 18, right: 28 }}>
        <ImageButton src={btnRecomecar} alt="Recomeçar" width={240} onClick={onRestart} />
      </div>
    </ScreenShell>
  );
}

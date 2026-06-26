import { useState } from "react";
import ScreenShell from "@/components/ScreenShell";
import ImageButton from "@/components/ImageButton";
import FeedbackModal from "@/components/FeedbackModal";
import { btnRecomecar, leoMeioCorpo } from "@/assets/placeholders";

interface FinalScreenProps { onRestart: () => void; }

const options = [
  "Montar os robôs.",
  "Organizar no quadro.",
  "Ligar os caminhos.",
  "Fazer a conta.",
];

export default function FinalScreen({ onRestart }: FinalScreenProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"question" | "closing">("question");

  const handleChoose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setStep("closing");
  };

  if (step === "question") {
    return (
      <ScreenShell title="Antes de terminar, pense:" subtitle="O que mais ajudou você a descobrir as combinações?">
        <div style={{
          position: "absolute", top: 150, left: 180, right: 30, bottom: 60,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16,
            width: "100%", maxWidth: 820,
          }}>
            {options.map((o, i) => (
              <button key={i}
                onClick={() => handleChoose(i)}
                style={{
                  padding: "18px 20px", fontSize: 20, fontWeight: 700,
                  background: chosen === i ? "#bbf7d0" : "white",
                  border: `3px solid ${chosen === i ? "#16a34a" : "#1e293b"}`,
                  borderRadius: 14, cursor: chosen === null ? "pointer" : "default",
                  textAlign: "left", color: "#0f172a",
                }}>
                {o}
              </button>
            ))}
          </div>
        </div>

        <FeedbackModal
          open={showModal}
          variant="final"
          title="Boa escolha!"
          message="Cada pessoa pode encontrar um jeito que ajuda mais a pensar."
          onClose={handleModalClose}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell title="Para fechar" showLeo={false}>
      <img
        src={leoMeioCorpo}
        alt="Léo"
        draggable={false}
        style={{
          position: "absolute",
          left: 12,
          bottom: 0,
          width: 320,
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <div style={{
        position: "absolute",
        left: 340, right: 60, top: 110, bottom: 110,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{
          background: "white",
          borderRadius: 22,
          padding: "22px 30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          border: "4px solid #fbbf24",
        }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", lineHeight: 1.35 }}>
            Hoje você descobriu que combinar também é uma forma de contar!
          </p>
          <p style={{ margin: "12px 0 0", fontSize: 18, color: "#0f172a", lineHeight: 1.45 }}>
            Na Oficina dos Robôs, cada cabeça podia combinar com todos os corpos:
          </p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 24, fontSize: 18, color: "#0f172a", lineHeight: 1.6 }}>
            <li>2 × 2 = 4 robôs</li>
            <li>3 × 2 = 6 robôs</li>
            <li>3 × 3 = 9 robôs</li>
            <li>4 × 3 = 12 robôs</li>
          </ul>
          <p style={{ margin: "14px 0 0", fontSize: 18, color: "#1e293b", lineHeight: 1.45 }}>
            Quando cada opção de um grupo combina com todas as opções de outro, podemos usar a multiplicação para descobrir o total.
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 18, color: "#1e293b", fontStyle: "italic", lineHeight: 1.45 }}>
            Combinar com organização ajuda a não repetir e a não esquecer nenhuma possibilidade!
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 24, right: 28 }}>
        <ImageButton src={btnRecomecar} alt="Recomeçar" width={200} onClick={onRestart} />
      </div>
    </ScreenShell>
  );
}

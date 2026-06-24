import { useState } from "react";
import Stage from "@/components/Stage";
import CoverScreen from "@/screens/CoverScreen";
import MissionScreen from "@/screens/MissionScreen";
import AssemblyScreen from "@/screens/AssemblyScreen";
import GridScreen from "@/screens/GridScreen";
import PathsScreen from "@/screens/PathsScreen";
import MathRecordScreen from "@/screens/MathRecordScreen";
import ApplicationScreen from "@/screens/ApplicationScreen";
import FinalScreen from "@/screens/FinalScreen";

export default function RobotsApp() {
  // chave força remontagem para limpar estados ao recomeçar
  const [resetKey, setResetKey] = useState(0);
  const [screen, setScreen] = useState(1);

  const go = (n: number) => setScreen(n);
  const restart = () => {
    setResetKey((k) => k + 1);
    setScreen(1);
  };

  return (
    <Stage>
      <div key={resetKey} style={{ width: "100%", height: "100%", position: "relative" }}>
        {screen === 1 && <CoverScreen onStart={() => go(2)} />}
        {screen === 2 && <MissionScreen onNext={() => go(3)} />}
        {screen === 3 && (
          <AssemblyScreen
            key="s3"
            headsCount={2}
            bodiesCount={2}
            title="Vamos montar!"
            helper="Arraste uma cabeça e um corpo para o centro."
            showTotalInCounter
            completionMessage="Você encontrou todos os 4 robôs! Cada cabeça combinou com cada corpo."
            onNext={() => go(4)}
          />
        )}
        {screen === 4 && (
          <AssemblyScreen
            key="s4"
            headsCount={3}
            bodiesCount={2}
            title="Continue investigando (3 cabeças e 2 corpos)"
            helper="Agora temos 3 cabeças e 2 corpos. Tente descobrir todos os robôs diferentes."
            showTotalInCounter={false}
            showCounter={false}
            completionMessage="Você encontrou todos os 6 robôs! Com 3 cabeças e 2 corpos, podemos pensar assim: 3 × 2 = 6."
            onNext={() => go(5)}
          />
        )}
        {screen === 5 && <GridScreen onNext={() => go(6)} />}
        {screen === 6 && <PathsScreen onNext={() => go(7)} />}
        {screen === 7 && <MathRecordScreen onNext={() => go(8)} />}
        {screen === 8 && <ApplicationScreen onNext={() => go(9)} />}
        {screen === 9 && <FinalScreen onRestart={restart} />}
      </div>
    </Stage>
  );
}

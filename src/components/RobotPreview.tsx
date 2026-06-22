import { Piece } from "@/data/robots";

interface RobotPreviewProps {
  head?: Piece | null;
  body?: Piece | null;
  override?: string;
  size?: number;
}

// Compõe visualmente cabeça + corpo. Aceita override quando houver
// uma imagem do robô completo (não há nos assets atuais).
export default function RobotPreview({
  head, body, override, size = 140,
}: RobotPreviewProps) {
  if (override) {
    return <img src={override} alt="Robô" style={{ width: size, display: "block" }} />;
  }
  return (
    <div style={{ width: size, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {head ? (
        <img src={head.imagem} alt={head.nome}
          style={{ width: size * 0.75, marginBottom: -size * 0.08, display: "block" }} />
      ) : (
        <div style={ph(size * 0.75, size * 0.6)}>cabeça</div>
      )}
      {body ? (
        <img src={body.imagem} alt={body.nome}
          style={{ width: size, display: "block" }} />
      ) : (
        <div style={ph(size, size * 0.7)}>corpo</div>
      )}
    </div>
  );
}

const ph = (w: number, h: number): React.CSSProperties => ({
  width: w, height: h,
  border: "2px dashed #94a3b8",
  borderRadius: 10,
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#64748b", fontSize: 12, background: "rgba(255,255,255,0.5)",
});

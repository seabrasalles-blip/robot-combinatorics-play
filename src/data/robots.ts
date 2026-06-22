// Dados de peças e combinações.
// Substituir imports de placeholders por imports diretos dos PNGs
// (cabeca1.png, corpo1.png, etc.) quando estiverem disponíveis em /src/assets.
import {
  cabeca1, cabeca2, cabeca3, cabeca4,
  corpo1, corpo2, corpo3,
} from "@/assets/placeholders";

export interface Piece {
  id: string;
  nome: string;
  imagem: string;
}

export const allHeads: Piece[] = [
  { id: "c1", nome: "Cabeça 1", imagem: cabeca1 },
  { id: "c2", nome: "Cabeça 2", imagem: cabeca2 },
  { id: "c3", nome: "Cabeça 3", imagem: cabeca3 },
  { id: "c4", nome: "Cabeça 4", imagem: cabeca4 },
];

export const allBodies: Piece[] = [
  { id: "b1", nome: "Corpo 1", imagem: corpo1 },
  { id: "b2", nome: "Corpo 2", imagem: corpo2 },
  { id: "b3", nome: "Corpo 3", imagem: corpo3 },
];

export const getCombinationId = (headId: string, bodyId: string) =>
  `${headId}__${bodyId}`;

export const getHeads = (n: number) => allHeads.slice(0, n);
export const getBodies = (n: number) => allBodies.slice(0, n);

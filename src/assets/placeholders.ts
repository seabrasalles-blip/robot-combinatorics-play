// =====================================================================
// Re-exports dos PNGs reais enviados pelo usuário.
// O nome do arquivo é mantido por compatibilidade com imports existentes,
// mas NÃO há mais nenhum SVG gerado: tudo aponta para os PNGs em /src/assets.
// =====================================================================

import cabeca1Png from "@/assets/cabeca1.png";
import cabeca2Png from "@/assets/cabeca2.png";
import cabeca3Png from "@/assets/cabeca3.png";
import cabeca4Png from "@/assets/cabeca4.png";
import corpo1Png from "@/assets/corpo1.png";
import corpo2Png from "@/assets/corpo2.png";
import corpo3Png from "@/assets/corpo3.png";
import leoPng from "@/assets/leo.png";
import caparoboPng from "@/assets/caparobo.png";
import fundoMakerPng from "@/assets/fundo-maker.png";
import comecarPng from "@/assets/comecar.png";
import seguirPng from "@/assets/seguir.png";
import recomecarPng from "@/assets/recomecar.png";

export const cabeca1 = cabeca1Png;
export const cabeca2 = cabeca2Png;
export const cabeca3 = cabeca3Png;
export const cabeca4 = cabeca4Png;

export const corpo1 = corpo1Png;
export const corpo2 = corpo2Png;
export const corpo3 = corpo3Png;

export const leo = leoPng;
export const caparobo = caparoboPng;
export const fundoMaker = fundoMakerPng;

export const btnComecar = comecarPng;
export const btnSeguir = seguirPng;
export const btnRecomecar = recomecarPng;
// Sem PNGs específicos para "Voltar"/"Entendi": reusamos os existentes.
export const btnVoltar = recomecarPng;
export const btnEntendi = seguirPng;

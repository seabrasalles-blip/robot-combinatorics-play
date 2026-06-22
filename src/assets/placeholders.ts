// =====================================================================
// PLACEHOLDER ASSETS
// =====================================================================
// Os arquivos abaixo são placeholders SVG gerados em runtime, usados
// APENAS porque os assets do usuário (PNG) não foram encontrados em
// /src/assets no momento do build.
//
// Quando os PNGs reais forem adicionados, substituir os imports
// pelos arquivos abaixo em src/data/robots.ts e nas telas:
//
//   fundo-maker.png   -> oficina/fundo principal
//   leo.png, leocorpointeiro.png, leomeiocorpo.png,
//   leomeiocorpo1.png, rostoleo.png -> personagem Leo
//   cabeca1.png ... cabeca4.png   -> cabeças de robô
//   corpo1.png  ... corpo3.png    -> corpos de robô
//   caparobo.png                  -> imagem decorativa de capa
//   comecar.png, comecar2.png, seguir.png,
//   recomecar.png, dica.png       -> botões transparentes
// =====================================================================

const svg = (content: string, w = 200, h = 200) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${content}</svg>`
  )}`;

// --- Cabeças (4 estilos) ---
export const cabeca1 = svg(
  `<g><rect x="40" y="30" width="120" height="110" rx="18" fill="#7dd3fc" stroke="#0369a1" stroke-width="4"/>
   <circle cx="80" cy="80" r="12" fill="#0c4a6e"/><circle cx="120" cy="80" r="12" fill="#0c4a6e"/>
   <rect x="75" y="110" width="50" height="10" rx="4" fill="#0c4a6e"/>
   <line x1="100" y1="10" x2="100" y2="30" stroke="#0369a1" stroke-width="4"/>
   <circle cx="100" cy="8" r="6" fill="#fde047"/></g>`
);
export const cabeca2 = svg(
  `<g><rect x="40" y="30" width="120" height="110" rx="60" fill="#fca5a5" stroke="#991b1b" stroke-width="4"/>
   <rect x="65" y="75" width="20" height="20" rx="4" fill="#7f1d1d"/>
   <rect x="115" y="75" width="20" height="20" rx="4" fill="#7f1d1d"/>
   <path d="M75 115 Q100 130 125 115" stroke="#7f1d1d" stroke-width="5" fill="none"/></g>`
);
export const cabeca3 = svg(
  `<g><polygon points="100,20 170,80 150,140 50,140 30,80" fill="#86efac" stroke="#166534" stroke-width="4"/>
   <circle cx="80" cy="85" r="10" fill="#166534"/><circle cx="120" cy="85" r="10" fill="#166534"/>
   <rect x="80" y="115" width="40" height="8" rx="3" fill="#166534"/></g>`
);
export const cabeca4 = svg(
  `<g><rect x="45" y="35" width="110" height="105" rx="10" fill="#fcd34d" stroke="#92400e" stroke-width="4"/>
   <rect x="60" y="65" width="35" height="25" rx="4" fill="#92400e"/>
   <rect x="105" y="65" width="35" height="25" rx="4" fill="#92400e"/>
   <rect x="70" y="110" width="60" height="10" rx="3" fill="#92400e"/>
   <line x1="60" y1="20" x2="60" y2="35" stroke="#92400e" stroke-width="4"/>
   <line x1="140" y1="20" x2="140" y2="35" stroke="#92400e" stroke-width="4"/></g>`
);

// --- Corpos (3 estilos) ---
export const corpo1 = svg(
  `<g><rect x="50" y="30" width="100" height="120" rx="14" fill="#a5b4fc" stroke="#3730a3" stroke-width="4"/>
   <circle cx="100" cy="70" r="10" fill="#fbbf24"/><circle cx="100" cy="100" r="10" fill="#ef4444"/>
   <rect x="20" y="50" width="25" height="70" rx="8" fill="#a5b4fc" stroke="#3730a3" stroke-width="4"/>
   <rect x="155" y="50" width="25" height="70" rx="8" fill="#a5b4fc" stroke="#3730a3" stroke-width="4"/></g>`,
  200, 180
);
export const corpo2 = svg(
  `<g><polygon points="60,30 140,30 160,150 40,150" fill="#f9a8d4" stroke="#9d174d" stroke-width="4"/>
   <rect x="80" y="60" width="40" height="50" rx="6" fill="#fce7f3" stroke="#9d174d" stroke-width="3"/>
   <circle cx="100" cy="85" r="10" fill="#9d174d"/>
   <rect x="25" y="50" width="20" height="80" rx="6" fill="#f9a8d4" stroke="#9d174d" stroke-width="4"/>
   <rect x="155" y="50" width="20" height="80" rx="6" fill="#f9a8d4" stroke="#9d174d" stroke-width="4"/></g>`,
  200, 180
);
export const corpo3 = svg(
  `<g><rect x="55" y="30" width="90" height="100" rx="8" fill="#67e8f9" stroke="#155e75" stroke-width="4"/>
   <rect x="70" y="50" width="60" height="15" fill="#155e75"/>
   <rect x="70" y="75" width="60" height="15" fill="#155e75"/>
   <rect x="70" y="100" width="60" height="15" fill="#155e75"/>
   <rect x="25" y="55" width="28" height="70" rx="6" fill="#67e8f9" stroke="#155e75" stroke-width="4"/>
   <rect x="147" y="55" width="28" height="70" rx="6" fill="#67e8f9" stroke="#155e75" stroke-width="4"/>
   <rect x="60" y="130" width="30" height="25" fill="#155e75"/>
   <rect x="110" y="130" width="30" height="25" fill="#155e75"/></g>`,
  200, 180
);

// --- Personagem Leo (placeholder) ---
export const leo = svg(
  `<g><circle cx="100" cy="70" r="50" fill="#fde68a" stroke="#92400e" stroke-width="4"/>
   <circle cx="82" cy="65" r="6" fill="#111"/><circle cx="118" cy="65" r="6" fill="#111"/>
   <path d="M80 90 Q100 105 120 90" stroke="#111" stroke-width="3" fill="none"/>
   <rect x="60" y="115" width="80" height="80" rx="12" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4"/>
   <text x="100" y="165" text-anchor="middle" font-size="22" font-family="sans-serif" fill="white">LEO</text></g>`,
  200, 220
);

// --- Cover decorativo ---
export const caparobo = svg(
  `<g><rect x="20" y="40" width="160" height="140" rx="20" fill="#fbbf24" stroke="#7c2d12" stroke-width="5"/>
   <circle cx="70" cy="90" r="14" fill="#7c2d12"/><circle cx="130" cy="90" r="14" fill="#7c2d12"/>
   <rect x="60" y="130" width="80" height="14" rx="4" fill="#7c2d12"/>
   <line x1="60" y1="20" x2="60" y2="40" stroke="#7c2d12" stroke-width="5"/>
   <line x1="140" y1="20" x2="140" y2="40" stroke="#7c2d12" stroke-width="5"/>
   <circle cx="60" cy="15" r="6" fill="#ef4444"/><circle cx="140" cy="15" r="6" fill="#22c55e"/></g>`
);

// --- Fundo oficina ---
export const fundoMaker = svg(
  `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
     <stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fde68a"/></linearGradient></defs>
   <rect width="1200" height="675" fill="url(#g)"/>
   <rect y="500" width="1200" height="175" fill="#d97706" opacity="0.25"/>
   <g opacity="0.18" stroke="#92400e" stroke-width="2" fill="none">
     <circle cx="120" cy="120" r="40"/><circle cx="1080" cy="140" r="55"/>
     <rect x="900" y="60" width="80" height="80"/><polygon points="200,560 260,500 320,560"/>
   </g>`,
  1200, 675
);

// --- Botões (texto sobre cápsula transparente "asset") ---
const btn = (label: string, fill: string) => svg(
  `<g><rect x="6" y="6" width="288" height="88" rx="44" fill="${fill}" stroke="#1e293b" stroke-width="4"/>
   <text x="150" y="62" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="34" fill="white">${label}</text></g>`,
  300, 100
);
export const btnComecar = btn("COMEÇAR", "#16a34a");
export const btnSeguir = btn("SEGUIR", "#2563eb");
export const btnRecomecar = btn("RECOMEÇAR", "#ea580c");
export const btnVoltar = btn("VOLTAR", "#64748b");
export const btnEntendi = btn("ENTENDI", "#0ea5e9");

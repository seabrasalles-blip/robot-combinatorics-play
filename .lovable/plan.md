## Objetivo
Remover a barra de rolagem da galeria "Robôs descobertos" nas telas de montagem (3 e 4) e ajustar a grade do painel da Tela 5 (GridScreen, 9 combinações) para caber inteira no 16:9 sem scroll. Layout apenas — sem mexer em assets, lógica de drag, fundo ou regras pedagógicas.

## Mudanças

### 1. `src/screens/AssemblyScreen.tsx` (Telas 3 e 4)
No painel direito (linhas ~123-143), a galeria atualmente usa `gridTemplateColumns: "repeat(2, 1fr)"` + `maxHeight: 380, overflow: "auto"`.

- Remover `maxHeight` e `overflow: "auto"`.
- Definir a grade dinamicamente a partir de `total = headsCount × bodiesCount`:
  - `total <= 4` (Tela 3, 2×2): `gridTemplateColumns: "repeat(2, 1fr)"`, `gridTemplateRows: "repeat(2, 1fr)"`, miniatura `size={70}`.
  - `total === 6` (Tela 4, 2×3): `gridTemplateColumns: "repeat(2, 1fr)"`, `gridTemplateRows: "repeat(3, 1fr)"`, miniatura `size={56}`, card com `padding: 4`.
  - `total >= 9`: `gridTemplateColumns: "repeat(3, 1fr)"`, miniatura `size={48}`.
- Card do robô: reduzir `padding` para 4–6 e `gap` da grade para 6, garantindo que tudo caiba dentro da altura disponível do `panelRight` sem scroll.
- A grade ocupa `flex: 1` (ou `height: "100%"`) abaixo do título, sem `overflow`.

### 2. `src/screens/GridScreen.tsx` (Tela 5, 9 combinações)
Linha 106 tem `overflow: "auto"` no contêiner da grade lateral.
- Remover `overflow: "auto"`.
- Manter grade 3×3 com miniaturas menores (≈56–64 px) e padding reduzido para garantir encaixe sem scroll.

## Fora de escopo
- Assets, fundos, posição do painel, lógica de drag/drop, conteúdo das mensagens, FeedbackModal, botão "Seguir".
- `ApplicationScreen` e `FinalScreen` (não são telas de montagem com galeria de robôs descobertos).

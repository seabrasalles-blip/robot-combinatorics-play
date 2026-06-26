## Ajustes na Tela 5 — Quadro de dupla entrada

Arquivo único afetado: `src/screens/GridScreen.tsx`.

### Ajuste 1 — Painel "Arraste os robôs" à esquerda

Reorganizar o layout absoluto dentro do `ScreenShell` (palco 1200×675):

- Painel "Arraste os robôs": mover de `right: 18` para `left: 18`, mantendo `width: 230`, `top: 110`, `bottom: 110`, mesmo estilo (borda azul, grid 3×3, tamanhos das peças).
- Quadro de dupla entrada: mover de `left: 200` para a área central/direita (ex.: `left: 280`, `top: 130`, `width: 560`), preservando a grade `70px + 3×130px` por `70px + 3×110px`.
- Faixa de feedback inline: continuar logo abaixo do quadro (`marginTop: 12`), centralizada na área do quadro, sem sobrepor o painel da esquerda.
- Botão "Seguir" final: manter em `bottom: 22, right: 28` (não conflita com o novo painel à esquerda).
- Título/instrução do topo (ScreenShell) e fundo permanecem inalterados.
- Verificar que não há sobreposição visual em 1200×675 antes do `scale` do `Stage`.

### Ajuste 2 — Área de acerto das células maior e mais tolerante

O problema atual: o `RobotPreview` renderizado dentro de `Cell` não tem `pointer-events: none`, então quando o robô arrastado passa por cima de uma célula já preenchida (ou perto do centro), o hit-test do dnd-kit pode pegar o filho em vez do droppable, ou um droppable adjacente. Ajustes:

- Garantir que a área inteira da célula seja o alvo do drop:
  - No `<div ref={setNodeRef}>` da `Cell`, manter `width: 100%; height: 100%` (já vem do grid), mas adicionar explicitamente `position: relative` e remover qualquer padding interno que reduza a área sensível.
  - Aplicar `pointer-events: none` ao `<RobotPreview>` renderizado dentro de células preenchidas, para que ele nunca "roube" o hit-test do droppable.
  - Garantir que as bordas tracejadas (`border: 2px dashed`) usem `box-sizing: border-box` para que a área visível coincida com a área sensível.
- Aumentar tolerância usando a estratégia de colisão correta do dnd-kit:
  - Importar `pointerWithin` (ou `rectIntersection` como fallback) de `@dnd-kit/core` e passar como `collisionDetection={pointerWithin}` no `<DndContext>`. Isso resolve com base no ponteiro estar dentro do retângulo do droppable, eliminando "buracos" no centro.
- A validação em `onDragEnd` permanece igual: comparar `comboId` (active.id) com `expectedId` derivado do `cellId` (`cell-headId-bodyId`). Nenhuma mudança na lógica matemática, IDs, combinações ou tamanhos visuais.
- Feedbacks (inline de acerto/erro e modal final) permanecem com os textos atuais; só disparam após o drop ser resolvido na célula.

### Verificação pós-implementação

- Conferir visualmente em viewport desktop que: painel à esquerda, quadro à direita, sem sobreposição, feedback visível.
- Testar drop no centro, laterais e cantos internos da célula correta — todos devem ser aceitos.
- Testar drop em célula errada — feedback de erro inline.
- Testar drop em célula já preenchida — feedback inline "essa casa já tem um robô".
- Completar o quadro (9 peças) — modal final aparece e botão Seguir funciona.

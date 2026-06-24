## Objetivo

Tornar a montagem perceptível: quando a criança combina cabeça + corpo corretos e inéditos, o robô permanece montado no centro por ~1,2s com mensagem inline "Robô descoberto!", depois é adicionado à galeria e os slots são limpos. Repetições continuam exibindo apenas a mensagem inline atual.

## Mudanças (apenas `src/screens/AssemblyScreen.tsx`)

1. **Novo estado de "revelação"**:
   - `revealing: { head, body, id } | null` — guarda a combinação enquanto o robô está em destaque no centro.
   - `locked: boolean` (derivado de `revealing !== null`) — bloqueia novos drops durante a pausa.

2. **Fluxo em `tryCheck`** quando a combinação é nova:
   - NÃO adicionar ainda em `found`.
   - Setar `revealing = { head, body, id }` e `inlineMsg = "Robô descoberto!"`.
   - `setTimeout(1200ms)`:
     - Adicionar `id` em `found`.
     - Se `found.size + 1 === total` → abrir `showFinalPopup`.
     - Limpar `head`, `body`, `revealing`, `inlineMsg`.
   - Guardar o timer em `useRef` e limpar no `unmount` para evitar leak.

3. **Fluxo para combinação repetida**: mantém comportamento atual — apenas `inlineMsg` "Esse robô já foi descoberto. Tente outra combinação." e limpa os slots imediatamente (sem pausa, sem animação).

4. **Bloqueio de interação durante `revealing`**:
   - No `onDragEnd`: se `revealing`, `return` cedo (ignora o drop).
   - Esconder o botão "limpar" enquanto `revealing` (além da condição atual de `!showFinalPopup`).

5. **Render do robô revelado no centro**:
   - Quando `revealing`, renderizar um overlay absoluto centralizado em `centerArea` com `<RobotPreview head={revealing.head} body={revealing.body} size={180} />` sobre os slots, com animação leve via classe Tailwind existente (`animate-scale-in`) e uma transição final de "encolher" (aplicar `animate-fade-out` ou `scale-out` nos últimos ~200ms via segundo `setTimeout` opcional). Se complicar, manter apenas o `scale-in` estático por 1,2s conforme permitido pelo usuário.
   - A mensagem inline "Robô descoberto!" usa o `inlineMsgStyle` atual, mas com cor verde (variante visual: borda `#16a34a`, fundo `#f0fdf4`, texto `#166534`) apenas neste caso — repetições continuam laranja.

6. **Sem alterações** em: assets, lógica de contagem (`found.size`), `FeedbackModal` final, sequência de telas, galeria (`RobotPreview` thumbs), `DragPiece`/`DropSlot`, demais telas.

## Detalhes técnicos

- `inlineMsgStyle` será parametrizado por tom: nova função `inlineStyle(tone: "success" | "warn")` retornando o objeto de estilos. O JSX escolhe o tom conforme o caso (revelação vs repetição/erro).
- `useRef<number | null>` para o `setTimeout`, com `useEffect` de cleanup.
- O overlay de revelação fica em `position: absolute` dentro do `centerArea` (que já é `position: absolute`), com `inset: 0`, `display: flex`, centralizado, `pointerEvents: "none"` para não interferir nos slots por baixo.

## Fora de escopo

Pop-ups por robô, alteração dos assets, da galeria, dos pop-ups finais, da contagem ou da sequência de telas.

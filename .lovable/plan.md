## Reorganização da tela final em duas etapas

Dividir `src/screens/FinalScreen.tsx` em duas etapas internas controladas por estado local `step: "question" | "closing"`. Sem alterar outras telas ou lógica das atividades.

### Etapa 1 — Pergunta metacognitiva (`step === "question"`)

- Usar `ScreenShell` com `title="Antes de terminar, pense:"` e `subtitle="O que mais ajudou você a descobrir as combinações?"` (mantém faixa com `rostoLeo` e fundo `fundoMaker`).
- Conteúdo: apenas grid 2×2 com as quatro opções clicáveis (mesmos textos atuais).
- Ao clicar, destacar a opção escolhida (borda/fundo verde como hoje) e abrir um `FeedbackModal` com:
  - `variant="final"`, `tone="info"` (borda laranja já é o padrão do variant final → atende "não usar fundo verde").
  - `message="Boa escolha! Cada pessoa pode encontrar um jeito que ajuda mais a pensar."` — o componente já remove "Muito bem!" quando final, e o título exibido é "Muito bem!". 
  - **Ajuste mínimo no `FeedbackModal`**: aceitar um `title` opcional para sobrescrever "Muito bem!" → passar `title="Boa escolha!"`. Sem mudar comportamento dos outros pop-ups (default continua "Muito bem!").
  - Botão `seguir.png` via `ImageButton` (já é o comportamento atual do variant final, `width={160}`).
- Não renderizar resumo matemático nem botão Recomeçar nesta etapa.
- Ao clicar em "Seguir" no pop-up → `setStep("closing")` e fecha o modal.

### Etapa 2 — Tela final de fechamento (`step === "closing"`)

Mesmo estilo da `MissionScreen`:

- `ScreenShell` com `title="Para fechar"` (curto) e sem subtitle, `showLeo={false}`.
- `leoMeioCorpo` em `position:absolute; left:12; bottom:0; width:320`.
- Card branco grande à direita (`left:340, right:60, top:110, bottom:140`), centralizado verticalmente, `border: 4px solid #fbbf24`, `borderRadius:22`, `padding:"24px 32px"`, `boxShadow`.
  - `<p>` principal (fontSize 22, bold): "Hoje você aprendeu que existem vários jeitos de contar combinações."
  - `<ul>` (fontSize 18, lineHeight 1.6) com os 4 registros:
    - 2 cabeças e 2 corpos → 2 × 2 = 4 robôs.
    - 3 cabeças e 2 corpos → 3 × 2 = 6 robôs.
    - 3 cabeças e 3 corpos → 3 × 3 = 9 robôs.
    - 4 cabeças e 3 corpos → 4 × 3 = 12 robôs.
  - `<p>` itálico de fechamento (fontSize 18): "Quando cada opção de um grupo combina com todas as opções de outro grupo, podemos multiplicar."
- Botão `recomecar.png` via `ImageButton` no canto inferior direito (`bottom:24, right:28`, `width={200}` — menor que antes, totalmente transparente pelo `ImageButton`).

### Regras respeitadas

- Não usa `leocorpointeiro`; usa `leoMeioCorpo`.
- Resumo aparece só após a resposta + Seguir no pop-up.
- Botão Recomeçar só na etapa de fechamento.
- `ImageButton` já garante sem fundo/borda/padding/box-shadow.
- Proporção 1200×675 e sem scroll preservadas (conteúdo cabe nos limites já usados em `MissionScreen`).
- Telas anteriores e lógica das atividades intactas.

### Arquivos alterados

- `src/screens/FinalScreen.tsx` — reescrita para as duas etapas.
- `src/components/FeedbackModal.tsx` — adicionar prop opcional `title?: string` usada apenas no variant final (default mantém "Muito bem!").

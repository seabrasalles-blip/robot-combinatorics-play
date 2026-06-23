## Objetivo
Restaurar a legibilidade dos títulos/instruções das telas internas, colocando-os dentro de uma faixa branca semitransparente com borda colorida, em vez de soltos sobre o fundo da oficina.

## Alteração
Editar apenas `src/components/ScreenShell.tsx` (usado por todas as telas internas: Assembly, Paths, Grid, MathRecord, Application, Mission, Final). Assim a correção se propaga sem mexer em cada tela.

### Novo header (faixa de orientação no topo)
- Container `header` com:
  - `background: rgba(255, 255, 255, 0.95)`
  - `border: 3px solid #f97316` (laranja; nas telas com tom azul mantemos laranja como padrão da oficina)
  - `borderRadius: 18px`
  - `padding: 12px 20px`
  - `boxShadow: 0 4px 12px rgba(0,0,0,0.15)`
  - `display: flex; alignItems: center; gap: 14px`
  - `maxWidth` ~90% centralizado, `margin: 0 auto 12px`
- Rosto do Léo (`rostoleo.png`) à esquerda dentro da faixa quando `showLeo` for true, ~56px, circular.
- Bloco de texto à direita, alinhado à esquerda:
  - `h1` título: `fontSize: 26`, `color: #0f172a` (azul-escuro), `fontWeight: 800`, **sem `textShadow`**.
  - `p` subtítulo: `fontSize: 18`, `color: #1e3a8a`, `fontWeight: 500`, sem sombra.
- Remover o `<img leo>` grande do canto inferior esquerdo (substituído pelo rostinho na faixa). Mantém prop `showLeo` para controlar a presença do rosto na faixa.

### Fora de escopo
Fundo `fundo-maker.png`, assets dos robôs, galeria, lógica de atividades, FeedbackModal, botão "Seguir", layouts internos das telas — nada disso muda.

## Resultado
Todas as telas internas passam a exibir título e instrução dentro de uma faixa branca legível, com Léo à esquerda, sem texto solto sobre o fundo e sem sombra escura.

Ajustar a Tela 1 (capa) para usar o asset `caparobo.png` como imagem de fundo completa e manter apenas o botão "Começar" transparente na parte inferior central.

### O que será alterado

- `src/screens/CoverScreen.tsx`
  - Remover o uso de `ScreenShell` para que `fundo-maker.png` não seja aplicado nesta tela.
  - Renderizar `caparobo.png` como imagem de fundo em tela cheia (`position: absolute; inset: 0; object-fit: cover`).
  - Remover título, subtítulo, personagem Leo e quaisquer robôs/ilustrações gerados por código.
  - Manter apenas o componente `ImageButton` com o asset `comecar.png`.
  - Posicionar o botão na parte inferior central da tela.

- `src/components/ImageButton.tsx` e `src/index.css`
  - Verificar/reforçar os estilos obrigatórios: `background: transparent`, `border: none`, `padding: 0`, `appearance: none`, `box-shadow: none`.

### O que NÃO será alterado

- Demais telas internas continuam usando `ScreenShell` com `fundo-maker.png`.
- A sequência pedagógica, pop-ups, drag-and-drop e regras do PRD original permanecem intactas.
- Os assets reais (`caparobo.png`, `comecar.png`, `fundo-maker.png`) continuam os mesmos, sem redesenhos.
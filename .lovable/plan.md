Ajustar a Tela 2 (Apresentação da missão) para usar o asset de meio corpo do Léo e reposicionar o balão de fala.

## O que será alterado
- Apenas `src/screens/MissionScreen.tsx` e `src/assets/placeholders.ts`.
- A capa (`CoverScreen.tsx`) e as demais telas não serão modificadas.

## Mudanças
1. `src/assets/placeholders.ts`
   - Adicionar import e export de `leomeiocorpo.png`.

2. `src/screens/MissionScreen.tsx`
   - Importar `leomeiocorpo`.
   - Passar `showLeo={false}` para `ScreenShell` para remover o Léo de corpo inteiro padrão (`leo.png`).
   - Renderizar `leomeiocorpo.png` no canto inferior esquerdo, maior (personagem de meio corpo).
   - Reposicionar o balão/cartão de fala para começar à direita do personagem, garantindo que não cubra o rosto do Léo.
   - Manter o fundo `fundo-maker.png` (via `ScreenShell`).
   - Manter o botão “Seguir” usando `seguir.png` com `ImageButton` (já transparente, sem borda, sem padding, sem box-shadow).

## Resultado esperado
- Tela 2 exibe `leomeiocorpo.png` no canto inferior esquerdo.
- Balão de fala aparece ao lado direito do personagem, sem sobrepor o rosto.
- Botão “Seguir” permanece no canto inferior direito, transparente.
- Demais telas inalteradas.
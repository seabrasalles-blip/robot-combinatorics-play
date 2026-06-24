## Problema

Na tela "Outras situações", a última linha de cada situação ("Resposta: …") aparece cortada/escondida pelo rodapé do card branco. Isso ocorre porque o conteúdo (texto da pergunta + 5 linhas com inputs + rodapé com botão "conferir") não cabe na altura disponível e o container usa `overflow: hidden`.

## Correção (apenas `src/screens/ApplicationScreen.tsx`)

Ajustes visuais para todo o conteúdo caber em 1200×675 sem scroll e sem corte:

1. **Card branco**: subir o topo de `top: 170` para `top: 160` e descer o fundo de `bottom: 100` para `bottom: 90`, ganhando ~20px de altura útil. Reduzir padding interno de `18px 18px 0 18px` para `14px 18px 0 18px`.
2. **Texto da pergunta**: reduzir `fontSize` de 19 → 17 e `margin-bottom` de 12 → 10.
3. **Linhas com inputs**: reduzir `gap` de 10 → 6, `fontSize` de 18 → 16, `lineHeight` de 1.6 → 1.4. Inputs: `width` 56 → 48, `fontSize` 19 → 16, `padding` `4px 8px` → `2px 6px`.
4. **Rodapé do card**: reduzir `padding` de `14px 6px 18px 0` para `8px 6px 10px 0` e `marginTop` 8 → 4. Botão "conferir": `padding` `10px 22px` → `8px 20px`, `fontSize` 18 → 16.
5. **Abas de situação (topo)**: reduzir `padding` `10px 12px` → `8px 10px` e `fontSize` 16 → 14, para abrir mais espaço vertical.

Resultado: as 5 linhas (incluindo "Resposta: …") ficam totalmente visíveis nas 3 situações, sem barra de rolagem e sem alterar lógica nem outras telas.

## Ajuste de layout — Tela 8 (ApplicationScreen)

Reorganizar o card branco principal para usar layout flex em coluna, com rodapé interno reservado para o botão "Conferir". Não alterar textos, respostas, validação ou abas.

### Mudanças em `src/screens/ApplicationScreen.tsx`

1. **Card principal** (`div` em `top:170, bottom:100`):
   - `display: flex; flexDirection: column;`
   - Remover `overflow: auto` (sem barra de rolagem).
   - `padding: 18 18 0 18` (remove padding inferior, o rodapé cuida disso).

2. **Área de conteúdo** (texto da situação + lacunas):
   - Envolver em um `div` com `flex: 1; minHeight: 0; overflow: hidden;`.
   - Reduzir levemente espaçamentos para caber no 16:9:
     - Texto da pergunta: `margin: 0 0 12px` (era 16), `fontSize: 19` (era 20).
     - Container de linhas: `gap: 10` (era 12), `fontSize: 18` (era 19).
     - `lineHeight: 1.6` (era 1.7).

3. **Rodapé interno do card** (novo):
   - `div` com `flexShrink: 0; padding: 14px 0 18px; marginTop: 8; borderTop: 1px solid #e2e8f0; display: flex; justifyContent: flex-end; alignItems: center; gap: 12; paddingRight: 6;`
   - Garante ≥24px entre o botão e as bordas inferior/direita do card (padding do card 18 + paddingRight 6 = 24 à direita; padding-bottom 18 + altura do botão dentro do rodapé com folga = ≥24 da base).
   - Move o `inlineMsg` e o `<button>` "Conferir" para este rodapé (mesmos estilos do botão).

4. **Outras telas e arquivos**: não alterados.

### Resultado esperado

- Conteúdo (texto + lacunas) ocupa a parte superior/central do card.
- Botão "Conferir" fica fixo no rodapé do próprio card, totalmente visível nas 3 situações, sem corte e sem scroll.
- Card continua cabendo inteiro na tela 16:9.

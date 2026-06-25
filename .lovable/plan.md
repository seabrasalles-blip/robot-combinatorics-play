## Objetivo
Tornar o feedback das telas de montagem sempre visível, mesmo quando o robô grande é revelado no centro.

## Mudanças em `src/screens/AssemblyScreen.tsx`

1. **Reposicionar a faixa de feedback (`inlineMsg`)**
   - Tirar do fluxo da coluna central (onde é coberta pelo robô revelado).
   - Renderizar como elemento posicionado absolutamente no topo da área central, logo abaixo da faixa de título/instrução (ex.: `position: absolute; top: 8px; left: 50%; transform: translateX(-50%); zIndex: 50`).
   - Adicionar sombra suave (`boxShadow: "0 6px 16px rgba(0,0,0,0.12)"`) e manter largura confortável (`maxWidth: 420`, `whiteSpace` adequado).

2. **Garantir z-index acima do robô revelado**
   - Faixa de feedback com `zIndex: 50`.
   - Container do robô revelado permanece com `zIndex` menor (default), de modo que a mensagem nunca seja coberta.

3. **Texto do feedback de acerto**
   - Substituir a mensagem atual de sucesso por:
     `"Boa combinação! Esse robô ainda não estava na galeria."`
   - Estilo: fundo verde claro (`#f0fdf4`), borda verde (`#16a34a`), texto verde escuro (`#166534`), sombra suave.

4. **Feedback de erro/atenção**
   - Mantém os textos atuais (peça no lugar errado, robô repetido).
   - Mesma posição/visibilidade da faixa de sucesso, com cor clara de atenção (fundo `#fff7ed`, borda `#ea580c`, texto `#9a3412`) e mesma sombra.

5. **Não alterar**
   - Lógica de `tryCheck`, `onDragEnd`, timer de revelação (1,2s), envio à galeria, modal final, contador, painéis laterais.

## Resultado esperado
Durante a revelação do robô montado, a faixa de feedback aparece centralizada acima do robô, sempre legível, sem encobrir a imagem.
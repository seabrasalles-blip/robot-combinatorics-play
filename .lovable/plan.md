## Avanço automático na tela "Aplicando em outras situações"

Arquivo afetado: `src/screens/ApplicationScreen.tsx`

### Mudanças

1. **Avanço automático após acerto**
   - Na função `check`, quando a resposta for considerada correta (`direct || swapped`), além de marcar `solved[idx] = true` e exibir o feedback verde, agendar um `setTimeout` de 2800 ms para:
     - Se ainda houver próxima situação: incrementar `idx`, limpar `inlineMsg`, manter os valores já zerados da próxima situação (já são `""` por padrão na inicialização de `values`).
     - Se for a última (`idx === situations.length - 1`): abrir o `FeedbackModal` final (`setShowFinalPopup(true)`), como já acontece hoje.
   - Guardar o id do timeout em um `useRef` e limpá-lo no `useEffect` de unmount para evitar avanços indevidos.

2. **Remover avanço manual intermediário**
   - Os botões de navegação superiores entre situações deixam de ser necessários para avançar, mas continuam visíveis apenas como indicador de etapa concluída (mantém o `✓`). Vou desabilitar o clique manual (mantendo o estado visual), já que o avanço passa a ser automático. Isso evita que o aluno pule etapas.
   - O botão "Seguir" lateral (que aparecia quando `allDone`) é removido, pois o modal final cuida da transição.

3. **Indicador de progresso "Situação X de 3"**
   - Adicionar um pequeno selo acima do card de conteúdo (à direita do conjunto de abas das situações ou logo abaixo delas) com o texto `Situação {idx + 1} de {situations.length}`, em destaque azul-escuro sobre fundo branco translúcido, alinhado ao padrão visual das outras telas.

4. **Erro continua na mesma situação**
   - Nenhuma mudança: o fluxo de erro já mantém o aluno na situação atual; apenas garantimos que o `setTimeout` de avanço só seja criado no ramo de acerto.

### O que NÃO muda

- Enunciados, dados, `answers`, `successMessage`, `swappedMessage`.
- Função `check` na parte de validação (ordem direta/invertida, detecção de soma, etc.).
- Layout do card, inputs, mensagem inline, estilo do botão "conferir".
- `FeedbackModal` final ao concluir a última situação.

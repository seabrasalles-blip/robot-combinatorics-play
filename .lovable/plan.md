### Ajuste do texto de fechamento na tela final

**Arquivo:** `src/screens/FinalScreen.tsx`

**Escopo:** Substituir o texto exibido na etapa de fechamento (`step === "closing"`) para a nova redação solicitada.

**Mudanças:**

1. **Título principal** (linha ~99)
   - De: `Hoje você aprendeu que existem vários jeitos de contar combinações.`
   - Para: `Hoje você descobriu que combinar também é uma forma de contar!`

2. **Lista de combinações** (linhas ~103–106)
   - Manter os mesmos valores numéricos, mas alterar o texto introdutório para:
   - `Na Oficina dos Robôs, cada cabeça podia combinar com todos os corpos:`
   - Itens da lista permanecem iguais:
     - `2 × 2 = 4 robôs`
     - `3 × 2 = 6 robôs`
     - `3 × 3 = 9 robôs`
     - `4 × 3 = 12 robôs`

3. **Parágrafo final** (linha ~108)
   - De: `Quando cada opção de um grupo combina com todas as opções de outro grupo, podemos multiplicar.`
   - Para: `Quando cada opção de um grupo combina com todas as opções de outro, podemos usar a multiplicação para descobrir o total.`

4. **Novo parágrafo de fechamento**
   - Adicionar após o parágrafo de multiplicação:
   - `Combinar com organização ajuda a não repetir e a não esquecer nenhuma possibilidade!`

**O que NÃO muda:**
- Layout, posicionamento, estilos, cores, bordas, sombras.
- Etapa de pergunta metacognitiva (`step === "question"`).
- Imagem do Léo, botão Recomeçar, FeedbackModal.
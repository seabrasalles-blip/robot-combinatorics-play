Ajustar a validação e os feedbacks em `src/screens/ApplicationScreen.tsx` para aceitar a inversão da ordem dos fatores e usar mensagens pedagogicamente adequadas a cada tipo de erro.

## Regras de validação (por situação)

Para cada situação com fatores `a` e `b` (a = primeiro grupo do enunciado, b = segundo), os campos da tela são:
- `0`, `1` — dados do enunciado (devem permanecer fixos: `a`, `b`).
- `2`, `3` — "X grupos de Y".
- `4`, `5` — "X × Y".
- `6` — resultado da conta.
- `7` — resposta final.

Nova lógica:

1. Campos `0` e `1` continuam exigindo exatamente `a` e `b` (vêm direto do enunciado).
2. Os pares `(2,3)` e `(4,5)` passam a aceitar tanto `(a,b)` quanto `(b,a)`, desde que cada par esteja consistente entre si (ambos na mesma ordem).
3. Campos `6` e `7` devem ser iguais a `a*b`.
4. Se tudo acima estiver correto → resposta válida.
   - Se a ordem usada nos pares `(2,3)/(4,5)` for a "direta" do enunciado → `successMessage` atual da situação.
   - Se a ordem estiver invertida → mensagem explicativa de inversão (ver abaixo).

## Detecção do feedback "somou os dois grupos"

Só exibir essa mensagem quando o aluno realmente somou: quando os campos `6` ou `7` forem iguais a `a+b` (e diferentes de `a*b`). Caso contrário, usar o feedback investigativo genérico.

## Mensagens

- Campos vazios (mantém): "Faltou completar uma parte do raciocínio…".
- Acerto na ordem direta: `successMessage` já definida em cada situação.
- Acerto com inversão de ordem: mensagem específica por situação.
  - Sorveteria (2 sabores × 4 coberturas): "Você encontrou o total correto: 8 escolhas. Como há 2 sabores e cada sabor combina com 4 coberturas, também podemos organizar como 2 grupos de 4."
  - Caminhos (3 entradas × 4 caminhos): "Você encontrou o total correto: 12 trajetos. Como há 3 entradas e de cada entrada saem 4 caminhos, também podemos organizar como 3 grupos de 4."
  - Pulseiras (5 cores × 2 pingentes): "Você encontrou o total correto: 10 modelos. Agora observe o registro: como há 5 cores e cada cor combina com 2 pingentes, também podemos organizar como 5 grupos de 2."
- Erro detectado como soma (`6` ou `7` = `a+b`): "Parece que você somou os dois grupos. Mas aqui queremos descobrir todas as combinações: cada opção de um grupo pode se juntar com todas as opções do outro."
- Demais erros (total incorreto, fator trocado, etc.): "Revise as combinações: cada cor pode se juntar com cada pingente. Quantas possibilidades aparecem quando todas as cores encontram todos os pingentes?"
  - (A frase mantém o tom investigativo solicitado; é genérica o suficiente para servir às três situações.)

## Mudanças no arquivo

- Em cada item de `situations`, adicionar `swappedMessage: string` (e remover a dependência da ordem fixa nos campos 2–5).
- Reescrever a função `check()`:
  - Validar vazios → mensagem atual.
  - Calcular `a = answers[0]`, `b = answers[1]`, `total = a*b`, `sum = a+b`.
  - Verificar pares `(2,3)` e `(4,5)` em qualquer das duas ordens válidas.
  - Verificar `values[6] === total` e `values[7] === total`.
  - Decidir entre: sucesso direto, sucesso invertido, erro-soma, erro genérico investigativo.
- Não alterar layout, estilos, ScreenShell, FeedbackModal final, navegação, nem a estrutura visual dos campos.
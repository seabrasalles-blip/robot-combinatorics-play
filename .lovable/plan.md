## Tela 8 — Novas situações

Substituir o array `situations` em `src/screens/ApplicationScreen.tsx` pelos três casos pedidos. Cada situação passa a ter **8 lacunas** (antes eram 7), o que já é suportado pelo `renderLine` e por `values`/`check` existentes — basta atualizar o conteúdo.

### Novas situações

1. **Sorveteria — 2 × 4 = 8**
   - Texto: "Na sorveteria, há 2 sabores de sorvete e 4 coberturas. Quantas escolhas diferentes podem ser feitas?"
   - Lacunas:
     - "Tenho {0} sabores."
     - "Cada sabor pode combinar com {1} coberturas."
     - "Então posso pensar em {2} grupos de {3}."
     - "Conta: {4} × {5} = {6}."
     - "Resposta: podem ser feitas {7} escolhas diferentes."
   - Respostas: `["2","4","2","4","2","4","8","8"]`

2. **Caminhos no parque — 3 × 4 = 12**
   - Texto: "Para chegar ao lago, Ana pode escolher 3 entradas do parque. De cada entrada, saem 4 caminhos. Quantos trajetos diferentes ela pode fazer?"
   - Lacunas:
     - "Ana pode começar por {0} entradas."
     - "De cada entrada, saem {1} caminhos."
     - "Então posso pensar em {2} grupos de {3}."
     - "Conta: {4} × {5} = {6}."
     - "Resposta: Ana pode fazer {7} trajetos."
   - Respostas: `["3","4","3","4","3","4","12","12"]`

3. **Pulseiras coloridas — 5 × 2 = 10**
   - Texto: "Na oficina de artes, há 5 cores de pulseira e 2 pingentes. Quantos modelos diferentes podem ser criados?"
   - Lacunas:
     - "Há {0} cores de pulseira."
     - "Cada cor pode combinar com {1} pingentes."
     - "Então são {2} grupos de {3}."
     - "Conta: {4} × {5} = {6}."
     - "Resposta: podem ser criados {7} modelos de pulseira."
   - Respostas: `["5","2","5","2","5","2","10","10"]`

### Atualizações de label das abas

Trocar os títulos das abas no topo para refletir os novos contextos:
- "Situação 1 — Sorveteria"
- "Situação 2 — Caminhos"
- "Situação 3 — Pulseiras"

### Sem alterações

- Lógica de validação (`check`), feedback inline, bloqueio de abas até a anterior ser concluída, pop-up final, botão "Seguir", `renderLine`, estilos e todas as outras telas.

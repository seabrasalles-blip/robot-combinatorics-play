## Objetivo

Atualizar todos os feedbacks de acerto para que expliquem brevemente o raciocínio matemático (EF04MA08), em vez de apenas comemorar. Manter o layout atual (inline verde para acertos parciais; modal final para conclusão de etapa).

## Alterações por arquivo

### `src/screens/AssemblyScreen.tsx`
- Inline ao descobrir novo robô (linha 66): trocar `"Robô descoberto!"` por  
  *"Boa combinação! Você juntou uma cabeça e um corpo que ainda não tinham aparecido juntos."*

### `src/pages/Index.tsx` (mensagens finais das telas 3 e 4)
- Tela 3 (`completionMessage`): trocar pela mensagem unificada do usuário  
  *"Você completou a galeria! Todas as cabeças foram combinadas com todos os corpos."*
- Tela 4 (`completionMessage`): mesma mensagem  
  *"Você completou a galeria! Todas as cabeças foram combinadas com todos os corpos."*

### `src/screens/GridScreen.tsx`
- Adicionar `inlineTone` (`"success" | "warn"`) e fazer `inlineMsgStyle` aceitar tom, exibindo verde para sucesso (igual ao AssemblyScreen).
- Após colocar o robô na célula correta, exibir inline:  
  *"Isso mesmo! O robô ficou no encontro da cabeça da coluna com o corpo da linha."*
- Mensagem do `FeedbackModal` final (linha 160) → trocar para:  
  *"Quadro completo! Ele ajuda a organizar as combinações e a conferir se nenhuma possibilidade ficou de fora."*

### `src/screens/PathsScreen.tsx`
- Acrescentar `inlineTone` análogo (verde/laranja).
- Ao adicionar caminho novo válido, mostrar inline:  
  *"Caminho correto! Essa linha mostra uma combinação possível entre uma cabeça e um corpo."*
- Mensagem do `FeedbackModal` final (linha 229) → trocar para:  
  *"Caminhos completos! Cada linha representa uma combinação diferente."*

### `src/screens/MathRecordScreen.tsx`
- Mensagem do `FeedbackModal` final (linha 138) → trocar para:  
  *"Excelente! Você transformou as combinações em registro matemático. A soma repetida e a multiplicação mostram o mesmo total."*
- (A segunda variação "Isso mesmo! A multiplicação ajuda…" é coberta pelo mesmo momento de conclusão e não exige novo gatilho, já que há apenas um botão "conferir" final.)

### `src/screens/ApplicationScreen.tsx`
- Adicionar campo `successMessage` em cada situação:
  - Sorveteria: *"Correto! Cada sabor pode ser combinado com todas as coberturas. Por isso, contamos todas as escolhas possíveis de sorvete."*
  - Caminhos: *"Muito bem! Cada entrada pode levar a diferentes trilhas. Você contou todos os caminhos possíveis."*
  - Pulseiras: *"Isso mesmo! Cada cor pode combinar com cada pingente. Assim descobrimos quantas pulseiras diferentes podem ser montadas."*
- Adicionar `inlineTone` e exibir a mensagem verde inline quando a situação é resolvida (ao lado/abaixo do botão concluído).
- Mensagem do `FeedbackModal` final (linha 152) → trocar para:  
  *"Parabéns! Você usou a mesma ideia em situações diferentes: combinar cada opção de um grupo com todas as opções do outro."*

## Estilo
- Reutilizar a paleta verde já presente no AssemblyScreen (`#ecfdf5` fundo, `#16a34a` borda, `#166534` texto) para os novos inline-tones de sucesso em GridScreen, PathsScreen e ApplicationScreen.
- Manter tamanhos (`fontSize: 14`, padding 6×12) — todas as frases foram dimensionadas para caber em uma ou duas linhas.

## Fora de escopo
- Sem mudanças de layout, fluxo, lógica de validação ou assets.

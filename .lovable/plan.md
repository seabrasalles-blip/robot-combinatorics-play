## Objetivo

Trocar os textos de feedback de erro/aviso das telas interativas pelas novas versões pedagógicas, mantendo o visual atual (faixa inline laranja) e sem alterar lógica de jogo nem layout.

## Alterações por arquivo

### `src/screens/AssemblyScreen.tsx`
- Linha 59 — robô repetido: trocar para  
  *"Esse robô já está na galeria. Para não repetir, escolha uma cabeça e teste todos os corpos com ela antes de trocar."*
- Linha 90 — peça no espaço errado: trocar para  
  *"Observe os espaços: a cabeça fica em cima e o corpo fica embaixo. Arraste cada peça para o lugar certo."*
- (Conforme resposta do usuário) **não** adicionar feedback de "solto fora da área".

### `src/screens/GridScreen.tsx`
- Linha 51 — célula errada: trocar para  
  *"Ainda não é esse lugar. Procure a coluna da cabeça e a linha do corpo. A casa certa fica onde as duas se encontram."*
- Linha 54 — adicionar feedback quando a célula já está preenchida (`if (filled[cellId]) { setInlineMsg("Essa casa já tem um robô. Procure uma casa vazia e confira a cabeça da coluna com o corpo da linha."); return; }`).

### `src/screens/PathsScreen.tsx`
- Linha 54 — linha que não chega a um corpo: trocar para  
  *"O caminho precisa sair de uma cabeça e chegar a um corpo. Tente puxar a linha até uma das opções do outro lado."*
- Linha 67 — caminho repetido: trocar para  
  *"Essa ligação já foi feita. Para completar todos os caminhos, escolha uma cabeça e confira se ela já foi ligada a todos os corpos."*

### `src/screens/MathRecordScreen.tsx`
- Linha 22 — campos vazios: trocar para  
  *"Ainda há espaços vazios. Complete cada parte do registro para mostrar como você pensou."*
- Linha 30 — erro de preenchimento: trocar para  
  *"Observe os dois grupos. Primeiro veja quantas opções há em um grupo. Depois pense: quantas opções combinam com cada uma delas?"*

### `src/screens/ApplicationScreen.tsx`
- Linha 60 — campos vazios: trocar para  
  *"Faltou completar uma parte do raciocínio. Volte ao enunciado e procure quais são os dois grupos de opções."*
- Linha 70 — erro de cálculo: trocar para  
  *"Parece que você somou os dois grupos. Mas aqui queremos descobrir todas as combinações: cada opção de um grupo pode se juntar com todas as opções do outro."*

## Fora de escopo
- Layout, cores e estilos da faixa inline permanecem inalterados (já são compactos: padding 6×12, fonte 14px).
- Nenhuma alteração na lógica do jogo, modais finais, assets ou estrutura das telas.

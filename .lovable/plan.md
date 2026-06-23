
## Objetivo

Remover pop-ups intermediários nas telas de montagem. Pop-up grande só aparece no fim de cada etapa, contendo o único botão "Seguir". O botão lateral "Seguir" deixa de ser renderizado enquanto o pop-up final estiver aberto.

## Mudanças por arquivo

### 1. `src/components/FeedbackModal.tsx`
Adicionar suporte a um modo "final" persistente que usa o asset `btnSeguir` no lugar de `btnEntendi`, sem botão de fechar pelo X/clique externo.

- Nova prop opcional: `variant?: "info" | "final"` (default `info`).
- Nova prop opcional: `confirmLabel?: "entendi" | "seguir"` (ou simplesmente `final: boolean`).
- Quando `variant === "final"`, renderizar `ImageButton` com `btnSeguir` e o `onClose` aciona o callback de avançar tela.

### 2. `src/screens/AssemblyScreen.tsx`
- Substituir estado `feedback` (modal) por dois estados:
  - `inlineMsg: string | null` — mensagem curta exibida na área central de montagem (acima/abaixo dos slots), some assim que o usuário inicia nova tentativa (`onDragEnd` limpa antes de processar).
  - `showFinalPopup: boolean` — true quando `found.size === total`.
- Remover qualquer chamada `setFeedback({ tone: "success" })` para acertos intermediários: só atualizar galeria/contador.
- Manter mensagens inline curtas para: peça no slot errado, robô repetido.
- Ao concluir (`next.size === total`): setar `showFinalPopup = true` com `completionMessage`.
- Esconder o `ImageButton` "Seguir" externo enquanto `showFinalPopup === true`. Quando o usuário clicar "Seguir" do pop-up: chamar `onNext()`. O reset de estados acontece naturalmente pois o componente desmonta ao trocar de tela; ainda assim, antes de chamar `onNext`, limpar `showFinalPopup` e `inlineMsg`.
- Renderizar `FeedbackModal` apenas no fim (variant `final`).

### 3. `src/screens/PathsScreen.tsx`
- Mesma estrutura: trocar `feedback` por `inlineMsg` (curta, perto da área de ligação) + `showFinalPopup` ao atingir `paths.size === total`.
- Remover feedbacks intermediários de acerto (mensagem "Boa! Essa cabeça já combinou..."). Apenas atualizar contador `Caminhos: x/6`.
- Manter inline: "caminho repetido" e "ligação inválida".
- Esconder botão lateral "Seguir" enquanto `showFinalPopup === true`.

### 4. `src/screens/GridScreen.tsx`
- Trocar `feedback` por `inlineMsg` (peça no lugar errado) + `showFinalPopup` ao preencher 9 células.
- Esconder botão lateral enquanto popup final aberto.

### 5. `src/screens/MathRecordScreen.tsx`
- Trocar feedback de erro por mensagem inline curta abaixo do botão "conferir".
- Trocar feedback de sucesso pelo pop-up final (`showFinalPopup`) e esconder botão lateral enquanto aberto.

### 6. `src/screens/ApplicationScreen.tsx`
- Erros e "preencha tudo" viram mensagem inline curta ao lado/baixo do botão "conferir".
- Acerto individual (`solved[idx] = true`) sem pop-up — apenas marca a aba como concluída.
- Quando `allDone` virar true, abrir pop-up final único com mensagem pedagógica e botão "Seguir". Esconder botão lateral enquanto aberto.

## Regra invariante aplicada a todas as telas

```text
{!showFinalPopup && done && <ImageButton Seguir externo />}
<FeedbackModal variant="final" open={showFinalPopup} onConfirm={() => { setShowFinalPopup(false); setInlineMsg(null); onNext(); }} />
```

## Estilo da mensagem inline (padrão)

Pequeno card com texto curto, sem overlay:
- posição relativa ao componente de montagem (logo abaixo do contador / do botão "conferir"),
- fundo claro com borda colorida conforme tom (warn = laranja, info = azul),
- `fontSize: 14`, `padding: "6px 12px"`, `borderRadius: 10`,
- limpa em qualquer nova ação do usuário (drag start, change de input, click conferir).

## Fora de escopo

- Assets, fundos, galeria, lógica pedagógica, conteúdo textual das mensagens finais permanecem inalterados.

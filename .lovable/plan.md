# Redesign do pop-up final de feedback

## Escopo

Apenas o layout visual do `FeedbackModal` quando `variant="final"`, mais a ocultação do botão "limpar" da `AssemblyScreen` enquanto o pop-up final estiver aberto. Nenhuma mudança em lógica de jogo, robôs, galeria, fundos ou outros assets.

## 1. `src/components/FeedbackModal.tsx` — variante `final` mais limpa

Quando `variant === "final"`:

- Card mais compacto: `maxWidth: 420`, `width: "min(420px, 86%)"`, `padding: "22px 26px 20px"`.
- Fundo `rgba(255,255,255,0.96)` (remover verde).
- Borda `3px solid #f97316` (laranja, casa com a faixa de orientação e a paleta da oficina). Cantos `borderRadius: 22`.
- Sombra suave: `boxShadow: "0 12px 28px rgba(0,0,0,0.18)"`.
- Conteúdo centralizado (`textAlign: "center"`).
- Título curto fixo: `<h2>Muito bem!</h2>` — `fontSize: 26`, `fontWeight: 800`, `color: #0f172a`, `margin: "0 0 10px"`.
- Mensagem pedagógica abaixo: usa `message` recebido, removendo prefixo redundante `"Muito bem! "` se existir. `fontSize: 17`, `lineHeight: 1.4`, `color: #1e293b`, `fontWeight: 500`, `margin: "0 0 18px"`.
- Botão `seguir.png` via `ImageButton` com `width={160}` (dentro do alvo 150–170 px), centralizado por wrapper `display: flex; justifyContent: center`. Sem alteração no `ImageButton` (já é transparente, sem borda/padding/sombra).

Variante `info` (não-final) permanece como está hoje — fora do escopo.

## 2. `src/screens/AssemblyScreen.tsx` — esconder "limpar" com pop-up aberto

- Renderizar o `<button>limpar</button>` (linhas 113–119) somente quando `!showFinalPopup`.
- Nenhuma outra tela tem botões adicionais sobre o fundo a esconder (verificado por busca: só `AssemblyScreen` tem "limpar"; os botões "Seguir" das telas já são condicionados a `!showFinalPopup`).

## Fora de escopo

Lógica do jogo, mensagens pedagógicas (texto), robôs, galeria, faixa de orientação, fundo da oficina, outros assets, variante `info` do modal.

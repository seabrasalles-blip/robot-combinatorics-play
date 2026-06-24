## Problema

O `FeedbackModal.tsx` ainda usa um único bloco de estilos para `info` e `final`. Quando o pop-up final abre com `tone="success"`, o card recebe `background: "#ecfdf5"` (verde-claro) e `border: 5px solid #16a34a` (verde). O redesign anterior não foi aplicado ao arquivo.

## Correção

Em `src/components/FeedbackModal.tsx`, separar o estilo do card por `variant`:

- **`variant === "final"`** (novo visual limpo, ignora `tone`):
  - Card: `background: "rgba(255,255,255,0.96)"`, `border: "3px solid #f97316"` (laranja), `borderRadius: 22`, `padding: "22px 26px 20px"`, `maxWidth: 420`, `width: "min(420px, 86%)"`, `boxShadow: "0 12px 28px rgba(0,0,0,0.18)"`, `textAlign: "center"`.
  - Título fixo `<h2>Muito bem!</h2>`: `fontSize: 26`, `fontWeight: 800`, `color: "#0f172a"`, `margin: "0 0 10px"`.
  - Mensagem (`message` recebido, removendo prefixo `"Muito bem! "` se presente): `fontSize: 17`, `lineHeight: 1.4`, `fontWeight: 500`, `color: "#1e293b"`, `margin: "0 0 18px"`.
  - Botão: `ImageButton src={btnSeguir}` com `width={160}`, centralizado (sem fundo/borda/padding extra — `ImageButton` já é transparente).

- **`variant === "info"`** (mantém o atual): card colorido por `tone`, `maxWidth: 720`, `width: "70%"`, botão `btnEntendi` com `width={135}`.

Botão "limpar" da tela de fundo: já foi condicionado a `!showFinalPopup` em `AssemblyScreen.tsx` em iteração anterior — confirmar que ainda está assim e manter.

## Fora de escopo

Lógica do jogo, mensagens pedagógicas, robôs, galeria, faixa de orientação, fundo da oficina, outros assets, variante `info`.

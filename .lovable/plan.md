# Ajuste do tempo de exibição do feedback de acerto

## O que será feito

Aumentar o tempo de exibição do feedback de acerto (e do robô montado no centro) nas telas de montagem dos robôs, de aproximadamente 1,2 segundo para aproximadamente 3 segundos, dando tempo suficiente para a criança ler a mensagem antes de o robô ser enviado à galeria.

## Arquivo afetado

- `src/screens/AssemblyScreen.tsx`

## Mudança técnica

1. Alterar o valor do `setTimeout` na função `tryCheck` de `1200` ms para `3000` ms.
2. Atualizar o comentário próximo ao timer para refletir o novo tempo ("3s" no lugar de "1,2s").

## O que não muda

- Posição e z-index do feedback (continua acima do robô, visível).
- Texto da mensagem: "Boa combinação! Esse robô ainda não estava na galeria."
- Lógica de validação das combinações.
- Envio do robô para a galeria após o timer.
- Mecânica principal do jogo (arrastar peças, montar, limpar, galeria, modal final).
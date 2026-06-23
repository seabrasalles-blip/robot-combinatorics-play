# Plano: Melhoria da faixa de orientação das telas internas

## Objetivo
Refinar o visual do componente `ScreenShell` para que a faixa de orientação fique mais equilibrada, legível e com menos espaço vazio, sem alterar lógica, fundo, assets dos robôs ou botões de navegação.

## Alterações em `src/components/ScreenShell.tsx`

1. **Dimensões e posicionamento da faixa**
   - Reduzir a largura da faixa para uma largura fixa confortável (`maxWidth: 720px`), centralizada no topo.
   - Manter margens laterais e superior confortáveis (`margin: "14px auto 10px"`).
   - Fundo branco com leve transparência: `rgba(255, 255, 255, 0.94)`.
   - Borda laranja fina: `2px solid #f97316`.
   - Arredondamento generoso: `borderRadius: 24px`.
   - Sombra suave para separar do fundo: `boxShadow: 0 6px 18px rgba(0,0,0,0.12)`.

2. **Ícone do Léo**
   - Manter `rostoLeo.png` como ícone à esquerda.
   - Criar um círculo azul-claro (`#dbeafe`) por trás do rosto, com borda laranja (`2px solid #f97316`).
   - Dimensões do círculo: `52px × 52px`; imagem do rosto: `44px × 44px`, centralizada e arredondada.

3. **Tipografia e hierarquia**
   - Título em azul-escuro (`#0f172a`), maior e em negrito: `fontSize: 28px`, `fontWeight: 800`, `lineHeight: 1.1`.
   - Subtítulo abaixo do título, menor mas bem legível: `fontSize: 16px`, `color: #1e40af`, `fontWeight: 500`, `lineHeight: 1.3`.
   - Remover qualquer `textShadow` ou contorno escuro.
   - Garantir que não haja texto solto sobre o fundo da oficina.

4. **Espaçamento interno**
   - Reduzir o espaço vazio à direita ajustando o padding (`padding: "10px 18px"`).
   - Alinhar texto à esquerda, próximo do ícone, sem esticar a coluna de texto.

## Telas afetadas
Todas as telas internas que utilizam `ScreenShell` herdarão o novo layout automaticamente:
- `AssemblyScreen` (telas 3 e 4)
- `GridScreen` (tela 5)
- `PathsScreen` (tela 6)
- `MathRecordScreen` (tela 7)
- `ApplicationScreen` (tela 8)

## Fora de escopo
- Lógica das atividades (drag/drop, respostas, contadores, galeria).
- Assets dos robôs e fundo `fundo-maker.png`.
- Botões "Seguir" / "Recomeçar" e modais de feedback.
- Telas `CoverScreen`, `FinalScreen` e `MissionScreen` (se não usarem `ScreenShell`).

## Validação
Após a edição, será verificado:
- Build do Vite sem erros (`bun run build` ou equivalente).
- Preview para confirmar que a faixa está centralizada, mais estreita, com título maior, subtítulo abaixo e sem textos soltos sobre o fundo.

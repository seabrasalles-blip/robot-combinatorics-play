## Objetivo

Trocar todos os placeholders SVG por **PNGs reais** do `assets.zip`, sem redesenhar nada, e garantir que botões fiquem com fundo transparente.

## Etapas

### 1. Copiar os 19 PNGs para `src/assets/`
Extrair de `/mnt/user-uploads/assets.zip` para `src/assets/` com os nomes exatos:
- Fundos/cena: `fundo-maker.png`, `caparobo.png`
- Leo: `leo.png`, `leomeiocorpo.png`, `leomeiocorpo1.png`, `leocorpointeiro.png`, `rostoleo.png`
- Cabeças: `cabeca1.png` … `cabeca4.png`
- Corpos: `corpo1.png` … `corpo3.png`
- Botões: `comecar.png`, `comecar2.png`, `seguir.png`, `recomecar.png`, `dica.png`

### 2. Reescrever `src/data/robots.ts`
Importar `cabeca1-4.png` e `corpo1-3.png` direto de `@/assets/...` e exportar `heads` e `bodies` exatamente no formato pedido pelo PRD.

### 3. Apagar/limpar `src/assets/placeholders.ts`
Remover os SVGs gerados. Substituir todos os imports espalhados pelo projeto (`fundoMaker`, `leo`, `caparobo`, `btnComecar`, `btnSeguir`, `btnRecomecar`, `btnVoltar`, `btnEntendi`) por imports diretos dos PNGs:
- `import fundoMaker from "@/assets/fundo-maker.png"`
- `import leo from "@/assets/leo.png"` (e variantes nas telas que pedirem)
- `import btnComecar from "@/assets/comecar.png"`
- `import btnSeguir from "@/assets/seguir.png"`
- `import btnRecomecar from "@/assets/recomecar.png"`
- `import btnDica from "@/assets/dica.png"`

Para botões hoje cobertos por SVG mas sem PNG correspondente (ex.: "Voltar", "Entendi"), substituir por **botão de texto estilizado** (não inventar PNG) ou reaproveitar `seguir.png` / `recomecar.png` quando fizer sentido pedagógico. Pedirei confirmação se houver dúvida ao implementar.

### 4. Aplicar CSS de botão transparente
Em `src/index.css`, adicionar exatamente o bloco solicitado:
```css
button.image-button { background: transparent; border: none; padding: 0; appearance: none; box-shadow: none; }
button.image-button img { display: block; width: 100%; height: auto; }
```
E garantir que `ImageButton.tsx` renderize `<button className="image-button"><img ... /></button>`.

### 5. Aplicar `fundo-maker.png` como fundo em todas as telas
No `ScreenShell.tsx` (ou no `Stage`), trocar o background atual pelo PNG. Verificar capa (`CoverScreen`), missão, montagem, grade, caminhos, registro, aplicação e final.

### 6. Personagem Leo
Capa e tela de missão: usar `leo.png` (corpo inteiro). Telas internas com balão: usar `leomeiocorpo.png` ou `rostoleo.png` conforme o enquadramento já existente — sem redesenhar.

### 7. Cabeças e corpos nos componentes
`RobotPreview.tsx`, `DragPiece.tsx`, `DropSlot.tsx`, `GridScreen`, `PathsScreen`: garantir que toda imagem de cabeça/corpo venha de `heads[i].image` / `bodies[i].image` (PNGs). Remover qualquer fallback SVG.

### 8. Verificação final
- `rg "placeholders"` deve retornar zero referências.
- Build limpo.
- Conferir visualmente capa, montagem 2x2, montagem 3x2, grade, caminhos.

## Observações
- Os PNGs são pequenos (todos < 300 KB; total ~1.8 MB), então vão direto para `src/assets/` como pediu — sem migrar para CDN, para manter o import `@/assets/...` exato do PRD.
- A sequência pedagógica, pop-ups persistentes, drag-and-drop e regras de revelar/ocultar totais **não serão alteradas**.
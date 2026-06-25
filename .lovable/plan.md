Tarefa: ajustar a tela 5 (Quadro de dupla entrada) para que a ordem visual dos robôs no painel lateral "Arraste os robôs" seja randômica, mas permaneça estável durante a atividade.

Escopo
- Alterar apenas `src/screens/GridScreen.tsx`.
- Não alterar `src/data/robots.ts`, IDs, imagens, combinações corretas, validação do quadro, ordem das cabeças no topo nem dos corpos na lateral.
- Manter layout, tamanho dos cards e grade 3×3 do painel lateral.
- Garantir que drag-and-drop continue funcionando com os robôs em ordem diferente.

Implementação
1. Criar uma função utilitária de embaralhamento (Fisher–Yates) dentro de `GridScreen.tsx` ou em `src/data/robots.ts`, sem side effects.
2. Gerar, uma única vez na montagem do componente, uma lista `shuffledOrder` com todos os 9 robôs combinados em ordem aleatória.
   - Usar `useMemo` para estabilidade.
   - A lista é baseada em `allCombos`, que já é estável via `useMemo`.
3. Para renderizar o painel lateral, filtrar `shuffledOrder` para remover robôs já colocados no quadro (`placed`).
   - A filtragem preserva a ordem aleatória original.
4. Não reordenar a lista a cada renderização, a cada tentativa ou a cada arraste.

Validação
- Conferir que a tela renderiza 9 cards em grade 3×3 no painel lateral.
- Conferir que após arrastar um robô corretamente para o quadro, os robôs restantes mantêm suas posições.
- Conferir que o drag-and-drop continua respondendo e validando as combinações corretas.
- Rodar build/typecheck para garantir que não há regressões de tipo.
## Problema

O `package.json` já está com `react-router-dom ^7.18.0` e `recharts ^3.9.0` (versões sem as vulnerabilidades), mas o scanner ainda detecta `6.30.1` e `2.15.4`. Isso indica que o **lockfile (`bun.lock`) está desatualizado** — ele ainda fixa as versões antigas, então a instalação real continua trazendo os pacotes vulneráveis.

## Correção

1. Reinstalar dependências para regenerar o lockfile com as versões novas:
   - `rm bun.lock && bun install`
2. Confirmar que `bun.lock` agora referencia `react-router-dom@7.x` e `recharts@3.x`.
3. Rodar o scan de dependências (`code--dependency_scan`) para validar que as vulnerabilidades sumiram.
4. Como `recharts` v3 mudou a API e o arquivo `src/components/ui/chart.tsx` já está com `// @ts-nocheck` (não usado no app), nenhuma mudança de código é necessária. Verificar build mesmo assim.

## Observação

Se preferir não atualizar para `react-router-dom` v7 (major bump já aplicado anteriormente), uma alternativa é remover `recharts` completamente já que não é usado — mas como o `package.json` já foi bumped, basta sincronizar o lockfile.
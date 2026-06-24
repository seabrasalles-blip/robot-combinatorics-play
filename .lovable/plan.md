## Atualizar dependências vulneráveis

Atualizar dois pacotes para versões que corrigem as vulnerabilidades altas (e também as moderadas relacionadas).

### Mudanças

- `bun add react-router-dom@^6.30.2` — corrige XSS via Open Redirects e os dois open-redirect moderados.
- `bun add recharts@^2.15.5` (ou mais recente da linha 2.x) — atualiza lodash transitivo para versão sem Code Injection nem Prototype Pollution.

Ambos são updates minor/patch dentro da major já usada; não há mudanças de API esperadas. Após instalar, validar que o build passa.

### Arquivos afetados

- `package.json`, `bun.lockb` (atualizados automaticamente pelos comandos).
- Nenhum código de aplicação precisa mudar.

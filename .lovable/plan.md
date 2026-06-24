Retirar o contador da tela "Continue investigando (3 cabeças e 2 corpos)".

```text
+----------------------------+
|  Faixa de orientação       |
|  (título + subtítulo)      |
+----------------------------+
|  [área central sem         |
|   contador "Robôs          |
|   descobertos"]            |
+----------------------------+
```

1. **`src/screens/AssemblyScreen.tsx`**
   - Adicionar prop opcional `showCounter` com valor padrão `true`.
   - Renderizar o `<div style={counter}>` apenas quando `showCounter === true`.
   - Manter `showTotalInCounter` inalterado para a tela de 2×2.

2. **`src/pages/Index.tsx`**
   - Passar `showCounter={false}` no `<AssemblyScreen>` da tela 4 (3 cabeças e 2 corpos).

3. **Fora de escopo:** fundo, assets dos robôs, botões, galeria, lógica de atividade, `ScreenShell`, outras telas.
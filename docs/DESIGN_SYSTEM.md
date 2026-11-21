# Design system

## Identidade

Engenharia editorial: títulos expressivos, grade discreta, superfícies delimitadas e ilustrações que explicam estruturas. A marca original DK usa traços de código e um favicon SVG. Sem fotografia fictícia, números decorativos, depoimentos, brilhos ou carrosséis.

Tokens em `src/styles/global.css`:

| Papel              | Escuro  | Claro   |
| ------------------ | ------- | ------- |
| Fundo              | #0B1120 | #F8FAFC |
| Superfície         | #111B2B | #FFFFFF |
| Superfície elevada | #151F30 | #EEF3FA |
| Texto              | #F1F5F9 | #15223B |
| Texto secundário   | #A2B0C6 | #4D5F77 |
| Texto auxiliar     | #8191A9 | #5D6E85 |
| Acento             | #38BDF8 | #036C9C |
| Secundária         | #A5B4FC | #4C4FA6 |
| Borda              | #283449 | #CBD5E1 |

## Tipografia e composição

Manrope Variable para conteúdo e JetBrains Mono Variable para metadados, distribuídas localmente por Fontsource (licenças OFL nos pacotes). Corpo de 16px, textos editoriais compactos de 14–16px e metadados secundários menores. Escala fluida de títulos. Layout máximo de 1280px; margens adaptadas em 1100, 800 e 540px.

Hero em duas colunas com diagrama funcional, cinco projetos em grid 2+3 no desktop, uma coluna no celular. Seções de formação, stack, pesquisa e contato têm ritmos visuais distintos. Espaçamentos usam múltiplos de 4/8px e unidades relativas.

## Componentes

- Botão primário: preenchimento no acento; ícone com função reconhecível.
- Link secundário: contraste textual, área de toque e foco visível.
- Cards: borda, preview conceitual, contexto, tecnologias e estudo técnico.
- Filtros: seleção com borda e `aria-pressed`, contagem anunciada.
- Diagrama: camada selecionada, explicação contextual e teclado nativo.
- Menu: navegação expandida no mobile; Escape e fechamento após seleção.

Animações são breves mudanças de cor/posição, desativadas por prefers-reduced-motion. Conteúdo nunca depende de animação para aparecer. Os resultados reais de contraste/a11y e inspeção de screenshots ficam em VALIDATION.md.

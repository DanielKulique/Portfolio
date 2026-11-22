# Design system

## Identidade preservada

Minimalismo tecnológico editorial: fundo azul-marinho, acento ciano, superfícies delimitadas, Manrope Variable e JetBrains Mono Variable locais, marca/favicons originais e ícones Lucide consistentes. Sem fotografia fictícia, gráficos de proficiência, depoimentos ou métricas inventadas.

Tokens-base em `src/styles/global.css`; refinamentos do GOAL 02 em `src/styles/evolution.css`.

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

## Hierarquia profissional

A hero destaca Daniel Kulique no h1. Especialidades, disponibilidade para estágio/júnior, formação e uma apresentação breve aparecem antes das ações. O slogan anterior ocupa um papel secundário. O diagrama saiu da hero e permanece em um disclosure abaixo dos projetos; o laboratório tem rota dedicada.

A primeira seleção prioriza reservas distribuídas, pipeline ANS, modelagem de sistemas e ACO. Os dois estudos de jogos aparecem depois. Títulos descrevem o tipo de projeto; os nomes criativos anteriores são subtítulos.

## Tipografia e legibilidade

Corpo de 16px, ações e textos regulares compactos de 14px e metadados secundários de pelo menos 12px. O tracking dos títulos foi reduzido para -0,015em, com espaçamento entre palavras; o nome usa -0,025em. Isso corrige a sensação de palavras coladas sem substituir as fontes existentes.

Layout máximo de 1280px, margens responsivas e cards em duas colunas, uma no celular. Cards usam flex e rodapé no fim; tags são limitadas a quatro. Competências são organizadas em sete áreas e apontam explicitamente aos estudos, com conhecimento acadêmico/aprendizagem distinguidos.

## Evidências

`ProjectEvidence` apresenta quatro tipos: captura original, protótipo, código e saída de teste. A legenda sempre identifica a origem; screenshots de execução não são fabricados. Imagens usam variantes WebP responsivas e lazy loading. Na ausência de execução disponível, o artefato documental ou de código é identificado como tal.

## Componentes e interação

- Botão primário com cor e opacidade explícitas, contraste nos dois temas e aparência ativa.
- Links de GitHub/LinkedIn centralizados e confirmados; currículo/e-mail ausentes não geram botões.
- Filtros derivados da coleção publicada, sem categorias vazias.
- Diagrama com estado pressionado, descrição anunciada e controles habilitados somente após hidratar.
- Grade A* com roving tabindex, coordenadas/estado acessíveis, origem/destino distintos e reprodução controlável.
- Foco visível; skip link oculto até foco pelo teclado; navegação mobile com Escape e retorno de foco.
- Reduced motion evita movimento automático da busca e remove transições.

## Responsividade e impressão

Verificação nas larguras 360, 390, 768, 1024, 1440 e 1920px. A grade decorativa foi limitada à hero: o inset negativo anterior gerava overflow em tablet, sem um elemento comum fora do viewport.

`@media print` usa cores legíveis, oculta navegação, skip link e controles, remove posicionamentos que causavam sobreposição e controla quebras de cards/seções. O PDF original da raiz não foi alterado nem publicado.

Resultados, imagens antes/depois e limites de acessibilidade estão em VALIDATION.md e RECRUITER_REVIEW.md. A avaliação heurística não é um teste com recrutadores reais.

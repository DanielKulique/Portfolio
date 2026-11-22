# Arquitetura

## Geração estática e responsabilidades

Astro gera HTML por rota, sem SSR, API obrigatória ou banco. O build lê Content Collections; não acessa o GitHub em runtime. Framework, versões fixadas, configuração Cloudflare e identidade visual anteriores foram preservados.

- `BaseLayout`: documento semântico, idioma, SEO, Person/WebSite em JSON-LD e shell compartilhado.
- `Hero`: nome, especialidade, disponibilidade, formação e links confirmados.
- `ProfessionalLinks` + `src/data/profile.ts`: um contrato tipado para contatos e currículo autorizado; ações ausentes não são renderizadas.
- `Projects`: seleção ordenada, filtros derivados dos projetos publicados e ações de estudo/código/demonstração válida.
- `ProjectEvidence`: captura original, protótipo, trecho de código ou saída real de teste com proveniência explícita. O Astro otimiza imagens locais.
- `CaseStudy`: visão geral, problema/objetivo, contexto, contribuição, arquitetura, implementação, decisões, desafios, evidências, testes, resultados, limites, aprendizados, execução e fontes.
- `ProfileSections`: formação, sete áreas de competências com referências explícitas, pesquisa em formação e contato.
- `EngineeringSection`: acesso ao experimento funcional; o diagrama de reservas foi preservado em disclosure abaixo dos projetos.
- `SystemDiagram.vue`: seleção de camadas; hidrata quando visível e mantém controles desabilitados até estar pronto.
- `PathfindingLab.vue`: editor acessível e reprodução do traço A*. Uma ilha local, sem servidor ou dados de pesquisa.
- `src/lib/algorithms/astar.ts`: busca pura, heap binário, Manhattan, validação e retorno de caminho/expansões/custo. Independente do Vue.

## Modelo editorial

Os JSONs em `src/content/projects` possuem slug, draft, ordem, categorias, tecnologias, status/contexto, evidências, fontes e textos pt-BR/en. O esquema exige os campos técnicos e, para publicar, valida visão geral, instruções de execução e um artefato de evidência utilizável e atribuído nas duas línguas.

Os seis estudos têm fontes públicas fixadas por commit. Screenshot, protótipo, código e saída de teste não são intercambiáveis; cada legenda identifica o tipo real. Modelagem UML não é apresentada como sistema implementado, e uma demonstração independente não representa o executável C++.

Somente `!draft` entra no grid, filtros e getStaticPaths. Nenhum rascunho é enviado às ilhas Vue. Pesquisa/cursos/extensão privados não foram lidos nem copiados. Sinopses autorizadas permanecem internas quando não bastam para um estudo completo. Ausência de código público não equivale a ausência de experiência; um futuro estudo editorial de projeto privado exige conteúdo suficiente e autorizado, sem obter seu código.

## Idiomas e SEO

pt-BR: `/`, `/projects/<slug>/`, `/lab/`. Inglês: prefixo `/en/`. O seletor mantém rota correspondente e fragmento. Interface, laboratório, estudos e metadados são traduzidos. Identificadores do código e títulos de fontes originais permanecem como publicados.

Com SITE_URL/CF_PAGES_URL configurado, o build emite canonical/hreflang/x-default absolutos, Open Graph com cartão por idioma, sitemap e robots. JSON-LD Person contém somente nome, formação textual e perfis confirmados; WebSite é emitido com a origem configurada. A serialização escapa `<` antes da inserção no HTML.

Sem origem, o build local não inventa domínio. O CI usa a origem reservada `https://portfolio.test` apenas para exercitar SEO. Não há métricas falsas, ratings, títulos profissionais ou credenciais inventadas no dado estruturado.

O 404 padrão é pt-BR; `en/404.html` atende caminhos ingleses. Astro emite inicialmente `/en/404/index.html`; `security.mjs` move esse artefato para o nome esperado pelo Pages antes de gerar hashes. O sitemap exclui os dois fallbacks. Isso segue a busca pelo 404 mais próximo no diretório, documentada pelo [Cloudflare](https://developers.cloudflare.com/pages/configuration/serving-pages/#not-found-behavior), sem mudar configurações de hospedagem.

## Interações e acessibilidade

Menu, filtros e tema usam scripts nativos tipados. Sem JavaScript, o conteúdo dos projetos/estudos continua disponível. O laboratório informa a necessidade de JS para executar o experimento e mantém explicação estática. Tab/Enter/Espaço e setas cobrem os controles apropriados; a grade usa roving tabindex. Os estados são anunciados e os endpoints não se sobrepõem.

Reduced motion remove transições e mostra o resultado da busca sem animação automática. O skip link só aparece ao receber foco visível. Estilos de impressão removem navegação e controles, mantêm conteúdo legível e evitam o skip link sobreposto ao PDF. A grade decorativa foi contida na hero para corrigir overflow real em tablet.

## Segurança e validação

`npm run build` sempre gera `_headers` com hashes SHA-256 do HTML final. CSP não usa unsafe-inline/unsafe-eval. Fontes, imagens, algoritmos e scripts são locais. Não há formulário, coleta de dados ou analytics. Os contatos são navegação externa explícita.

A fixture HTTP aplica os headers e o fallback por idioma. Playwright usa exclusivamente a porta 4325, sem reutilizar o dev server; espera fontes e hidratação antes de medir. A suite verifica seis larguras, dois temas/idiomas, conteúdo público, erros de console, CSP, teclado e a11y. O módulo A* tem um oráculo BFS independente. As comparações de Lighthouse e screenshots ficam na documentação de validação.

## Referências consultadas

- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/guides/integrations-guide/vue/
- https://docs.astro.build/en/guides/styling/#tailwind
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/serving-pages/

Detalhes do experimento: ENGINEERING_LAB.md. Resultados e limites reais: VALIDATION.md.

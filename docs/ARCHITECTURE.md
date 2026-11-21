# Arquitetura

## Geração estática

Astro produz HTML por rota, sem SSR, banco ou credenciais. O build lê Content Collections; nenhum acesso ao GitHub ocorre em runtime. Os dados não dependem de serviços externos para navegar. Não se adicionou adapter Cloudflare porque o resultado é puramente estático.

- `BaseLayout`: HTML semântico, idioma, SEO, navegação e rodapé.
- `HomePage`: composição reutilizada por `/` e `/en/`.
- `Hero`, `Projects`, `ProfileSections`: conteúdo organizado em seções.
- `CaseStudy`: onze campos técnicos, contexto, tecnologias, fontes e imagens.
- `SystemDiagram.vue`: única ilha Vue; estado local de seleção da camada. Hidrata no carregamento do hero e quando visível no estudo. Não simula uma conexão real.
- `ProjectVisual`: SVG/CSS original com legenda de esquema conceitual; não é apresentado como screenshot.
- `src/data`: perfil confirmado e relação entre tecnologias e estudos.
- `src/i18n`: rotas pareadas e traduções da interface.

## Conteúdo e publicação

Cada JSON tem slug, draft, ordem, categorias, tecnologias, visual, fontes HTTPS, imagens e textos pt-BR/en. O esquema exige todos os campos de contexto, problema, objetivo, contribuição, solução, arquitetura, decisões, desafios, testes, resultados, limitações e aprendizados. Imagens possuem alt nas duas línguas; `demo` é opcional.

Apenas `!draft` entra nos getStaticPaths e no grid. Fontes públicas são obrigatórias para publicar. Rascunhos não são importados por componentes cliente. As fontes são revisões imutáveis dos repositórios públicos. Os arquivos locais de conteúdo são informação editorial autorizada, nunca um espelho do código de projetos privados.

Para adicionar uma demonstração ou imagem, estenda o renderer do estudo com componente específico ou dados validados. Para pipelines, comparação de decisões, timeline e similaridade sintética, prefira HTML/SVG primeiro e ilhas apenas quando existir estado. Exemplos futuros devem indicar seus dados e limites.

## Idiomas

pt-BR usa `/`, inglês `/en/`. Estudos usam o mesmo slug em `/projects/` e `/en/projects/`. O seletor mantém a rota e o fragmento da seção. `lang` é sempre emitido; com origem configurada são emitidos hreflang absoluto, canonical, x-default e Open Graph completo. O build local sem origem omite metadados que precisariam de um domínio, em vez de inventar uma URL. A página 404 é bilíngue para recuperação e usa `noindex`.

## Interações e acessibilidade

Menu, tema e filtros usam pequenos scripts nativos tipados. Sem JavaScript, a lista completa e os estudos continuam acessíveis, e os filtros ficam ocultos. No diagrama os botões nativos funcionam com Tab/Enter/Espaço, `aria-pressed` e região `aria-live`. O menu possui estado expandido, Escape e retorno de foco. Dark/light mode persiste com fallback quando o storage está indisponível. Reduced motion remove deslocamentos e transições.

## Segurança

`security.mjs` coleta hashes SHA-256 dos scripts e estilos inline gerados e emite `dist/_headers` com CSP sem unsafe-inline/unsafe-eval. Somente recursos locais são necessários. O build gera robots e ativa sitemap quando existe origem. A fixture HTTP aplica a mesma política e respostas 404 reais; Playwright detecta erros de execução e CSP. Não há formulário, coleta de dados ou analytics.

## Referências oficiais consultadas

- https://docs.astro.build/en/guides/integrations-guide/vue/
- https://docs.astro.build/en/guides/styling/#tailwind
- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/reference/configuration-reference/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://nodejs.org/en/about/previous-releases

As versões concretas e reproduzíveis estão no package-lock.json. Atualizações devem validar as peer dependencies novamente.

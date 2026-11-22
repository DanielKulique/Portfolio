# Relatório histórico de entrega — primeira versão

Este documento registra o GOAL 01. A evolução atual está em GOAL_02_DELIVERY.md e VALIDATION.md.

## 1. Implementação

Portfólio funcional com identidade visual original, duas homes, cinco estudos completos nas duas línguas, filtros, tema persistente, menu mobile, diagrama interativo, formação, tecnologias com links de evidência, pesquisa e contato GitHub confirmado. São 13 páginas estáticas, incluindo 404. SEO por página, favicon original, cartão Open Graph, fontes locais, imagem pública otimizada e headers Cloudflare com CSP por hashes.

## 2. Estrutura

`src/components/{layout,sections,interactive,ui}`, `src/content/projects`, `src/data`, `src/i18n`, `src/layouts`, `src/pages`, `src/styles`, `src/assets`, `public/{images,documents,licenses}`, `scripts`, `tests`, `docs` e `.github/workflows`. README e AGENTS documentam o desenvolvimento. Fontes, tokens e traduções são centralizados.

## 3. Decisões arquiteturais

Astro estático minimiza JavaScript e elimina necessidade de servidor/API/banco. Uma ilha Vue implementa o explorador de camadas; filtros, tema e menu usam scripts nativos. Content Collections validam campos completos e idiomas. Drafts nunca entram nos geradores de rotas ou props cliente. Não se instalou adapter SSR. Fontes e imagens são locais, sem dependência de serviços externos para visitar o site. Fontes públicas de estudos são fixadas por commit.

## 4. Versões

Node 24.20.0 LTS; Astro 7.4.13; TypeScript 5.9.3 strict; Tailwind CSS e plugin Vite 4.3.5; Vue 3.5.46 e integração Astro 7.1.6; Lucide (`@lucide/astro`) 1.77.0; sitemap 3.7.6; Playwright 1.65.1; axe 4.14.0; Lighthouse 13.6.0; ESLint 10.15.0; vue-tsc 3.3.14. Dependências exatas e transitivas estão no lockfile. As actions oficiais foram fixadas por SHA das releases verificadas.

## 5. Projetos e fontes

Publicados: sistemasDistribuidos, teste_nivelamento/ANS, ProjetoJogoFinal/Space Arena, DesenvolvimentoDeJogos/Masmorra e ACO-PROJECT. README, estrutura e trechos públicos foram inspecionados. Jogo de Cores foi inspecionado parcialmente e permanece em rascunho. Pesquisa de similaridade, cursos/motor IA, extensão e imagens MIPS aguardam evidências/autorização adequadas. ACO-PROJECT é C++/raylib, divergindo da descrição MIPS do briefing. [Inventário completo](CONTENT_INVENTORY.md).

## 6. Testes

Instalação reproduzível, tipos Astro/Vue, lint, build, links, sitemap, hreflang, 18 testes Playwright e axe aprovados. Zero erros JavaScript/CSP nas rotas percorridas. Lighthouse final: 100 nas quatro categorias em quatro rotas, nas condições locais documentadas. [Resultados e limites](VALIDATION.md).

## 7. Screenshots

Capturas desktop/mobile, claro/escuro, pt-BR/en, estudo e menu. [Prévias e caminhos dos originais](VALIDATION.md#inspeção-visual).

## 8. Commits

Commits enviados: `67813d7` (arquitetura), `17f383c` (portfólio bilíngue), `4299643` (testes e CI) e `22187cb` (documentação), seguidos do ajuste final de formatação e registro de validação. O histórico inicial foi preservado, sem force push. Consulte `git log --oneline` para os hashes completos.

## 9. GitHub

Repositório exclusivo: https://github.com/DanielKulique/Portfolio, branch main. Push concluído em main. O [workflow de validação](https://github.com/DanielKulique/Portfolio/actions/runs/44936116866) aprovou instalação, tipos Astro/Vue, lint, build, links e a suíte Playwright, com artefatos de interface preservados. O checkout original e o histórico foram mantidos.

## 10. Publicação

No Cloudflare Pages, conectar o repositório GitHub existente, selecionar main, preset Astro, `npm run build`, saída `dist`, raiz do repositório e Node 24.20.0. Após confirmação da URL, configurar SITE_URL e reconstruir. Nenhum deploy/domínio/serviço pago foi criado. [Procedimento completo](DEPLOYMENT.md).

## 11. Conteúdo pendente

CV real, e-mail e LinkedIn autorizados; datas acadêmicas; divisão de contribuição individual; escopo e resultados de pesquisa/extensão; texto público autorizado para cursos; validação educacional/acessibilidade e licenças de assets do Jogo de Cores; fonte correta para MIPS. Nenhuma informação fictícia foi adicionada para preencher essas lacunas.

## 12. Próxima etapa

Confirmar esses conteúdos, conectar Cloudflare Pages e repetir a avaliação no domínio real. Depois, evoluir diagramas de pipeline, comparações arquiteturais, timeline com datas confirmadas e demonstrações com dados sintéticos/autorizados. [Roadmap](ROADMAP.md).

# Daniel Kulique · Portfólio

Portfólio profissional de Daniel Ricardo Kulique dos Passos, estudante de Ciência da Computação na UTFPR, campus Ponta Grossa, com foco em back-end, engenharia de software e IA aplicada.

Astro estático, TypeScript strict, Tailwind CSS, Lucide Icons e ilhas Vue somente nas experiências interativas. Interface e seis estudos em português e inglês, com fontes verificáveis, instruções de execução e limitações técnicas. O Laboratório de Engenharia oferece uma demonstração A* completa, processada localmente.

## Executar localmente

Requer Node **24.20.0 LTS**, fixado em `.nvmrc`, `.node-version` e `package.json`.

```sh
nvm use
npm ci
npm run dev
```

Abra a URL local informada pelo Astro, normalmente http://localhost:4321. Rotas principais: `/`, `/en/`, `/lab/`, `/en/lab/` e estudos em `/projects/<slug>/` e `/en/projects/<slug>/`.

Para analisar o build com os mesmos headers/CSP de produção:

```sh
npm run build
PORT=4323 node scripts/serve.mjs
```

Abra http://127.0.0.1:4323. O resultado está em `dist/`. Astro preview não aplica `_headers`.

## Verificação

```sh
npx playwright install chromium
SITE_URL=https://portfolio.test npm run validate
```

A origem `.test` é reservada exclusivamente para validar metadados e sitemap; não representa um deployment. O gate inclui tipos Astro/Vue, lint, formatação, quatro testes de algoritmo, build, links e 72 testes Playwright nas larguras 360, 390, 768, 1024, 1440 e 1920px. As verificações cobrem temas, idiomas, contatos autorizados, teclado, filtros, estudos, laboratório, 404, impressão, a11y e erros de execução/CSP.

O servidor dos testes usa a porta 4325 e não reutiliza o preview de desenvolvimento. Capturas antes/depois ficam em `artifacts/goal02/`; o relatório HTML fica em `playwright-report/`. Resultados reais e limites: [VALIDATION.md](docs/VALIDATION.md).

Lighthouse, com o servidor de produção local ativo:

```sh
LIGHTHOUSE_BASE_URL=http://127.0.0.1:4323 npm run audit:performance
```

Relatórios HTML/JSON: `artifacts/lighthouse/`. Compare sob as mesmas condições da baseline; não trate resultados locais como métricas de campo.

## Estrutura

```text
src/
  components/{layout,sections,interactive,ui,lab}/
  content/projects/       # estudos bilíngues tipados e rascunhos
  data/                   # perfil/contatos autorizados e tecnologias com evidência
  i18n/                   # traduções da interface e do laboratório
  lib/algorithms/         # A* puro, independente da UI
  layouts/                # documento, SEO e JSON-LD factual
  pages/                  # homes, estudos, laboratório e 404 por idioma
  styles/                 # tokens, evolução responsiva e impressão
  assets/                 # recursos públicos otimizados pelo Astro
public/{images,documents,licenses}/
scripts/                  # CSP, links, fixture HTTP e Lighthouse
tests/                    # Playwright, axe e oráculo BFS
.github/workflows/        # CI com permissões mínimas
docs/                     # arquitetura, inventário, baseline e resultados
```

## Projetos e contato

A seleção começa por Sistema Distribuído de Reservas, Pipeline ANS, Modelagem de Sistema Educacional e ACO/TSP; os dois estudos de jogos aparecem depois. Capturas da aplicação ACO, protótipos UML, trechos de código e resultados reais de testes são identificados por origem. Veja o [inventário](docs/CONTENT_INVENTORY.md).

GitHub e LinkedIn foram confirmados pelo proprietário e estão centralizados em `src/data/profile.ts`. E-mail e currículo permanecem ausentes até receber os dados corretos e autorização explícita. O PDF da raiz é uma impressão local do site e não é publicado. Não há código, corpus ou credenciais de projetos privados no build.

## Cloudflare Pages

Preservada a configuração estática: repositório **DanielKulique/Portfolio**, branch **main**, preset **Astro**, comando **npm run build**, saída **dist**, raiz do repositório e Node **24.20.0**. Não há adapter SSR, Functions, banco, secrets ou serviço pago obrigatório.

Após um deploy confirmar a URL, configure SITE_URL com a origem HTTPS e reconstrua. CF_PAGES_URL continua como fallback de build. [Procedimento de publicação](docs/DEPLOYMENT.md). Nenhuma URL de produção foi presumida.

## Documentação

[Arquitetura](docs/ARCHITECTURE.md) · [Design system](docs/DESIGN_SYSTEM.md) · [Inventário](docs/CONTENT_INVENTORY.md) · [Roadmap](docs/ROADMAP.md) · [Engineering Lab](docs/ENGINEERING_LAB.md) · [Heurística de recrutamento](docs/RECRUITER_REVIEW.md) · [Validação](docs/VALIDATION.md) · [Baseline GOAL 02](docs/goal02/BASELINE.md)

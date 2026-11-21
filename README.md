# Daniel Kulique · Portfólio

Portfólio de Daniel Ricardo Kulique dos Passos, estudante de Ciência da Computação na UTFPR, campus Ponta Grossa. Uma vitrine de projetos com contexto técnico, fontes verificáveis e limitações explícitas.

Astro estático, TypeScript strict, Tailwind CSS, uma ilha Vue para explorar arquitetura e Lucide Icons. Interface e cinco estudos completos em português brasileiro e inglês. Sem backend ou API externa obrigatória.

## Executar

Requer Node **24.20.0 LTS** (fixado em `.nvmrc`, `.node-version` e `package.json`).

```sh
nvm use
npm ci
npm run dev
```

O servidor Astro informa a URL local. Para validar o artefato com os headers usados no Cloudflare:

```sh
npm run build
node scripts/serve.mjs
```

Abra http://127.0.0.1:4321. O resultado de produção está em `dist/`. `npm run preview` também existe, mas não aplica `_headers`.

## Verificação

```sh
npx playwright install chromium
npm run validate
```

Inclui tipos, lint, build, links internos e Playwright em desktop/mobile. Os testes cobrem temas, idiomas, filtros, teclado, diagrama, estudos, 404, erros JavaScript, CSP, acessibilidade automatizada e ausência de overflow. Screenshots: `artifacts/screenshots/`; relatório HTML: `playwright-report/`.

Com o servidor de produção local ativo, `npm run audit:performance` produz relatórios Lighthouse em `artifacts/lighthouse/`. Resultados e condições reais: [docs/VALIDATION.md](docs/VALIDATION.md). Acessibilidade automatizada não substitui uma revisão manual com tecnologias assistivas.

## Estrutura

```text
src/
  components/{layout,sections,interactive,ui}/
  content/projects/       # estudos bilíngues tipados e rascunhos
  data/                   # perfil e tecnologias com evidências
  i18n/                   # traduções e rotas
  layouts/                # documento e SEO
  pages/                  # /, /en/, estudos e 404
  styles/                 # tokens e layout responsivo
  assets/                 # screenshot público otimizado pelo Astro
public/{images,documents}/ # assets públicos; sem documentos pessoais
scripts/                  # CSP, links, servidor e Lighthouse
tests/                    # testes de interface
.github/workflows/        # CI com permissões mínimas
docs/                     # arquitetura, inventário e entrega
```

## Conteúdo

Estudos publicados: reservas cliente-servidor Java; pipeline ANS; Space Arena; Masmorra 2D; otimização ACO. As fontes, commits inspecionados e pendências estão no [inventário](docs/CONTENT_INVENTORY.md).

Os resumos de pesquisa, plataforma de cursos, Jogo de Cores, extensão e MIPS permanecem em rascunho. Nenhum código de repositório privado foi acessado ou copiado. Currículo, fotografia, e-mail e LinkedIn aguardam confirmação para divulgação.

## Cloudflare Pages

Conecte **DanielKulique/Portfolio**, branch **main**, framework **Astro**, comando **npm run build**, saída **dist**, raiz do repositório. Use Node **24.20.0**. O projeto não requer adapter, Functions, secrets ou serviços pagos.

Após o primeiro deploy confirmar a URL, defina `SITE_URL` com essa origem HTTPS e refaça o deploy para gerar canonical, Open Graph absoluto e sitemap. `CF_PAGES_URL` é usado como origem de build quando SITE_URL não estiver definida. Nenhuma URL de produção foi presumida. Instruções completas: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

O README inicial continha somente o título `portif-lio`; o histórico original foi preservado.

## Documentação

[Arquitetura](docs/ARCHITECTURE.md) · [Design system](docs/DESIGN_SYSTEM.md) · [Inventário](docs/CONTENT_INVENTORY.md) · [Roadmap](docs/ROADMAP.md) · [Validação](docs/VALIDATION.md) · [Entrega](docs/DELIVERY.md)

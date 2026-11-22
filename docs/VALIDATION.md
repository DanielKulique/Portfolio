# Validação — GOAL 02

Validação do artefato estático, sem deployment Cloudflare e sem métricas de campo. Baseline, métricas e capturas estão em `docs/goal02/` e `artifacts/goal02/`.

## Gate completo executado

```sh
npm ci
SITE_URL=https://portfolio.test npm run validate
npm audit --audit-level=moderate
```

Node 24.20.0, npm 11.19.0, TypeScript 5.9.3, Playwright 1.65.1, axe 4.14.0 e Chromium 159.0.8154.6. A origem `.test` é reservada exclusivamente à validação local/CI dos metadados; não é URL de produção.

| Gate                           | Resultado real                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| npm ci                         | Instalação reproduzível concluída; lockfile preservado                              |
| astro check + vue-tsc --noEmit | 0 erros, 0 avisos e 0 hints                                                         |
| ESLint                         | Aprovado                                                                            |
| Prettier                       | Aprovado                                                                            |
| Testes do algoritmo            | 4 aprovados; comparação independente com BFS em 128 grades                          |
| Build                          | 18 páginas HTML estáticas, incluindo dois fallbacks 404                             |
| Links e SEO estático           | 584 referências internas, 16 entradas no sitemap e pares hreflang absolutos válidos |
| Playwright                     | 72 testes aprovados nas seis larguras                                               |
| npm audit                      | 0 vulnerabilidades identificadas pelo registro no momento da consulta               |
| git diff --check               | Sem erros de whitespace                                                             |

Logs locais: `artifacts/goal02/validation-final.log` e `artifacts/goal02/lighthouse-final.log`. O relatório navegável do Playwright está em `playwright-report/`. Esses resultados se referem ao portfólio; não são pontuações de qualidade ou certificações dos projetos apresentados.

## Escopo dos testes de interface

Seis viewports de 1000px de altura, DPR 1: **360, 390, 768, 1024, 1440 e 1920px**. Os dois menores usam touch/mobile em Chromium; não são testes em Safari real ou em aparelhos físicos.

Os 12 fluxos são executados em cada largura:

1. Identidade profissional no h1, disponibilidade, especialidades e hero compacta.
2. Sete filtros e ações públicas dos seis cards.
3. Tema persistido, fallback quando storage está bloqueado e botão primário ativo.
4. Idiomas pareados para estudo, laboratório e fragmento da home.
5. Skip link por teclado, menu/Escape e contatos GitHub/LinkedIn autorizados nas duas seções.
6. Diagrama original acessível por teclado, sem corrida de hidratação.
7. Evidências, instruções de execução e limites dos 12 estudos traduzidos.
8. A*: teclado, passos, animação, pausa, reset, reduced motion e custo 16 na grade livre.
9. A*: destino inacessível, remoção de obstáculo ao posicionar endpoint e bloqueio de endpoints sobrepostos.
10. Rotas públicas sem erros JavaScript/CSP ou mensagens editoriais; 404 e idioma corretos; rascunhos indisponíveis.
11. axe e overflow depois de fontes/hidratação, nos dois temas e idiomas.
12. Screenshots, impressão, JSON-LD/metadados e conteúdo dos estudos sem JavaScript.

A fixture de produção usa **porta 4325**, `reuseExistingServer: false` e os headers de `dist/_headers`. Ela não reutiliza um servidor Astro de desenvolvimento que poderia esconder falhas da CSP.

### Acessibilidade automatizada

Foram avaliadas **192 combinações**: 16 páginas de conteúdo × 2 temas × 6 larguras, incluindo o laboratório em estado executado. Tags WCAG 2 A/AA, 2.1 A/AA e 2.2 A/AA. Zero violações nos scans finais e zero overflow acima da largura configurada, após carregar fontes e hidratar as ilhas relevantes.

Também houve validação funcional de teclado, foco, rótulos, estados anunciados e impressão. As capturas finais de desktop/mobile, laboratório e PDF foram inspecionadas visualmente; as seis larguras também foram conferidas em capturas dos testes. Isso não equivale a certificação integral WCAG ou teste manual com leitor de tela. A avaliação de recrutamento é heurística, sem participantes reais.

## Correções verificadas durante a evolução

- O h1 anterior privilegiava o slogan; agora apresenta Daniel Kulique.
- Uma camada decorativa com inset negativo causava overflow em tablet; o pseudo-elemento foi limitado à hero.
- O diagrama podia receber Enter antes de hidratar; agora controles ficam desabilitados até estar pronto e os testes aguardam sua habilitação.
- O skip link aparecia no PDF original; estilos de impressão o ocultam junto da navegação e dos controles.
- A cor acinzentada do CTA não se reproduziu no navegador. O estilo primário passou a ter fundo, contraste e opacidade explícitos; os testes verificam aparência ativa.
- A canonical da página 404 permanece ausente; os fallbacks por idioma são excluídos do sitemap.
- Mensagens de construção/confirmação saíram do conteúdo público; limites técnicos e resultados de validação continuam visíveis nos estudos.

## Comparação de layout

Medição local em Chromium, viewport de 1000px de altura, fontes carregadas e scroll no topo. Valores arredondados; os JSONs preservam as medidas completas.

| Medida                             |    Antes |  Depois |
| ---------------------------------- | -------: | ------: |
| Hero em 1440px                     |  793,8px | 515,5px |
| Início da seção Projetos em 1440px |  882,8px | 604,5px |
| Hero em 390px                      | 1285,3px | 563,1px |
| Início da seção Projetos em 390px  | 1358,3px | 636,1px |

A hero ficou aproximadamente 35% menor em desktop e 56% menor a 390px. Isso mede layout, não melhora de conversão ou comportamento de recrutadores. [Baseline](goal02/baseline-layout.json) e [layout final](goal02/after-layout.json).

| Comparação     | Antes                                                   | Depois                                                 |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Desktop escuro | [Captura](goal02/screenshots/before-desktop-dark.webp)  | [Captura](goal02/screenshots/after-desktop-dark.webp)  |
| Desktop claro  | [Captura](goal02/screenshots/before-desktop-light.webp) | [Captura](goal02/screenshots/after-desktop-light.webp) |
| Mobile escuro  | [Captura](goal02/screenshots/before-mobile-dark.webp)   | [Captura](goal02/screenshots/after-mobile-dark.webp)   |
| Mobile claro   | [Captura](goal02/screenshots/before-mobile-light.webp)  | [Captura](goal02/screenshots/after-mobile-light.webp)  |

[Laboratório desktop](goal02/screenshots/lab-1440.webp), [laboratório mobile](goal02/screenshots/lab-390.webp), [estudo desktop](goal02/screenshots/case-1440.webp) e [estudo mobile](goal02/screenshots/case-390.webp). Originais completos e PDFs: `artifacts/goal02/before/` e `artifacts/goal02/after/`.

## Lighthouse comparado à baseline

Lighthouse **13.6.0**, Chrome headless 159.0.8154.6, mobile simulado **412 × 823**, DPR **1,75**, throttling simulado: RTT **150ms**, **1638,4 Kbps**, CPU **4×**. Build estático em loopback com CSP. Uma execução final por rota, sem esconder conteúdo do auditor ou alterar limites de pontuação.

| Rota                                   | Antes D/A/BP/SEO      | Depois D/A/BP/SEO     |
| -------------------------------------- | --------------------- | --------------------- |
| /                                      | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /en/                                   | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /projects/sistemas-distribuidos/       | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /projects/otimizacao-colonia-formigas/ | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /lab/                                  | Não existia           | 100 / 100 / 100 / 100 |
| /en/lab/                               | Não existia           | 100 / 100 / 100 / 100 |

D: desempenho; A: acessibilidade; BP: boas práticas. A baseline foi coletada antes das alterações; o build final usa a origem reservada de teste para validar os metadados absolutos. Ambas são medições locais, sem alegação de dados de campo. O novo experimento não reduz as pontuações observadas nessa execução.

Resumos: [antes](goal02/baseline-lighthouse.json), [depois](goal02/after-lighthouse.json). [Condições e métricas reais](goal02/lighthouse-details.json) incluem FCP, LCP, CLS, TBT e Speed Index por rota. TBT não é INP; não foram medidas métricas de campo, INP de usuários ou conversão. Relatórios completos HTML/JSON ficam em `artifacts/lighthouse/`.

Reprodução:

```sh
SITE_URL=https://portfolio.test npm run build
PORT=4323 node scripts/serve.mjs
# Em outro terminal:
LIGHTHOUSE_BASE_URL=http://127.0.0.1:4323 npm run audit:performance
```

## Evidências dos projetos apresentados

Em cópias descartáveis de commits públicos, sem modificar os repositórios originais:

- A* C++: **539/539** verificações aprovadas em isolamento.
- Java TesteArquivo: **11** verificações aprovadas.
- Java TesteEp1: **214** verificações aprovadas.
- Bateria adicional Java de comunicação: **42 casos, 536 verificações, uma falha** na comparação de saída por causa do aviso JAVA_TOOL_OPTIONS no subprocesso; não é apresentada como suíte integralmente aprovada ou vulnerabilidade demonstrada.

As condições de isolamento e limites constam do inventário. Não foi possível gerar novas capturas gráficas isoladas sem display virtual nem executar os projetos Python sem as dependências correspondentes. Foram usados screenshots/protótipos públicos originais e evidências de código/documentação claramente identificadas, sem produzir telas, GIFs ou benchmarks fictícios.

## Limites e operação

A revisão de segurança foi focada em fonte, exposição de dados, dependências e política do build; não é um pen test abrangente. O audit de dependências não prova ausência de todas as vulnerabilidades. O código privado, corpora e documentos pessoais não foram incorporados.

Sem deployment confirmado, não há URL de produção ou medição de compressão/CDN em campo. A configuração Astro/Cloudflare foi preservada. E-mail, currículo, datas e detalhes de projetos privados dependem de dados/autorização do proprietário; continuam documentados e não geram ações quebradas.

O estado do versionamento e do GitHub Actions será registrado junto da entrega. O workflow inclui os gates locais e preserva os artefatos de interface por 14 dias.

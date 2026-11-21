# Validação executada

Data: **21/11/2026**, ambiente Linux x86_64, Node 24.20.0 e npm 11.19.0. Resultados locais reais; publicação Cloudflare não realizada.

## Instalação e análise estática

| Verificação                                 | Resultado                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| npm ci                                      | Instalação reproduzível concluída pelo package-lock.json                            |
| astro check                                 | 0 erros, 0 avisos, 0 hints                                                          |
| vue-tsc --noEmit                            | Aprovado; inclui o componente Vue no TypeScript strict                              |
| npm run lint                                | Aprovado                                                                            |
| npm run build                               | 13 páginas HTML estáticas: duas homes, dez estudos e 404                            |
| npm run test:links com origem de teste      | 377 referências internas válidas; 12 entradas no sitemap; hreflang absoluto pareado |
| npm audit --omit=dev --audit-level=moderate | 0 vulnerabilidades identificadas pelo registro no momento da execução               |
| git diff --check                            | Sem erros de whitespace                                                             |

O build de SEO foi executado com `SITE_URL=https://portfolio.test`, domínio reservado exclusivamente para teste. Não é URL de produção. Sem SITE_URL/CF_PAGES_URL, o build local omite canonical/hreflang absoluto/sitemap, preservando o site navegável. No Cloudflare a origem é fornecida pelo ambiente e deve ser consolidada após confirmação do deploy.

## Playwright

**18 testes aprovados** em Chromium 159.0.8154.6: desktop 1440 × 1000 e emulação mobile iPhone 13 (390 × 664 CSS pixels, DPR 3). Essa emulação usa Chromium, não comprova comportamento em Safari real.

Cobertura:

- Homes, cards, filtros por categoria e restauração da lista completa.
- Tema claro/escuro persistido após reload e fallback com storage bloqueado.
- Alternância de idioma preservando estudo e fragmento de seção.
- Diagrama por teclado, estado selecionado e descrição anunciada.
- Skip link, foco, menu mobile, Escape e fechamento após navegar.
- Links de contato confirmados e ausência de e-mail, LinkedIn ou currículo inventados.
- Dez páginas individuais e navegação entre as duas línguas.
- 404 real e rotas de rascunho indisponíveis.
- Ausência de erros JavaScript e violações CSP nas rotas percorridas.
- axe-core com WCAG 2 A/AA, 2.1 A/AA e 2.2 A/AA: zero violações nos scans das 12 páginas de conteúdo, nos dois temas e dois tamanhos de tela (48 combinações).
- Ausência de overflow horizontal nessas combinações.
- Conteúdo e estudos acessíveis sem JavaScript.
- Reduced motion e oito capturas das homes (idioma × tema × viewport).

A fixture `scripts/serve.mjs` aplica os headers de `dist/_headers`; os testes não se limitam ao dev server. Foram corrigidos bloqueios de fontes incorporadas como data URLs, nomes acessíveis incompatíveis com o texto visível e uma canonical indevida na página 404.

## Lighthouse

**Lighthouse 13.6.0**, Chrome headless 159.0.8154.6, dispositivo mobile simulado de 412 × 823, DPR 1.75, throttling simulado: RTT 150 ms, 1638,4 Kbps e CPU 4×. Uma execução final por rota, build estático servido em loopback com a CSP aplicada, origem de SEO reservada de teste. Resultados variam com máquina, rede e deployment.

| Rota                                   | Desempenho | Acessibilidade | Boas práticas | SEO |
| -------------------------------------- | ---------: | -------------: | ------------: | --: |
| /                                      |        100 |            100 |           100 | 100 |
| /en/                                   |        100 |            100 |           100 | 100 |
| /projects/sistemas-distribuidos/       |        100 |            100 |           100 | 100 |
| /projects/otimizacao-colonia-formigas/ |        100 |            100 |           100 | 100 |

Resumo versionado: [LIGHTHOUSE_SUMMARY.json](LIGHTHOUSE_SUMMARY.json). Relatórios HTML/JSON completos estão localmente em `artifacts/lighthouse/`, excluídos do Git. A primeira medição sem origem identificou hreflang relativo; a emissão foi corrigida e a tabela mostra a avaliação posterior. Uma tentativa de reavaliação foi interrompida após o encerramento do servidor de teste; os resultados finais vieram de nova execução concluída com servidor dedicado.

Reprodução, em terminais separados:

```sh
SITE_URL=https://portfolio.test npm run build
PORT=4322 node scripts/serve.mjs
```

```sh
LIGHTHOUSE_BASE_URL=http://127.0.0.1:4322 npm run audit:performance
```

O script usa a instalação Chromium do Playwright. Executar novamente contra a URL real após o deploy; esses números não são medições de produção e não garantem conformidade integral com WCAG.

## Inspeção visual

Homes em desktop/mobile e temas claro/escuro foram capturadas e inspecionadas, assim como um estudo e o menu aberto. Ajustes incluíram metadados com no mínimo 12px e quebras responsivas no diagrama. Nenhuma sobreposição ou rolagem horizontal foi observada nas combinações testadas.

Prévias WebP versionadas, derivadas das capturas PNG:

- [Desktop · pt-BR · escuro](screenshots/desktop-pt-dark.webp)
- [Desktop · inglês · claro](screenshots/desktop-en-light.webp)
- [Mobile · pt-BR · escuro](screenshots/mobile-pt-dark.webp)
- [Mobile · inglês · claro](screenshots/mobile-en-light.webp)
- [Estudo técnico](screenshots/study-desktop.webp)
- [Menu mobile](screenshots/menu-mobile.webp)

Originais PNG: `artifacts/screenshots/`. Relatório Playwright: `playwright-report/`. O workflow preserva suas capturas e relatório como artefatos por 14 dias.

## Limites

Não foram reexecutadas as suítes dos projetos apresentados. Não houve auditoria científica, teste com leitor de tela, Safari real ou deploy Cloudflare. Código e conteúdo privados não foram consultados nem copiados ao produzir os estudos; rascunhos são excluídos das rotas. As pendências editoriais constam em CONTENT_INVENTORY.md e ROADMAP.md.

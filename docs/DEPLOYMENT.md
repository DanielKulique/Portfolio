# Cloudflare Pages

## Estado

Projeto preparado para deploy estático. Não há URL de produção registrada nem deploy Cloudflare confirmado nesta entrega. Não foram criados recursos pagos, domínio, Worker ou banco.

## Conectar o GitHub

1. No painel Cloudflare, abra Workers & Pages e crie uma aplicação **Pages** por integração Git.
2. Autorize apenas o repositório existente `DanielKulique/Portfolio` e selecione-o.
3. Configure:

| Campo                  | Valor                                |
| ---------------------- | ------------------------------------ |
| Framework preset       | Astro                                |
| Production branch      | main                                 |
| Root directory         | raiz do repositório (em branco ou /) |
| Build command          | npm run build                        |
| Build output directory | dist                                 |
| NODE_VERSION           | 24.20.0                              |

4. Inicie o deploy. Confirme o estado de sucesso e copie a URL realmente fornecida pelo Cloudflare.
5. Defina `SITE_URL` com a origem HTTPS confirmada, sem caminho. Refaça o deploy para consolidar URLs canônicas, hreflang absoluto, Open Graph e sitemap. Durante a construção, `CF_PAGES_URL`, fornecida pelo Pages, serve de fallback; use SITE_URL de produção também nos previews para evitar canonicals em URLs temporárias.
6. Verifique as duas homes, um estudo em cada língua, o 404, filtros, tema e diagrama. Confirme no DevTools que CSP e demais headers estão presentes e sem violações.
7. Abra `/sitemap-index.xml` e `/robots.txt`; confira a origem. Registre a URL aqui apenas após verificação.

Não configure SSR, Functions ou adapter Cloudflare. A pasta dist e `_headers` são suficientes para este projeto. Uma integração do GitHub fará novos deploys de main e previews conforme a configuração do Pages.

## Build e segurança

`npm ci` instala pelo lockfile. `npm run build` compila e gera `_headers`; não use `astro build` isoladamente para publicar. Hashes da CSP devem acompanhar o HTML do mesmo build. Não modifique os arquivos dist depois de gerar os hashes.

`SITE_URL` não é secret. Nenhum token GitHub/Cloudflare deve ser incluído no código, `.env` versionado ou bundle. O build em CI usa `https://portfolio.test`, domínio reservado e exclusivamente de teste; isso não é uma URL de produção.

## Rollback

Use um deployment anterior confirmado no painel Pages ou reverta o commit em main e deixe a integração construir de novo. Nunca force push para reverter uma publicação.

Referência: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

# GOAL 02 — relatório de entrega

## 1. Resumo executivo

Evolução do portfólio existente para priorizar identificação profissional, evidência técnica e exploração por recrutadores. A identidade e a stack estática foram preservadas. A versão tem seis estudos completos e bilíngues, contatos confirmados, laboratório A* funcional e 18 páginas HTML, incluindo fallbacks por idioma.

## 2. Problemas da versão anterior

Nome com pouco destaque; hero alta; especialidades misturando idiomas; títulos criativos pouco descritivos; predominância de esquemas conceituais; avisos editoriais públicos; Vue classificado como infraestrutura; referências genéricas de competências; ausência de execução guiada, laboratório, JSON-LD e impressão adequada. A inspeção confirmou o skip link no PDF original, uma corrida de hidratação e overflow provocado pela decoração da hero. [Baseline](goal02/BASELINE.md).

## 3. Melhorias implementadas

Nome no h1, formação, especialidade e disponibilidade explícitas; hero compacta; contatos GitHub/LinkedIn tipados e autorizados; títulos descritivos com subtítulos criativos; cards alinhados com evidências, contexto, contribuição e ações reais; filtros gerados a partir do conteúdo; estudos com instruções de execução; sete áreas de tecnologias com referências específicas; impressão, foco, legibilidade, hidratação e idiomas refinados.

Node.js/Express aparecem como uso informado em projeto privado, sem transformar ausência de código público em ausência de experiência. Conhecimentos acadêmicos e aprendizagem permanecem identificados. Não se atribuem níveis de proficiência, papéis individuais exclusivos ou métricas não comprovadas.

## 4. Antes e depois

A hero passou de aproximadamente 794 para 516px em desktop e de 1285 para 563px a 390px. O início da seção Projetos passou de 883 para 605px e de 1358 para 636px, respectivamente. São medidas de layout, não resultados de conversão. [Tabela e capturas nos dois temas](VALIDATION.md#comparação-de-layout).

## 5. Projetos adicionados ou reorganizados

Primeiro: Sistema Distribuído de Reservas, Pipeline de Dados e API — ANS, Modelagem de Sistema Educacional e ACO/TSP. Depois: Jogo 2D com Geração Procedural e Dungeon 2D. O projeto de modelagem UML é novo na seleção e está explicitamente identificado como modelos/protótipos, sem backend implementado demonstrado.

IC/similaridade, cursos, extensão e Jogo de Cores foram considerados. Os estudos sem informação suficiente permanecem internos. Isso não nega a experiência; impede publicar afirmações sem evidência ou detalhes privados.

## 6. Evidências e fontes

Fontes públicas fixadas por commit, screenshot original do ACO, protótipo original do projeto APOO, trechos reais de JDBC/FastAPI/C++ e saída de testes A*. As cópias locais públicas foram inspecionadas e arquivadas para execução isolada, sem modificar os originais. [Inventário, condições, resultados e limites](CONTENT_INVENTORY.md#evolução-editorial--goal-02).

O A* C++ passou 539 verificações; os testes Java de arquivo e EP1 passaram 11 e 214 verificações. A bateria adicional de comunicação teve uma falha no harness de saída em ambiente isolado, declarada no estudo e na validação. Não se apresentaram GIFs de jogo, capturas de API ou resultados científicos fictícios.

## 7. Demonstração implementada

Laboratório A* em `/lab/` e `/en/lab/`: grade editável, obstáculos, origem/destino, caminho, visitados, custo, tempo local, passos, pausa, velocidade, reset, teclado e reduced motion. Algoritmo puro com Manhattan/heap e oráculo BFS independente. A demonstração não é o executável C++ nem o detector da IC. Os demais experimentos ficam apenas no roadmap. [Arquitetura e funcionamento](ENGINEERING_LAB.md).

## 8. Testes

`npm ci` e `npm run validate` aprovados: tipos Astro/Vue, lint, formatação, quatro testes de algoritmo, build, 584 referências internas, sitemap/hreflang e 72 testes Playwright nas seis larguras. As validações de produção não reutilizam o dev server. [Resultados](VALIDATION.md).

## 9. Acessibilidade

Zero violações automatizadas nas 192 combinações de página/idioma/tema/largura e zero overflow final. Teclado, foco, nomes acessíveis, diagramas, reduced motion, temas e impressão foram exercitados. Não é certificação WCAG nem teste com recrutadores ou tecnologias assistivas humanas. [Avaliação heurística de recrutamento](RECRUITER_REVIEW.md).

## 10. Lighthouse

100 nas quatro categorias nas seis rotas avaliadas, sob condições locais documentadas, mantendo os resultados observados nas quatro rotas da baseline e acrescentando o laboratório nos dois idiomas. LCP/CLS/TBT/FCP reais estão nos artefatos; não há métricas de campo. [Comparação e limites](VALIDATION.md#lighthouse-comparado-à-baseline).

## 11. Segurança e SEO

CSP por hashes preservada e exercitada em navegador; fontes e recursos locais; JSON-LD factual Person/WebSite; metadados e cartão OG localizados; canonical/hreflang/sitemap válidos; 404 inglês compatível com Pages; `npm audit` sem vulnerabilidades identificadas naquele momento. O PDF da raiz foi preservado e excluído da publicação. Nenhum código privado, corpus, credencial ou contato não autorizado foi exposto. Não houve alteração desnecessária de hospedagem ou contratação de serviços.

## 12. Versionamento

Commits semânticos no repositório existente:

- `9e02063` — baseline e critérios de aceitação.
- `81edeb6` — curadoria, estudos bilíngues e evidências verificadas.
- `421a5db` — identidade profissional, contatos autorizados, design e SEO.
- `731f66d` — laboratório A* bilíngue e acessível.
- `e193028` — algoritmo, seis larguras, acessibilidade e CSP de produção.
- `1acb866` — documentação, capturas antes/depois e resultados reais.

Push normal concluído para `main` em `DanielKulique/Portfolio`, sem force push, preservando origin e histórico. O [GitHub Actions 45057881535](https://github.com/DanielKulique/Portfolio/actions/runs/45057881535) aprovou todos os gates no commit `1acb866`, incluindo quatro testes do algoritmo e 72 testes de navegador. O commit posterior de fechamento registra essa confirmação e conclui o roadmap, sem alterar a implementação validada.

Servidor local iniciado para análise manual em `http://localhost:4321`, com homes e laboratório nos dois idiomas respondendo HTTP 200. A publicação Cloudflare continua preparada; não foi solicitada uma nova conexão/deploy nesta etapa.

## 13. Pendências do proprietário

E-mail exato e autorização; currículo correto com autorização; datas para timeline; divisão individual/equipe e atribuições detalhadas; texto autorizado de pesquisa/cursos/extensão; avaliação educacional/acessibilidade e licenças dos recursos do Jogo de Cores; fonte correta do projeto MIPS. GitHub e LinkedIn já foram confirmados e estão ativos. O PDF local não é currículo.

## 14. Próximos goals

GOAL 03: conteúdo autorizado, currículo/contato e eventual conexão Cloudflare quando solicitada. GOAL 04: ACO com seed, similaridade lexical corretamente descrita e comunicação explicitamente simulada; sem cards ou rotas até funcionarem. Complementar com leitor de tela, Safari/dispositivos reais e avaliação humana. [Roadmap](ROADMAP.md).

# Inventário e verificação editorial

Revisão inicial em 21/11/2026, atualizada pelo GOAL 02. Fontes: briefing fornecido, metadados de visibilidade do GitHub, README, árvore de arquivos e trechos de implementação dos repositórios públicos. Apenas o repositório Portfolio foi clonado; os demais foram consultados em modo de leitura. Repositórios privados tiveram somente sua visibilidade identificada; seu código não foi consultado.

## Estudos publicados

| Projeto                                                                                      | Revisão inspecionada                     | Evidência                                                                                        | Estado e limites                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Reservas / sistemasDistribuidos](https://github.com/DanielKulique/sistemasDistribuidos)     | cadcc334cb68d90efecc75ce554e18b73009d749 | README, ServidorTcp.java, RepositorioMySql.java, schema SQL e árvore de testes                   | Java, TCP/JSON, Swing, JDBC, MySQL/MariaDB confirmados. Testes de arquivo e EP1 reexecutados isoladamente; ver limites da bateria adicional na seção GOAL 02. Divisão individual detalhada pendente. |
| [Pipeline ANS / teste_nivelamento](https://github.com/DanielKulique/teste_nivelamento)       | 7a5ea092025eebff367c199f7f0f0be7ac7ceb7d | README, api/main.py, data_processing/transf_dados.py, database/teste_3.sql, árvore Vue e Postman | Extração, CSV, SQL, FastAPI/Vue confirmados. API consulta CSV em memória; não afirmar integração direta com MySQL. Sem dados originais copiados.                                                     |
| [Space Arena / ProjetoJogoFinal](https://github.com/DanielKulique/ProjetoJogoFinal)          | 67b25ca69bcff95e5f8b2a7d81bf7c5b7ecb23f3 | README, source/Game.hpp, docs e árvore de testes                                                 | C++17, SFML, CMake, regras, persistência e simulador documentados. Sem métricas científicas ou alegação de Flow.                                                                                     |
| [Masmorra / DesenvolvimentoDeJogos](https://github.com/DanielKulique/DesenvolvimentoDeJogos) | 5715de37b7649dfaa61de62dde0522e167b08630 | README detalhado, classes e testes listados na árvore                                            | C++/SFML, passo fixo, colisões e NPCs. A* existe em módulo/testes, mas perseguidor usa direção direta. Material do professor explicitamente reconhecido.                                             |
| [ACO-PROJECT](https://github.com/DanielKulique/ACO-PROJECT)                                  | 4cbe32826318d27734695d7631cab99cf614470c | README, ACO.cpp, classes e screenshot000.png                                                     | C++/raylib e otimização por colônia de formigas. Não é MIPS. Sem benchmark independente ou garantia de ótimo. Screenshot público original copiado e otimizado pelo Astro.                            |

Cada estudo informa problema, objetivo, solução, arquitetura, decisões, desafios, testes existentes, resultados verificáveis, limites e aprendizados nas duas línguas. A seção de contribuição explica a ausência de uma divisão individual comprovada; não reivindica autoria exclusiva. Fontes no site apontam para as revisões acima, não para HEAD mutável.

## Rascunhos excluídos do site

| Projeto                                                      | Origem                                                | Evidência disponível                                                        | Pendente                                                                                                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Detector de similaridade textual                             | Briefing do usuário                                   | Descrição de NLP, embeddings, FAISS, Python e APIs                          | Fonte pública/autorizada, metodologia, arquitetura, contribuição, testes e limitações. Não publicar corpus, código ou métricas privados. |
| Plataforma de cursos / motor IA                              | Briefing; visibilidade GitHub confirmada como privada | Sinopse autorizada: Node.js, Express, MySQL e IA                            | Descrição editorial autorizada, contribuição e resultados. Nenhum arquivo privado inspecionado ou incorporado.                           |
| [Jogo de Cores](https://github.com/DanielKulique/jogo_cores) | Árvore pública e game_objects.py                      | Python, Pygame, estado de jogador e fases; arquivos de áudio/vídeo listados | README, autoria dos assets, avaliação educacional e acessibilidade. Logs/resultados pessoais não foram lidos nem copiados.               |
| Plágio: Não Copie Essa Ideia                                 | Briefing; repositório de extensão privado             | Nome e contexto informados                                                  | Atividades, ferramentas, datas, contribuição e impacto com evidências autorizadas.                                                       |
| Arquitetura / imagens MIPS                                   | Briefing                                              | Fonte indicada contradiz a descrição                                        | Identificar fonte correta. ACO é publicado com sua implementação real.                                                                   |

Os rascunhos contêm somente sinopses fornecidas e campos pendentes. Não geram páginas e não são enviados como props de componentes Vue. As verificações de links e Playwright confirmam que as rotas de rascunho retornam 404 e não há marcadores de repositórios privados no HTML público.

## Perfil e contatos

- Nome, formação UTFPR/Ponta Grossa, interesses e tecnologias informadas: briefing do usuário.
- [Perfil GitHub](https://github.com/DanielKulique) e README público do perfil inspecionados. GitHub e LinkedIn confirmados pelo proprietário no GOAL 02; e-mail não informado.
- Currículo, fotografia, datas acadêmicas, experiência profissional, certificações e publicações: não publicados sem dados/autorização suficientes. Nenhuma informação foi inventada.
- Competências verificadas por código possuem links para projetos; C, Node.js, Express, FAISS, embeddings, NLP e Pygame aparecem como conhecimento acadêmico/prático informado, sem porcentagem ou nível atribuído.

## Procedimento editorial

Antes de remover `draft`, preencher as duas traduções, registrar fonte pública/autorizada, confirmar contribuição, preservar atribuições e executar validação. Não usar uma pontuação de teste do portfólio como evidência de qualidade dos sistemas apresentados.

## Evolução editorial — GOAL 02

A nova curadoria mantém as cinco revisões públicas acima e acrescenta um projeto de engenharia de software. Os títulos criativos foram preservados como subtítulos e substituídos no destaque por nomes descritivos.

| Ordem | Título atual                             | Evidência usada no card/estudo                                       |
| ----- | ---------------------------------------- | -------------------------------------------------------------------- |
| 1     | Sistema Distribuído de Reservas          | Trecho real de RepositorioMySql; testes isolados de arquivo e regras |
| 2     | Pipeline de Dados e API — ANS            | Endpoint real GET /buscar; API README e requirements verificados     |
| 3     | Modelagem de Sistema Educacional         | Artefatos UML e protótipo original de cadastro de atividade          |
| 4     | Otimização por Colônia de Formigas — TSP | Screenshot público original da aplicação raylib                      |
| 5     | Jogo 2D com Geração Procedural           | Contrato real de atualização/estado em Game.hpp                      |
| 6     | Dungeon 2D — Sistemas e Mecânicas        | Saída real da suíte A* executada em isolamento                       |

### Projeto de modelagem acrescentado

Fonte: [trabalhoApoo, commit e323109589b3e90928e94923fce95f9a6b210e73](https://github.com/DanielKulique/trabalhoApoo/tree/e323109589b3e90928e94923fce95f9a6b210e73).

Inspecionados: README, decisão Turma–Atividade, diagrama de classes em camadas, sequência de avaliação e protótipo público `diagramas/telas/novas_telas/telas_professor/08_professor_cadastrar_atividade.png`. A separação de Turma e Atividade, a multiplicidade muitos-para-muitos e as responsabilidades de apresentação/domínio estão documentadas. A imagem é um protótipo, não prova um produto executável, autenticação, persistência, IA ou envio de e-mail implementados. Não se atribui autoria exclusiva.

Também foram avaliados PROTOTIPO-IHC (README mínimo, sem substância adicional para esta curadoria) e Jogo de Cores (game_logic.py e game_objects.py públicos). O último confirma Python/Pygame, fases e estado, mas não comprova eficácia pedagógica, conformidade de acessibilidade ou autoria/licença dos recursos. Permanece em rascunho.

### Projetos locais e execução isolada

As cópias locais de `sistemasDistribuidos`, `DesenvolvimentoDeJogos` e `ProjetoJogoFinal` foram identificadas. Os dois primeiros HEADs coincidem com as revisões públicas fixadas. Foi usado `git archive HEAD` para cópias descartáveis em `artifacts/goal02/scratch/`; os repositórios originais não foram modificados. Não houve leitura de código privado de pesquisa, cursos ou extensão.

Os processos públicos de validação foram executados com bwrap em namespaces isolados (sem rede externa), ambiente vazio com allowlist, fonte/toolchain somente leitura e áreas temporárias de 128MiB (trabalho) e 16MiB (tmp). Limites: 60/90s de parede, 45/75s CPU, 2/3GiB de endereço, 2048 processos/threads por UID e 16MiB por arquivo. O limite por UID considera os processos já existentes do usuário; não representa a quantidade de processos criada pelo teste. HOME e TMPDIR eram locais ao namespace, sem acesso à home real ou credenciais.

- **Dungeon/A***: `make test-astar` em cópia isolada. **539/539 verificações aprovadas**, incluindo comparação com BFS. O trecho no site é abreviado e está identificado assim. Não é screenshot de partida.
- **Java/arquivo**: TesteArquivo, **11 verificações aprovadas**.
- **Java/regras EP1**: TesteEp1, **214 verificações aprovadas**, com 63 respostas sintéticas registradas dentro da área temporária.
- **Java/comunicação adicional**: 42 cenários e 536 verificações, com **uma falha** na comparação da saída do subprocesso Windows/println porque o aviso `Picked up JAVA_TOOL_OPTIONS` apareceu antes do status 201. Não é reportada como suíte integralmente aprovada; não comprova falha funcional do protocolo ou uma vulnerabilidade. Essa condição está visível no estudo.

O ambiente não dispõe de display virtual para gerar capturas gráficas isoladas de Swing/SFML/raylib. As dependências Python da API/Jogo de Cores não estavam disponíveis. Foram usados os artefatos públicos originais, fontes fixadas e as validações executáveis possíveis; não se fabricou GIF de jogo, screenshot da API ou benchmark. Os logs locais estão em `artifacts/goal02/evidence/`, sem incorporar dados reais de usuários no site.

### Confirmação de contatos

O proprietário confirmou nesta conversa GitHub e `https://www.linkedin.com/in/daniel-kulique-dos-passos-36a80425a/`. Ambos estão em `src/data/profile.ts`, na hero e no contato. E-mail não foi informado. Nenhum currículo foi autorizado. O PDF encontrado na raiz foi identificado como impressão do site e preservado fora do Git/build.

### Projetos estratégicos sem código público

A iniciação científica, a plataforma de cursos e a extensão continuam consideradas; não foram descartadas por privacidade. As sinopses autorizadas informam interesses/tecnologias, mas faltam detalhes verificáveis de contribuição, metodologia, resultados e limites para os estudos completos exigidos. Essas pendências ficam no roadmap, sem avisos de construção na interface pública. A seção de pesquisa usa apenas o contexto de formação/interesses fornecido pelo proprietário. Não há timeline porque faltam datas suficientes.

# Inventário e verificação editorial

Inspeção em 21/11/2026. Fontes: briefing fornecido, metadados de visibilidade do GitHub, README, árvore de arquivos e trechos de implementação dos repositórios públicos. Apenas o repositório Portfolio foi clonado; os demais foram consultados em modo de leitura. Repositórios privados tiveram somente sua visibilidade identificada; seu código não foi consultado.

## Estudos publicados

| Projeto                                                                                      | Revisão inspecionada                     | Evidência                                                                                        | Estado e limites                                                                                                                                                          |
| -------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Reservas / sistemasDistribuidos](https://github.com/DanielKulique/sistemasDistribuidos)     | cadcc334cb68d90efecc75ce554e18b73009d749 | README, ServidorTcp.java, RepositorioMySql.java, schema SQL e árvore de testes                   | Java, TCP/JSON, Swing, JDBC, MySQL/MariaDB confirmados. Testes do projeto não reexecutados. Divisão individual de contribuições pendente.                                 |
| [Pipeline ANS / teste_nivelamento](https://github.com/DanielKulique/teste_nivelamento)       | 7a5ea092025eebff367c199f7f0f0be7ac7ceb7d | README, api/main.py, data_processing/transf_dados.py, database/teste_3.sql, árvore Vue e Postman | Extração, CSV, SQL, FastAPI/Vue confirmados. API consulta CSV em memória; não afirmar integração direta com MySQL. Sem dados originais copiados.                          |
| [Space Arena / ProjetoJogoFinal](https://github.com/DanielKulique/ProjetoJogoFinal)          | 67b25ca69bcff95e5f8b2a7d81bf7c5b7ecb23f3 | README, source/Game.hpp, docs e árvore de testes                                                 | C++17, SFML, CMake, regras, persistência e simulador documentados. Sem métricas científicas ou alegação de Flow.                                                          |
| [Masmorra / DesenvolvimentoDeJogos](https://github.com/DanielKulique/DesenvolvimentoDeJogos) | 5715de37b7649dfaa61de62dde0522e167b08630 | README detalhado, classes e testes listados na árvore                                            | C++/SFML, passo fixo, colisões e NPCs. A* existe em módulo/testes, mas perseguidor usa direção direta. Material do professor explicitamente reconhecido.                  |
| [ACO-PROJECT](https://github.com/DanielKulique/ACO-PROJECT)                                  | 4cbe32826318d27734695d7631cab99cf614470c | README, ACO.cpp, classes e screenshot000.png                                                     | C++/raylib e otimização por colônia de formigas. Não é MIPS. Sem benchmark independente ou garantia de ótimo. Screenshot público original copiado e otimizado pelo Astro. |

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
- [Perfil GitHub](https://github.com/DanielKulique) e README público do perfil inspecionados. Sem LinkedIn ou e-mail confirmados no material revisado.
- Currículo, fotografia, datas acadêmicas, experiência profissional, certificações e publicações: ausentes por falta de confirmação. Nenhuma informação foi inventada.
- Competências verificadas por código possuem links para projetos; C, Node.js, Express, FAISS, embeddings, NLP e Pygame aparecem como conhecimento acadêmico/prático informado, sem porcentagem ou nível atribuído.

## Procedimento editorial

Antes de remover `draft`, preencher as duas traduções, registrar fonte pública/autorizada, confirmar contribuição, preservar atribuições e executar validação. Não usar uma pontuação de teste do portfólio como evidência de qualidade dos sistemas apresentados.

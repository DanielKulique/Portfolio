# Roadmap — evolução do portfólio

## GOAL 02: etapas e critérios

| Etapa                              | Entrega                                                                                        | Estado                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------- |
| 02.1 Auditoria e baseline          | Inspeção, 18 testes originais, seis larguras, temas, PDF e Lighthouse; docs/goal02/BASELINE.md | Concluída                       |
| 02.2 Hero e contato                | Nome, disponibilidade, formação, CTA e contatos tipados/autorizados                            | Concluída                       |
| 02.3 Curadoria                     | Seis estudos; nomes descritivos; engenharia antes de jogos; filtros por conteúdo publicado     | Concluída                       |
| 02.4 Evidências e estudos          | Proveniência, protótipos/capturas reais, código, testes isolados e instruções de execução      | Concluída; limites documentados |
| 02.5 Design e acessibilidade       | Tracking, contraste, impressão, hidratação e seis larguras                                     | Concluída                       |
| 02.6 Engineering Lab               | A* completo, oráculo BFS e grade editável por teclado                                          | Concluída                       |
| 02.7 I18n, SEO e desempenho        | Interface/lab traduzidos, JSON-LD factual, OG por idioma, 404 inglês e CSP                     | Concluída                       |
| 02.8 Auditoria, documentação e Git | Todos os gates, comparação antes/depois, commits semânticos e push                             | Concluída                       |

Os estados refletem os gates executados e registrados em docs/VALIDATION.md. Dados pessoais ausentes não bloqueiam as etapas independentes.

## Dados que o proprietário precisa fornecer

- E-mail profissional exato e autorização de divulgação.
- Caminho/arquivo do currículo PDF correto e autorização explícita de publicação. O PDF da raiz é impressão do site e não foi publicado.
- Datas verificáveis de formação, iniciação científica e extensão para uma timeline.
- Divisão de contribuição individual/equipe, colaboradores e materiais-base por projeto.
- Pesquisa: descrição autorizada de problema, metodologia, arquitetura, avaliação e contribuição; corpus/métricas somente se autorizados.
- Plataforma de cursos: texto público autorizado com funcionalidades efetivamente implementadas e papel individual. A sinopse Node/Express/MySQL/IA já foi considerada; não basta para afirmar autenticação/testes/segurança sem evidência.
- Extensão Plágio: Não Copie Essa Ideia: atividades, ferramentas, papel e impacto verificáveis.
- Jogo de Cores: autoria/licenças de recursos e evidência educacional/acessibilidade. Python/Pygame e fases estão no código, mas não comprovam eficácia pedagógica.
- Repositório correto para imagens MIPS; ACO-PROJECT é otimização em C++/raylib.

GitHub e LinkedIn já confirmados. Não repetir pedido desses dados.

## GOAL 03 — conteúdo autorizado e operação

Concluir os dados acima, preparar estudos editoriais autorizados de pesquisa/cursos/extensão e conectar o repositório ao Cloudflare Pages quando solicitado. Registrar apenas URL confirmada e repetir avaliação no deployment real. A ausência de código público não será tratada como ausência de experiência; o gate é a suficiência/autorização do conteúdo.

## GOAL 04 — próximos experimentos internos

- ACO/TSP com geração de pontos, seed reproduzível, parâmetros, histórico de custo e reinício.
- Similaridade textual lexical com Bag of Words/TF-IDF e cosseno, corretamente identificada; não representar como detector semântico da IC.
- Comunicação cliente-servidor com JSON, erros e persistência explicitamente simulada.
- Pipeline ANS com trilhas separadas de SQL e API.

Não publicar rotas/cards/botões desses experimentos até serem funcionais e testados.

## Validação humana

Realizar revisão com leitor de tela, Safari real, dispositivos adicionais e pessoas do público-alvo. A heurística atual e o axe não substituem essas avaliações. Investigar a comparação de stdout do subprocesso Java em ambiente isolado sem aviso de JAVA_TOOL_OPTIONS; não modificar o projeto original para melhorar um resultado do portfólio.

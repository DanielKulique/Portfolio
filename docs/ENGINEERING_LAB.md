# Laboratório de Engenharia

## Experimento entregue

Rotas estáticas `/lab/` e `/en/lab/`: A* em grade ortogonal de 12 × 10 células. A demonstração é independente do jogo C++; usa dados criados no navegador, sem APIs, modelos de IA, servidores ou conteúdo de pesquisa.

- Editar obstáculos, origem e destino; endpoints permanecem distintos e livres.
- Grade com roving tabindex, setas, Home/End, Enter/Espaço e nomes acessíveis para coordenadas/estado.
- Executar, pausar, continuar, avançar por passo, reiniciar busca e limpar obstáculos.
- Velocidade visual entre 10 e 300ms; modificar a velocidade pausa a reprodução.
- Mostrar ordem de expansão, caminho, custo e tempo local de cálculo.
- Reduced motion mostra o resultado de uma vez; o avanço manual permanece disponível.
- Conteúdo explicativo estático e fallback noscript; nenhuma rota experimental incompleta é publicada.

## Algoritmo e decisões

`src/lib/algorithms/astar.ts` separa a busca da UI. Movimentos ortogonais custam 1 e a heurística é Manhattan. A fila usa heap binário e desempate determinístico por h e índice da célula. Um conjunto fechado evita expansão duplicada; predecessor reconstrói o caminho. O resultado pode ser sem caminho, em vez de fabricar uma rota.

A animação reproduz o traço já calculado. Ela não altera o custo ou a ordem da busca. O tempo exibido usa performance.now apenas em torno do cálculo; não é uma medição dos projetos C++ nem uma métrica de campo. A admissibilidade/consistência da heurística depende do movimento ortogonal de custo unitário descrito, não de grafos arbitrários.

A implementação TypeScript foi escrita para este laboratório e se relaciona conceitualmente ao [A* público do projeto C++](https://github.com/DanielKulique/DesenvolvimentoDeJogos/blob/5715de37b7649dfaa61de62dde0522e167b08630/source/AStar.cpp). Não é o executável original nem uma reprodução do detector de similaridade textual da iniciação científica.

## Validação

`npm run test:unit` compara o resultado com uma busca em largura independente nas 128 combinações de obstáculos de uma grade 3 × 3 com endpoints livres. Verifica custo, contiguidade do caminho, ausência de obstáculos, ausência de visitas duplicadas, endpoints iguais, destino inacessível, entradas inválidas/grades grandes, determinismo e não mutação dos dados.

Playwright testa os controles, edição por teclado, pausa, reset, resultado de custo 16 na grade livre inicial, barreira sem caminho e proteção contra endpoints sobrepostos nas seis larguras. O axe testa estados executados, nos dois idiomas e temas.

## Extensão modular

Novos experimentos devem ter algoritmo puro em `src/lib/algorithms`, UI em `src/components/lab`, traduções centralizadas e oráculos independentes. Somente criar links/rotas quando a demonstração estiver completa.

Próximos experimentos ficam apenas em ROADMAP.md: ACO com seed e parâmetros, similaridade lexical corretamente identificada e comunicação cliente-servidor explicitamente simulada. Não há cards ou botões para esses trabalhos futuros.

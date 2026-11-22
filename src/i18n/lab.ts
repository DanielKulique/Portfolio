/** All experiment UI copy, including accessible grid names and honest simulation boundaries. */
export const labCopy = {
  'pt-BR': {
    title: 'Laboratório de Engenharia',
    intro:
      'Explore decisões de algoritmos, altere os dados e observe os resultados. Tudo acontece localmente no seu navegador.',
    name: 'A* — Busca de caminhos',
    description: 'Como encontrar um caminho curto sem explorar toda a grade?',
    note: 'Demonstração didática independente, inspirada nos estudos de A* dos projetos C++. Não executa o jogo original.',
    instructions:
      'Escolha o que editar e clique nas células. No teclado, use as setas para navegar e Espaço ou Enter para editar.',
    edit: 'Modo de edição',
    wall: 'Obstáculo',
    start: 'Origem',
    goal: 'Destino',
    free: 'Livre',
    visited: 'Visitado',
    path: 'Caminho',
    run: 'Executar A*',
    pause: 'Pausar',
    resume: 'Continuar',
    step: 'Próximo passo',
    reset: 'Reiniciar busca',
    clear: 'Limpar obstáculos',
    speed: 'Intervalo entre passos (ms)',
    ready: 'Pronto para explorar.',
    playing: 'Explorando a grade.',
    paused: 'Exploração pausada.',
    found: 'Caminho encontrado.',
    missing: 'Não existe caminho entre os pontos.',
    grid: 'Grade de busca A*',
    row: 'Linha',
    column: 'Coluna',
    cost: 'Custo do caminho',
    nodes: 'Nós visitados',
    duration: 'Cálculo neste navegador',
    noPath: 'Sem caminho',
    technique: 'A técnica utilizada',
    explanation:
      'Cada movimento ortogonal custa 1. A heurística de Manhattan estima a distância ao destino sem atravessar diagonais. Com esses custos, ela é admissível e consistente: o A* encontra um caminho de custo mínimo quando existe. Obstáculos podem aumentar a busca ou impedir uma solução.',
    tradeoff:
      'Uma fila de prioridade binária organiza a fronteira por f = g + h. Empates usam h e a posição na grade para manter uma ordem determinística. A animação apresenta a ordem de expansão já calculada; a velocidade visual não altera o algoritmo.',
    metricsNote:
      'Nós visitados contam células expandidas. O custo conta movimentos, não células. O tempo é uma medição local do cálculo, sem incluir a animação, e não é um benchmark dos projetos C++.',
    reduced:
      'Movimento reduzido: o resultado é exibido de uma vez. O controle por passos continua disponível.',
    back: 'Voltar ao portfólio',
    source: 'Ver referência C++',
    validation: 'Testes do algoritmo',
    validationText:
      'A implementação é comparada com uma busca em largura independente em grades pequenas, além de casos sem caminho, endpoints inválidos e reinício.',
  },
  en: {
    title: 'Engineering Lab',
    intro:
      'Explore algorithm decisions, change the inputs and observe the results. Everything runs locally in your browser.',
    name: 'A* — Pathfinding',
    description:
      'How can we find a short path without exploring the entire grid?',
    note: 'Independent educational demonstration inspired by the C++ A* studies. It does not run the original game.',
    instructions:
      'Choose an editing mode and select cells. Use arrow keys to navigate the grid and Space or Enter to edit with the keyboard.',
    edit: 'Editing mode',
    wall: 'Obstacle',
    start: 'Start',
    goal: 'Goal',
    free: 'Free',
    visited: 'Visited',
    path: 'Path',
    run: 'Run A*',
    pause: 'Pause',
    resume: 'Resume',
    step: 'Next step',
    reset: 'Restart search',
    clear: 'Clear obstacles',
    speed: 'Step interval (ms)',
    ready: 'Ready to explore.',
    playing: 'Exploring the grid.',
    paused: 'Exploration paused.',
    found: 'Path found.',
    missing: 'No path connects these points.',
    grid: 'A* search grid',
    row: 'Row',
    column: 'Column',
    cost: 'Path cost',
    nodes: 'Visited nodes',
    duration: 'Calculation in this browser',
    noPath: 'No path',
    technique: 'The actual technique',
    explanation:
      'Each orthogonal movement costs 1. The Manhattan heuristic estimates distance to the goal with no diagonal moves. Under these costs, it is admissible and consistent: A* finds a minimum-cost path when one exists. Obstacles can increase the search or make a solution impossible.',
    tradeoff:
      'A binary priority queue orders the frontier by f = g + h. Ties use h and the grid position to keep a deterministic order. The animation reveals the precomputed expansion order; visual speed does not change the algorithm.',
    metricsNote:
      'Visited nodes count expanded cells. Cost counts movements, not cells. Duration measures the local calculation without the animation and is not a benchmark of the C++ projects.',
    reduced:
      'Reduced motion: the result appears immediately. Step controls remain available.',
    back: 'Back to portfolio',
    source: 'View C++ reference',
    validation: 'Algorithm tests',
    validationText:
      'The implementation is compared with an independent breadth-first search across small grids, plus no-path, invalid-endpoint and restart cases.',
  },
} as const;

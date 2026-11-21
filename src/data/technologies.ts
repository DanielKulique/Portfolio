/** Evidence links distinguish public implementations from self-reported academic/practical knowledge. */
export const technologyGroups = [
  {
    title: { 'pt-BR': 'Linguagens', en: 'Languages' },
    items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
    projects: ['pipeline-ans', 'sistemas-distribuidos', 'space-arena'],
  },
  {
    title: { 'pt-BR': 'Back-end e APIs', en: 'Back-end & APIs' },
    items: ['FastAPI', 'TCP/IP', 'JSON', 'JDBC'],
    projects: ['pipeline-ans', 'sistemas-distribuidos'],
  },
  {
    title: { 'pt-BR': 'Bancos de dados', en: 'Databases' },
    items: ['MySQL', 'MariaDB', 'SQL'],
    projects: ['sistemas-distribuidos', 'pipeline-ans'],
  },
  {
    title: {
      'pt-BR': 'Inteligência artificial',
      en: 'Artificial intelligence',
    },
    items: ['ACO', 'A*', 'Behavior Trees'],
    projects: ['otimizacao-colonia-formigas', 'masmorra-2d'],
  },
  {
    title: { 'pt-BR': 'Engenharia de software', en: 'Software engineering' },
    items: ['POO / OOP', 'CTest', 'CMake', 'Git'],
    projects: ['space-arena'],
  },
  {
    title: {
      'pt-BR': 'Ferramentas e infraestrutura',
      en: 'Tools & infrastructure',
    },
    items: ['Linux', 'GitHub', 'Make', 'Vue.js'],
    projects: ['pipeline-ans', 'masmorra-2d'],
  },
] as const;
export const reportedKnowledge = [
  'C',
  'Node.js',
  'Express',
  'FAISS',
  'Embeddings',
  'NLP',
  'Pygame',
];

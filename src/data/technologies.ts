/** Capabilities map to concrete studies; reported learning never masquerades as publicly demonstrated work. */
export interface Capability {
  name: string;
  level: 'demonstrated' | 'reported' | 'academic' | 'learning';
  projects: string[];
  focus?: { 'pt-BR': string; en: string };
}
export interface TechnologyGroup {
  title: { 'pt-BR': string; en: string };
  items: Capability[];
}
const demonstrated = (name: string, ...projects: string[]): Capability => ({
  name,
  level: 'demonstrated',
  projects,
});
export const technologyGroups: TechnologyGroup[] = [
  {
    title: {
      'pt-BR': 'Linguagens de programação',
      en: 'Programming languages',
    },
    items: [
      demonstrated('Python', 'pipeline-ans'),
      demonstrated('Java', 'sistemas-distribuidos'),
      demonstrated('C++', 'space-arena', 'otimizacao-colonia-formigas'),
      demonstrated('SQL', 'pipeline-ans'),
      { name: 'C', level: 'academic', projects: [] },
    ],
  },
  {
    title: { 'pt-BR': 'Back-end e APIs', en: 'Back-end & APIs' },
    items: [
      demonstrated('FastAPI', 'pipeline-ans'),
      demonstrated('TCP/IP · JSON · JDBC', 'sistemas-distribuidos'),
      { name: 'Node.js · Express', level: 'reported', projects: [] },
    ],
  },
  {
    title: { 'pt-BR': 'Front-end', en: 'Front-end' },
    items: [demonstrated('Vue.js · JavaScript', 'pipeline-ans')],
  },
  {
    title: { 'pt-BR': 'Bancos de dados', en: 'Databases' },
    items: [
      demonstrated('MySQL · MariaDB', 'sistemas-distribuidos', 'pipeline-ans'),
    ],
  },
  {
    title: {
      'pt-BR': 'Inteligência artificial e algoritmos',
      en: 'Artificial intelligence & algorithms',
    },
    items: [
      {
        ...demonstrated('ACO', 'otimizacao-colonia-formigas'),
        focus: {
          'pt-BR': 'Otimização meta-heurística',
          en: 'Metaheuristic optimization',
        },
      },
      {
        ...demonstrated('A*', 'masmorra-2d'),
        focus: { 'pt-BR': 'Busca heurística', en: 'Heuristic search' },
      },
      {
        name: 'NLP · Embeddings · FAISS',
        level: 'learning',
        projects: [],
        focus: {
          'pt-BR':
            'Processamento de linguagem natural e recuperação de informação',
          en: 'Natural language processing and information retrieval',
        },
      },
    ],
  },
  {
    title: { 'pt-BR': 'Engenharia de software', en: 'Software engineering' },
    items: [
      demonstrated('UML · PlantUML', 'modelagem-sistema-educacional'),
      demonstrated('POO / OOP · CTest', 'space-arena'),
    ],
  },
  {
    title: {
      'pt-BR': 'Ferramentas e infraestrutura',
      en: 'Tools & infrastructure',
    },
    items: [
      demonstrated('Linux · Git · GitHub', 'sistemas-distribuidos'),
      demonstrated('CMake · Make', 'space-arena', 'masmorra-2d'),
    ],
  },
];

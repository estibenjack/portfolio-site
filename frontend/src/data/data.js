// Public project and skill content lives here for easy updates.
export const certificationLinks = {
  databricks:
    'https://credentials.databricks.com/21e882dd-de53-41ae-aa50-d3c17fd1f4c8#acc.tKEeYQGO',
  microsoft:
    'https://www.credly.com/badges/f73047a7-da23-4c83-8214-8923a418d218/'
};

export const skillGroups = [
  {
    title: 'Data & engineering',
    description: 'Working with data, from pipelines to application storage.',
    skills: ['Python', 'SQL', 'Azure', 'Databricks', 'PostgreSQL', 'MySQL']
  },
  {
    title: 'Software development',
    description: 'Building applications, APIs and immersive experiences.',
    skills: [
      'Java',
      'C#',
      'React',
      'JavaScript',
      'Django',
      'Node.js',
      'Unity',
      'Git'
    ]
  },
  {
    title: 'AI & machine learning',
    description: 'Exploring how generative AI becomes useful software.',
    skills: ['Generative AI', 'Databricks', 'AI agents', 'Gemini API']
  }
];
export const projects = [
  {
    id: 'tfl-pipeline',
    title: 'TfL Network Status Pipeline',
    category: 'AZURE-NATIVE DATA ENGINEERING',
    type: 'AI & data',
    description:
      'An Azure-native ELT pipeline that collects live TfL network status with Python, preserves raw snapshots in Data Lake Storage and uses Data Factory to load Azure SQL for historical analysis.',
    techs: [
      'Python',
      'Azure Data Lake',
      'Data Factory',
      'Azure SQL',
      'GitHub Actions'
    ],
    github: 'https://github.com/estibenjack/azure-tfl-network-status-pipeline',
    visual: 'pipeline',
    featured: true
  },
  {
    id: 'aml-agent',
    title: 'AML & Fraud Detection Agent',
    category: 'ACADEMY PROJECT · AI AGENTS',
    type: 'AI & data',
    description:
      'A single-agent system built on Databricks during an academy, exploring anti-money laundering and fraud detection.',
    techs: ['Databricks', 'AI agents', 'AML', 'Fraud detection'],
    visual: 'agent',
    note: 'Academy project · No public repository'
  },
  {
    id: 'vr-courtroom',
    title: 'Inside the Courtroom',
    category: 'MSC PROJECT · IN PROGRESS',
    type: 'Immersive tech',
    description:
      'A VR courtroom simulator for criminology university students to experience trials from different perspectives. Currently in development for my MSc.',
    techs: ['Unity', 'C#', 'Virtual reality'],
    visual: 'courtroom',
    note: 'In progress · MSc Software Development'
  },
  {
    id: 'streetscript',
    title: 'StreetScript',
    category: 'AI & LANGUAGE LEARNING',
    type: 'AI & data',
    description:
      'Bringing language learning and generative AI together. A Django API that uses Gemini to generate language-learning flashcards.',
    techs: ['Python', 'Django', 'Gemini AI', 'PostgreSQL'],
    github: 'https://github.com/estibenjack/streetscript',
    visual: 'language'
  },
  {
    id: 'sole-traders',
    title: 'Sole Traders',
    category: 'FULL-STACK WEB APPLICATION',
    type: 'Web development',
    description:
      'A place for independent traders to share their services online. A directory built with a React frontend, an Express API and a MySQL database.',
    techs: ['React', 'Node.js', 'Express', 'MySQL'],
    github: 'https://github.com/estibenjack/sole-traders',
    visual: 'directory'
  }
];

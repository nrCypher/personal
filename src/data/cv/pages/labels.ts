import type { Lang } from "../types";

type L = Record<Lang, string>;
export const t = (l: L, lang: Lang) => l[lang];

export const L = {
  // Page titles / subtitles
  summaryTitle: { pt: "Resumo do Curriculum Vitae", en: "Curriculum Vitae — Summary" },
  summarySub: { pt: "Perfil, indicadores, formação e percurso profissional.", en: "Profile, key figures, education and career path." },
  scientificTitle: { pt: "Vertente — Mérito Científico", en: "Scientific Merit" },
  scientificSub: { pt: "Produção científica, projetos, equipas e reconhecimento.", en: "Scientific production, projects, teams and recognition." },
  pedagogicalTitle: { pt: "Vertente — Mérito Pedagógico", en: "Pedagogical Merit" },
  pedagogicalSub: { pt: "Docência, cargos letivos, orientação e formação.", en: "Teaching, academic positions, supervision and training." },
  otherTitle: { pt: "Outras Atividades Relevantes", en: "Merit in other Relevant Activities" },
  otherSub: { pt: "Coordenação, transferência de tecnologia, associações e distinções.", en: "Coordination, technology transfer, associations and distinctions." },
  contactsTitle: { pt: "Contactos", en: "Contacts" },
  contactsSub: { pt: "Endereços, identificadores e perfis científicos.", en: "Addresses, identifiers and scientific profiles." },

  // Summary
  profile: { pt: "Perfil", en: "Profile" },
  biography: { pt: "Nota biográfica", en: "Biography" },
  keyFigures: { pt: "Indicadores", en: "Key Figures" },
  bibliometrics: { pt: "Indicadores bibliométricos", en: "Bibliometric indicators" },
  researchAreas: { pt: "Áreas de investigação", en: "Research areas" },
  academicBackground: { pt: "Formação Académica", en: "Academic Background" },
  degrees: { pt: "Graus académicos", en: "Academic degrees" },
  furtherTraining: { pt: "Formação complementar", en: "Further training" },
  careerPath: { pt: "Percurso Profissional", en: "Career Path" },
  currentPositions: { pt: "Cargos atuais", en: "Current positions" },
  previousPositions: { pt: "Cargos anteriores", en: "Previous positions" },

  // Scientific
  scientificProduction: { pt: "Produção Científica", en: "Scientific Production" },
  journalArticles: { pt: "Artigos em Revistas Científicas", en: "Articles in Scientific Journals" },
  booksChapters: { pt: "Livros e Capítulos de Livros", en: "Books and Book Chapters" },
  conferencePapers: { pt: "Artigos em Atas de Conferências", en: "Articles in Conference Proceedings" },
  preprints: { pt: "Preprints", en: "Preprints" },
  datasetsSoftware: { pt: "Conjuntos de Dados e Software", en: "Datasets and Software" },
  scientificProjects: { pt: "Projetos Científicos", en: "Scientific Projects" },
  projectCoordination: { pt: "Coordenação de Projetos", en: "Coordination of Projects" },
  projectParticipation: { pt: "Participação em Projetos", en: "Participation in Projects" },
  scientificTeams: { pt: "Equipas Científicas", en: "Scientific Teams" },
  supervision: { pt: "Orientação Científica", en: "Scientific Supervision" },
  researchUnits: { pt: "Unidades de Investigação e Afiliações", en: "Research Units and Affiliations" },
  scientificRecognition: { pt: "Reconhecimento Científico", en: "Scientific Recognition" },
  technicalCommittees: { pt: "Comités Técnicos e Sociedades Científicas", en: "Technical Committees and Scientific Societies" },
  conferenceCommittees: { pt: "Comissões Científicas e Organizadoras", en: "Scientific and Organizing Committees" },
  awards: { pt: "Prémios e Distinções", en: "Awards and Distinctions" },

  // Pedagogical
  teachingActivity: { pt: "Atividade Letiva", en: "Teaching Activity" },
  teachingPositions: { pt: "Cargos Docentes", en: "Teaching Positions" },
  pedagogicalSupervision: { pt: "Orientação Pedagógica", en: "Pedagogical Supervision" },
  trainingReceived: { pt: "Formação Recebida", en: "Training Received" },

  // Other activities
  management: { pt: "Coordenação e Gestão", en: "Coordination and Management" },
  groupCoordination: { pt: "Coordenação de grupos e equipas", en: "Coordination of groups and teams" },
  projectManagement: { pt: "Gestão de projetos com a indústria", en: "Management of industry projects" },
  techTransfer: { pt: "Transferência de Tecnologia e Inovação", en: "Technology Transfer and Innovation" },
  industryProjects: { pt: "Projetos com a indústria", en: "Industry projects" },
  innovationHubs: { pt: "Polos de inovação digital", en: "Digital innovation hubs" },
  softwareProducts: { pt: "Software e produtos", en: "Software and products" },
  professionalAssoc: { pt: "Associações Profissionais", en: "Professional Associations" },
  memberships: { pt: "Filiações", en: "Memberships" },
  distinctions: { pt: "Distinções", en: "Distinctions" },

  // Contacts
  contactDetails: { pt: "Dados de Contacto", en: "Contact Details" },
  institutionalAddress: { pt: "Endereço Institucional", en: "Institutional Address" },
  contacts: { pt: "Contactos", en: "Contacts" },
  onlineInformation: { pt: "Informação Online", en: "Online Information" },
  designation: { pt: "Designação", en: "Designation" },
  webpage: { pt: "Página web", en: "Webpage" },

  // Groups
  international: { pt: "Internacional", en: "International" },
  national: { pt: "Nacional", en: "National" },

  // Link chips
  linkDoi: { pt: "DOI", en: "DOI" },
  linkPublisher: { pt: "Editora", en: "Publisher" },
  linkRepository: { pt: "Repositório", en: "Repository" },
  linkPreprint: { pt: "Preprint", en: "Preprint" },
  linkDataset: { pt: "Dados", en: "Dataset" },
  linkProject: { pt: "Projeto", en: "Project" },
  linkProceedings: { pt: "Atas", en: "Proceedings" },
  linkCordis: { pt: "CORDIS", en: "CORDIS" },
  linkArchive: { pt: "Arquivo", en: "Archived" },
  linkFree: { pt: "Acesso livre", en: "Free access" },
  linkOther: { pt: "Ligação", en: "Link" },

  // UI
  contents: { pt: "Índice", en: "Contents" },
  noEntries: { pt: "Sem entradas.", en: "No entries yet." },
  document: { pt: "PDF", en: "PDF" },
  viewMore: { pt: "Ver mais", en: "View more" },
  backToCv: { pt: "Voltar ao CV", en: "Back to the CV" },
} satisfies Record<string, L>;

export function linkLabels(lang: Lang): Record<string, string> {
  return {
    doi: t(L.linkDoi, lang), publisher: t(L.linkPublisher, lang), repository: t(L.linkRepository, lang),
    preprint: t(L.linkPreprint, lang), dataset: t(L.linkDataset, lang), project: t(L.linkProject, lang),
    proceedings: t(L.linkProceedings, lang), cordis: t(L.linkCordis, lang), archive: t(L.linkArchive, lang),
    free: t(L.linkFree, lang), other: t(L.linkOther, lang),
  };
}

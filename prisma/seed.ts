import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      fullName: "Your Name",
      title: "Associate Professor",
      institution: "University Name",
      department: "Department of Computer Science",
      bio: "Welcome to my personal academic website. I am a researcher and educator working on [your research area]. My work focuses on [brief description of research interests and contributions].\n\nI hold a PhD in [field] from [university] and have been actively contributing to the academic community through publications, conferences, and supervision of graduate students.",
      email: "your.email@university.edu",
      phone: "+351 000 000 000",
      address: "Department of Computer Science, University Name, 1234-567 City, Country",
      researchInterests: "Artificial Intelligence, Machine Learning, Multi-agent Systems, Cyber-Physical Systems, Intelligent Manufacturing, Distributed Systems",
    },
  });

  await prisma.academicPathEntry.deleteMany();
  await prisma.academicPathEntry.createMany({
    data: [
      { year: 2015, title: "Habilitation (Agregação)", institution: "University Name", location: "City, Country", description: "Habilitation in Computer Science.", category: "habilitation", sortOrder: 1 },
      { year: 2005, title: "PhD in Computer Science", institution: "University Name", location: "City, Country", description: "Doctoral thesis on intelligent manufacturing systems.", category: "degree", sortOrder: 2 },
      { year: 1999, title: "MSc in Electrical and Computer Engineering", institution: "University Name", location: "City, Country", description: "Master's dissertation on distributed control systems.", category: "degree", sortOrder: 3 },
      { year: 1995, title: "BSc in Electrical Engineering", institution: "University Name", location: "City, Country", description: "Bachelor's degree with specialization in automation.", category: "degree", sortOrder: 4 },
      { year: 2020, title: "IEEE Senior Member", institution: "IEEE", location: "", description: "Elevated to Senior Member for significant contributions.", category: "award", sortOrder: 0 },
    ],
  });

  await prisma.position.deleteMany();
  await prisma.position.createMany({
    data: [
      { title: "Associate Professor with Habilitation", institution: "University Name", department: "Department of Computer Science", startYear: 2015, isCurrent: true, description: "Teaching and leading research projects.", sortOrder: 1 },
      { title: "Principal Investigator", institution: "Research Centre for Intelligent Systems", startYear: 2012, isCurrent: true, sortOrder: 2 },
      { title: "Assistant Professor", institution: "University Name", department: "Department of Computer Science", startYear: 2006, endYear: 2015, sortOrder: 3 },
    ],
  });

  await prisma.publication.deleteMany();
  await prisma.publication.createMany({
    data: [
      { category: "journal", authors: "A. Author, B. Author", title: "A novel approach to distributed intelligent systems in Industry 4.0", venue: "IEEE Transactions on Industrial Informatics", volume: "20(3)", pages: "1234-1245", year: 2024, doi: "10.1109/TII.2024.0000001", sortOrder: 1 },
      { category: "journal", authors: "A. Author, D. Author", title: "Multi-agent systems for cyber-physical production", venue: "Computers in Industry", volume: "145", pages: "103829", year: 2023, sortOrder: 2 },
      { category: "conference", authors: "A. Author, E. Author", title: "Towards self-organizing manufacturing systems", venue: "IEEE International Conference on Industrial Informatics (INDIN)", pages: "45-52", year: 2024, sortOrder: 1 },
      { category: "book_chapter", authors: "A. Author", title: "Multi-agent systems in smart manufacturing", venue: "Handbook of Industry 4.0, Springer", pages: "125-150", year: 2023, sortOrder: 1 },
      { category: "edited_book", authors: "A. Author, H. Editor (Editors)", title: "Service Oriented Holonic and Multi-Agent Manufacturing Systems", venue: "Springer, Studies in Computational Intelligence", volume: "1034", year: 2022, sortOrder: 1 },
    ],
  });

  await prisma.patent.deleteMany();
  await prisma.patent.createMany({
    data: [
      { authors: "A. Author, B. Colombo", title: "Method for developing a multi-agent system", patentNumber: "US20120029656 A1", date: "2012-02-02", country: "United States", sortOrder: 1 },
      { authors: "A. Author, D. Author", title: "Distributed control system for cyber-physical production", patentNumber: "EP3450000 A1", date: "2019-03-15", country: "Europe", sortOrder: 2 },
    ],
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      { title: "Self-Organizing Production Systems for Industry 5.0", acronym: "SELFPROD", role: "Principal Investigator", funder: "European Commission, Horizon Europe", reference: "HE-101234567", startYear: 2023, endYear: 2026, description: "Research on resilient, human-centric production systems.", sortOrder: 1 },
      { title: "Digital Twins for Smart Manufacturing", acronym: "DTSM", role: "Work Package Leader", funder: "FCT", reference: "PTDC/EEI-AUT/0001/2020", startYear: 2021, endYear: 2024, sortOrder: 2 },
      { title: "Collaborative Robotics for Industry 4.0", acronym: "COBOT4.0", role: "Partner", funder: "Horizon 2020", startYear: 2018, endYear: 2022, sortOrder: 3 },
    ],
  });

  await prisma.student.deleteMany();
  await prisma.student.createMany({
    data: [
      { name: "Student One", category: "phd", thesisTitle: "Self-adaptive multi-agent systems for resilient manufacturing", startYear: 2022, status: "ongoing", coSupervisor: "Prof. Co-Supervisor", institution: "University Name", sortOrder: 1 },
      { name: "Student Two", category: "phd", thesisTitle: "Digital twins and machine learning for predictive maintenance", startYear: 2018, endYear: 2023, status: "completed", institution: "University Name", sortOrder: 2 },
      { name: "Student Three", category: "msc", thesisTitle: "IoT-based monitoring of industrial equipment", startYear: 2023, endYear: 2024, status: "completed", institution: "University Name", sortOrder: 1 },
      { name: "Student Four", category: "msc", thesisTitle: "Federated learning for distributed manufacturing", startYear: 2024, status: "ongoing", institution: "University Name", sortOrder: 2 },
      { name: "Dr. Postdoc One", category: "postdoc", thesisTitle: "Reinforcement learning for adaptive scheduling", startYear: 2022, status: "ongoing", institution: "University Name", sortOrder: 1 },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

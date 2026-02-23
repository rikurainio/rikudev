export const DATA = {
  name: "Riku Rainio",
  role: "Software Developer",
  about: "Building stuff with code",
  links: {
    Email: "mailto:rainioriku@gmail.com",
    GitHub: "https://github.com/rikurainio",
    Instagram: "https://www.instagram.com/rikurainio/",
    LinkedIn: "https://linkedin.com/in/rikurainio",
    Resume: "/cv.pdf", // Place in public folder
  },
  skills: [
    { name: "TypeScript", category: "programming language" },
    { name: "JavaScript", category: "programming language" },
    { name: "C++", category: "programming language" },
    { name: "Python", category: "programming language" },
    { name: "Next.js", category: "framework" },
    { name: "React", category: "framework" },
    { name: "HTML", category: "markup" },
    { name: "CSS", category: "styling" },
    { name: "TailwindCSS", category: "styling framework" },
    // { name: "Electron", category: "framework" },
    { name: "Node.js", category: "runtime" },
    { name: "AWS", category: "cloud" },
    { name: "PostgreSQL", category: "database" },
    { name: "MongoDB", category: "database" },
    { name: "Redis", category: "database" },
    { name: "Git", category: "tool" },
    { name: "Cursor", category: "tool" },
    { name: "Photoshop", category: "design tool" },
    { name: "Sony Vegas Pro", category: "design tool" },
    { name: "Figma", category: "design tool" },
    { name: "Godot", category: "engine" },
    { name: "Lugia", category: "pokemon" },
  ],
  projects: [
    {
      title: "Drafter.lol",
      slug: "drafter-lol",
      description: "A real-time drafting and analytics platform for League of Legends teams, coaches, and broadcasters",
      tech: ["Next.js", "Socket.io", "Polar", "TypeScript", "PostgreSQL"],
      link: "https://drafter.lol",
      image: "drafter.jpg",
      accentColor: "emerald",
    },
    {
      title: "Warehouse Jiu Jitsu app",
      slug: "warehousejiujitsu",
      description: "A mobile application for warehouse jiu-jitsu betting with fake credits",
      tech: ["Next.js", "Socket.io", "Oauth", "TypeScript"],
      link: "https://definitelynotgambling.online",
      image: "warehousejj2.png",
      accentColor: "violet",
    },
    {
      title: "Mennää Game",
      slug: "mennaa",
      description: "A Godot game project",
      tech: ["Godot", "GDScript"],
      link: "",
      image: "mennaa.png",
      accentColor: "sky",
    },

    {
      title: "Sasken CV Database",
      slug: "sasken-cv-database",
      description: "A CV database application for Sasken",
      tech: ["React", "Django", "PostgreSQL"],
      link: "",
      image: "sasken.png",
      accentColor: "amber",
    },

    {
      title: "LinkedInsanity job applier",
      slug: "linkedinsanity",
      description: "Automated LinkedIn Easy Applier with customazible settings",
      tech: ["JavaScript", "Browser Automation"],
      link: "",
      image: "linkedinsanity.png",
      accentColor: "rose",
    },
  ],
  jobs: [
    {
      company: "Drafter.lol",
      role: "Founder & Lead Engineer",
      period: "December 2023 – Present",
      description:
        "Scaled self-architected platform to over 14,000 monthly users and 2.5 million ad impressions, maintaining 99.9% uptime on a single VPS. Engineered the end-to-end architecture (frontend, backend, database), slashing operational costs by 80% by deploying self-managed Docker containers. Orchestrated the PostgreSQL and Redis infrastructure within a monorepo, optimizing the CI/CD build pipeline to cut deployment times by 40%.",
    },
    {
      company: "DataAnnotation & Outlier",
      role: "Technical AI Annotator",
      period: "March 2024 – February 2026",
      description:
        "Enhanced LLM code generation accuracy by 30% through rigorous debugging and validation of TypeScript and Python outputs. Evaluated model outputs across critical axes including truthfulness, safety, and instruction following, contributing directly to RLHF (Reinforcement Learning from Human Feedback) pipelines. Designed complex system prompts and adversarial test cases to rigorously test model capabilities and reduce AI hallucinations.",
    },
    {
      company: "Buutti",
      role: "Full-Stack Developer",
      period: "April 2024 – October 2024",
      description:
        "Maintained and expanded a client e-commerce application using Next.js, implementing responsive UI components based on precise design requirements. Developed 5+ REST API endpoints to handle product data, successfully bridging the frontend client with the backend logic.",
    },
    {
      company: "Knowit",
      role: "Frontend Developer",
      period: "August 2022 – March 2024",
      description:
        "Developed core frontend modules for a Media Asset Management (MAM) system using React, enabling users to efficiently upload, organize, and retrieve digital assets. Integrated UI components with a Python backend, utilizing AWS S3 for file storage and DynamoDB for metadata management. Delivered 15+ major feature updates, including advanced search filters and file previewers, ensuring a seamless user experience for managing complex data.",
    },
    {
      company: "Teknikum Oy",
      role: "Production Worker",
      period: "January 2017 – July 2017",
      description:
        "Manufacturing of various rubber parts with machinery. Process work in a factory. Three-shift-work. Helped clients by manufacturing batches of orders for them in time.",
    },
  ],
  education: [
    {
      institution: "Tampere University of Technology",
      degree: "Master of Science in Computer Science",
      period: "Ongoing",
      description: "Major: Software Development. Completed all required coursework; Currently working on Master's thesis.",
    },
    {
      institution: "Tampere University of Technology",
      degree: "Bachelor of Science in Computer Science",
      period: "2018 - 2023",
      description: "Major: Software Engineering; Minor: Industrial Engineering and Management.",
    },
  ],
};


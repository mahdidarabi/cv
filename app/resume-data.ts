export const profile = {
  greeting: 'UNIDENTIFIED ORGANIC LIFEFORM DETECTED',
  message: 'RUNNING RESUME...',
  name: 'MAHDI DARABI',
  alias: 'KNOWN ALIAS: @mahdidarabi',
  occupation: 'DEVOPS ENGINEER / SRE',
  summary:
    'DevOps Engineer with 3+ years of experience in designing and implementing scalable infrastructure and CI/CD pipelines.',
  background:
    'Transitioned from backend development (4+ years) to DevOps, driven by a passion for solving challenges across the development-to-deployment lifecycle. Spearheaded the creation of a DevOps practice from scratch at Weblite.me, single-handedly building the platform, infrastructure, and automation workflows to meet organizational needs. Strong advocate for IaC, observability, and collaboration between development and operations teams.',
} as const

export const navigationItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT & DETAILS' },
  { id: 'experience', label: 'WORK EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'recommendations', label: 'RECOMMENDATIONS' },
  { id: 'hard-skills', label: 'HARD SKILLS' },
  { id: 'soft-skills', label: 'SOFT SKILLS' },
  { id: 'education', label: 'EDUCATION' },
] as const

export const projects = [
  {
    name: 'KArkive',
    description: 'Kubernetes-native backup & restore operator.',
    url: 'https://github.com/mahdidarabi/karkive',
  },
  {
    name: 'DNSGo',
    description: 'CLI for changing, showing, and removing DNS records.',
    url: 'https://github.com/code2z/dnsgo',
  },
  {
    name: 'Healthchecks.io Wrapper',
    description:
      'Helper scripts for running jobs and pinging Healthchecks to track success and failure.',
    url: 'https://github.com/mahdidarabi/healthchecks.io-wrapper',
  },
  {
    name: 'GitLeap',
    description: 'GitHub repository.',
    url: 'https://github.com/mahdidarabi/gitleap',
  },
] as const

export const recommendations = [
  {
    author: 'Hasan Ahmadkhani',
    role: 'Solution Architect & Data Engineer',
    date: 'FEB 9, 2026',
    context: 'WORKED WITH MAHDI ON THE SAME TEAM',
    quote: [
      'Mahdi is a strong DevOps Engineer with deep expertise in CI/CD pipelines, automation, and containerized environments. He brings a solid development background, which allows him to design efficient, developer-friendly workflows.',
      'Passionate about infrastructure as code and observability, he consistently delivers scalable, reliable solutions across the development-to-deployment lifecycle.',
    ],
  },
  {
    author: 'Ali Khodaverd',
    role: 'DevOps Engineer',
    date: 'JUL 15, 2025',
    context: 'WORKED WITH MAHDI ON THE SAME TEAM',
    quote: [
      "I had the opportunity to work with Mahdi, and I highly recommend him. If you're looking for someone who is exceptionally diligent, skilled, and proactive, Mahdi is the perfect choice.",
      'His dedication and expertise make him a valuable asset to any team—don’t miss the chance to work with him!',
    ],
  },
  {
    author: 'Parsa Yahooie',
    role: 'Game Enthusiast',
    date: 'JUL 10, 2025',
    context: 'WORKED WITH MAHDI ON DIFFERENT TEAMS',
    quote: [
      'Working with Mahdi has been a genuinely rewarding experience. He’s a standout DevOps expert with an exceptional blend of technical depth and an insatiable thirst for learning. His commitment to staying updated with the latest advancements makes him a valuable asset to any team.',
      'What makes Mahdi truly special is his personality—he’s cheerful, witty, and consistently lifts the energy of those around him. His professionalism is unwavering, and he approaches every task with precision, accountability, and care. You can always count on him to deliver.',
    ],
  },
  {
    author: 'milad golgolgla',
    role: 'Node.js Developer',
    date: 'JUL 9, 2025',
    context: 'WORKED WITH MAHDI ON THE SAME TEAM',
    quote: [
      "I had the pleasure of working with Mahdi and can confidently say he's one of the most driven and curious people I've worked with. He has a natural tendency to explore new technologies and tools on his own, and that curiosity often inspires the rest of the team to grow alongside him.",
      "Mahdi brings a lot of positive energy to the team — he's always cheerful, fun to work with, and has a great sense of humor that makes even stressful days easier to handle.",
    ],
  },
  {
    author: 'Javad Vahedi',
    role: 'Front end developer at Taline',
    date: 'JUL 9, 2025',
    context: 'WORKED WITH MAHDI ON THE SAME TEAM',
    quote: [
      'After three years of working with Mahdi, I found Mahdi a man of focus. Someone who tries to be better day by day. It could be an amazing opportunity for any team to keep Mahdi beside themselves.',
    ],
  },
] as const

export const contactDetails = [
  {
    label: 'EMAIL',
    value: 'mahdidarabi18@gmail.com',
    href: 'mailto:mahdidarabi18@gmail.com',
  },
  {
    label: 'PHONE',
    value: '+98 933 798 3009',
    href: 'tel:+989337983009',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/mahdidarabi',
    href: 'https://linkedin.com/in/mahdidarabi',
  },
  {
    label: 'LOCATION',
    value: 'Iran, Tehran, Tehran Pars',
  },
  {
    label: 'MILITARY SERVICE',
    value: 'DONE',
  },
  {
    label: 'AGE',
    value: '27',
  },
] as const

export const hardSkillGroups = [
  {
    id: 'containerization',
    label: 'CONTAINERIZATION & ORCHESTRATION',
    items: ['Docker', 'Kubernetes (RKE2, Kubespray)', 'Helm', 'Rancher'],
  },
  {
    id: 'cicd',
    label: 'CI/CD TOOLS',
    items: ['GitLab CI/CD', 'GitHub Actions', 'ArgoCD'],
  },
  {
    id: 'configuration',
    label: 'CONFIGURATION MANAGEMENT',
    items: ['Ansible'],
  },
  {
    id: 'monitoring',
    label: 'MONITORING & LOGGING',
    items: ['Prometheus', 'Grafana', 'EFK Stack'],
  },
  {
    id: 'programming',
    label: 'SCRIPTING & PROGRAMMING',
    items: ['TypeScript', 'Bash', 'Python', 'Go'],
  },
  {
    id: 'version-control',
    label: 'VERSION CONTROL',
    items: ['Git', 'GitHub / GitLab'],
  },
  {
    id: 'security',
    label: 'SECURITY',
    items: ['IAM (Keycloak)', 'Fail2Ban'],
  },
  {
    id: 'storage',
    label: 'STORAGE',
    items: ['MinIO', 'Longhorn'],
  },
  {
    id: 'backup',
    label: 'BACKUP',
    items: ['Velero'],
  },
  {
    id: 'other-tools',
    label: 'OTHER TECH & TOOLS',
    items: [
      'DevContainers',
      'Nexus Registry',
      'Nginx',
      'Squid Proxy',
      'n8n',
      'STUNner',
      'K6',
      'Trino',
    ],
  },
] as const

export const softSkills = [
  'Effective Communication',
  'Problem-Solving',
  'Collaboration & Teamwork',
  'Adaptability',
  'Time Management & Prioritization',
  'Leadership & Initiative',
  'Stress Management',
  'Continuous Improvement Mindset',
] as const

export const workExperience = [
  {
    type: 'role',
    role: 'DEVOPS ENGINEER',
    company: 'TALINE | طلاین',
    companyUrl: 'https://taline.ir',
    period: 'MAR 2026 – PRESENT',
    startDate: '2026-03-01',
    employmentType: 'FULL-TIME',
    location: 'TEHRAN, TEHRAN PROVINCE, IRAN',
    workMode: 'REMOTE',
    skills: ['Kubernetes and DevOps'],
    responsibilities: [],
  },
  {
    type: 'role',
    role: 'SENIOR DEVOPS ENGINEER',
    company: 'TECHNOLIFE',
    companyUrl: 'https://technolife.com',
    period: 'SEP 2025 – PRESENT',
    startDate: '2025-09-01',
    employmentType: 'FULL-TIME',
    location: 'TEHRAN, TEHRAN PROVINCE, IRAN',
    workMode: 'HYBRID',
    responsibilities: [],
  },
  {
    type: 'company',
    company: 'WEBLITE',
    companyUrl: 'https://weblite.me',
    total: '3 YRS 10 MOS',
    roles: [
      {
        role: 'DEVOPS CONSULTANT',
        period: 'SEP 2025 – JUN 2026',
        duration: '10 MOS',
        employmentType: 'PART-TIME',
        location: 'TEHRAN, TEHRAN PROVINCE, IRAN',
        workMode: 'REMOTE',
        responsibilities: [],
      },
      {
        role: 'DEVOPS ENGINEER',
        period: 'APR 2023 – SEP 2025',
        duration: '2 YRS 6 MOS',
        employmentType: 'FULL-TIME',
        location: 'TEHRAN, TEHRAN PROVINCE, IRAN',
        workMode: 'HYBRID',
        responsibilities: [
          'Built scalable Kubernetes infrastructure with Kubespray and managed multi-cluster environments using Rancher and RKE2.',
          'Implemented air-gapped infrastructure and an edge proxy layer with Nginx and Squid.',
          'Developed CI/CD pipelines using GitLab, ArgoCD, and GitHub Actions.',
          'Deployed Nexus Registry for Helm charts, Docker images, and NPM packages.',
          'Implemented monitoring, alerting, and logging with Prometheus, Grafana, EFK, and custom-developed tools.',
          'Automated operations with Bash, Python, and Go (DNSGo).',
          'Secured systems using Fail2Ban with Nginx log-based filtering.',
          'Implemented Kubernetes backup and restore using Velero.',
          'Led developer enablement on container-based workflows including DevPod, DevContainers, and mirrord.',
          'Enabled performance testing with K6 and Distributed K6.',
          'Implemented dynamic development environments using GitLab Review Apps with Docker Compose.',
          'Migrated services from systemd to containerized, multi-environment infrastructure.',
          'Designed highly available marketing infrastructure with load balancing, failover, and clustering.',
          'Built a complete monitoring, logging, and alerting stack using Prometheus, Grafana, Loki, and Promtail.',
          'Developed CI/CD pipelines with GitLab and Slack integration.',
          'Standardized configuration management using Ansible roles and Ansible Galaxy.',
        ],
      },
      {
        role: 'SOFTWARE ENGINEER',
        period: 'SEP 2022 – NOV 2024',
        employmentType: 'FULL-TIME',
        responsibilities: [
          'Developed an internship registration system using Nest.js with Microservice, DDD, and Hexagonal Architecture patterns, PostgreSQL, Redis, and Kubernetes.',
          'Developed core and feature microservices for Weblite IM using Nest.js, PostgreSQL, Redis, and MongoDB.',
          'Dockerized services and established a development workflow inside DevContainers.',
        ],
      },
    ],
  },
  {
    type: 'role',
    role: 'SOFTWARE ENGINEER',
    company: 'L.I.F.E.',
    period: 'JAN 2021 – JUN 2023',
    duration: '2 YRS 6 MOS',
    employmentType: 'FREELANCE',
    responsibilities: [
      'Worked as a freelancer on software projects, contributing to software design, architecture, and backend system development as a team member.',
    ],
  },
  {
    type: 'role',
    role: 'TECHNICAL SUPPORT',
    company: 'AVIZHEGROUP',
    period: 'APR 2019 – MAY 2020',
    duration: '1 YR 2 MOS',
    companyUrl: 'https://avizhegroup.com/',
    responsibilities: [
      'Resolved customer issues related to installation and training, including development and bug fixing of products when needed.',
    ],
  },
] as const

export const education = {
  degree: "BACHELOR'S OF COMPUTER ENGINEERING",
  institution: 'PAYAME NOOR UNIVERSITY',
  period: '2017 – 2021',
} as const

export const animationLines = [
  { id: 'name', text: profile.name },
  { id: 'occupation', text: profile.occupation },
] as const

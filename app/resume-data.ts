export const profile = {
  greeting: 'UNIDENTIFIED ORGANIC LIFEFORM DETECTED',
  message: 'RUNNING RESUME...',
  name: 'NAME: MAHDI DARABI',
  alias: 'KNOWN ALIAS: @mahdidarabi',
  occupation: 'OCCUPATION: DEVOPS ENGINEER / SRE',
  summary:
    'DevOps Engineer with 3+ years of experience in designing and implementing scalable infrastructure and CI/CD pipelines.',
  background:
    'Transitioned from backend development (4+ years) to DevOps, driven by a passion for solving challenges across the development-to-deployment lifecycle. Spearheaded the creation of a DevOps practice from scratch at Weblite.me, single-handedly building the platform, infrastructure, and automation workflows to meet organizational needs. Strong advocate for IaC, observability, and collaboration between development and operations teams.',
} as const

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
  { id: 'greeting', text: profile.greeting },
  { id: 'message', text: profile.message },
  { id: 'name', text: profile.name },
  { id: 'alias', text: profile.alias },
  { id: 'occupation', text: profile.occupation },
] as const

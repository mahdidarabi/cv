export const profile = {
  greeting: 'UNIDENTIFIED ORGANIC LIFEFORM DETECTED',
  message: 'RUNNING RESUME...',
  name: 'NAME: MAHDI DARABI',
  alias: 'KNOWN ALIAS: @mahdidarabi',
  occupation: 'OCCUPATION: DEVOPS ENGINEER / SRE | BACKEND DEVELOPER',
} as const

export const resumeSections = [
  {
    id: 'devops',
    label: 'DEVOPS / SRE',
    items: [
      'KUBERNETES (K8S) | DOCKER',
      'SYSTEM MONITORING',
      'CONTINUOUS INTEGRATION AND CONTINUOUS DELIVERY (CI/CD)',
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    items: [
      'NODEJS (NESTJS) | GO',
      'POSTGRESQL | REDIS',
      'MICROSERVICES | DOMAIN-DRIVEN DESIGN (DDD)',
      'APACHE KAFKA',
    ],
  },
] as const

export const animationLines = [
  { id: 'greeting', text: profile.greeting },
  { id: 'message', text: profile.message },
  { id: 'name', text: profile.name },
  { id: 'alias', text: profile.alias },
  { id: 'occupation', text: profile.occupation },
  ...resumeSections.flatMap((section) => [
    { id: `${section.id}-heading`, text: section.label },
    ...section.items.map((text, index) => ({
      id: `${section.id}-item-${index}`,
      text,
    })),
  ]),
]

export type AnimationLine = (typeof animationLines)[number]

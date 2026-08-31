'use client'

import {
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './page.module.css'
import {
  animationLines,
  contactDetails,
  education,
  hardSkillGroups,
  navigationItems,
  profile,
  projects,
  recommendations,
  softSkills,
  workExperience,
} from './resume-data'

const START_DELAY = 350
const TYPING_SPEED = 45
const LINE_DELAY = 250

type AnimationStatus = 'static' | 'typing' | 'complete'
type NavigationId = (typeof navigationItems)[number]['id']

type ExperienceRole = {
  role: string
  period: string
  duration?: string
  startDate?: string
  employmentType?: string
  location?: string
  workMode?: string
  skills?: readonly string[]
  responsibilities: readonly string[]
}

type WindowState = {
  id: NavigationId
  x: number
  y: number
  zIndex: number
  minimized: boolean
  maximized: boolean
}

const appIcons = ['◉', '@', '▣', '⌘', '✦', '⚙', '◇', '▤']

function getFullVisibility() {
  return Object.fromEntries(
    animationLines.map((line) => [line.id, line.text.length]),
  )
}

function formatDuration(startDate: string, currentDate: Date) {
  const start = new Date(`${startDate}T00:00:00`)
  const months =
    (currentDate.getFullYear() - start.getFullYear()) * 12 +
    currentDate.getMonth() -
    start.getMonth() +
    1
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const parts = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'YR' : 'YRS'}`)
  }
  if (remainingMonths > 0 || parts.length === 0) {
    parts.push(`${remainingMonths} MOS`)
  }

  return parts.join(' ')
}

function getRoleDuration(
  role: ExperienceRole,
  currentDate: Date | null,
) {
  if (role.startDate && currentDate) {
    return formatDuration(role.startDate, currentDate)
  }
  return role.duration
}

function AnimatedText({
  id,
  text,
  visibleChars,
  isActive,
}: {
  id: string
  text: string
  visibleChars: Record<string, number>
  isActive: boolean
}) {
  const visibleText = text.slice(0, visibleChars[id] ?? 0)
  const isIncomplete = visibleText.length < text.length

  return (
    <>
      {visibleText}
      {isActive && isIncomplete && (
        <span className={styles.cursor} aria-hidden="true">
          _
        </span>
      )}
    </>
  )
}

function SectionTitle({ children, id }: { children: ReactNode; id: string }) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      <span className={styles.sectionMarker} aria-hidden="true">
        ▸
      </span>
      {children}
    </h2>
  )
}

function CompanyName({ name, url }: { name: string; url?: string }) {
  if (!url) return name

  return (
    <a
      className={styles.companyLink}
      href={url}
      rel="noreferrer"
      target="_blank"
    >
      {name}
    </a>
  )
}

function ExperienceMeta({
  period,
  duration,
  employmentType,
  location,
  workMode,
}: {
  period: string
  duration?: string
  employmentType?: string
  location?: string
  workMode?: string
}) {
  return (
    <p className={styles.experienceMeta}>
      {[employmentType, period, duration, location, workMode]
        .filter(Boolean)
        .join(' · ')}
    </p>
  )
}

function ExperienceRole({
  role,
  currentDate,
}: {
  role: ExperienceRole
  currentDate: Date | null
}) {
  return (
    <article className={styles.experienceItem}>
      <h3>{role.role}</h3>
      <ExperienceMeta
        period={role.period}
        duration={getRoleDuration(role, currentDate)}
        employmentType={role.employmentType}
        location={role.location}
        workMode={role.workMode}
      />
      {role.skills && (
        <p className={styles.experienceSkills}>{role.skills.join(' · ')}</p>
      )}
      {role.responsibilities.length > 0 && (
        <ul className={styles.responsibilityList}>
          {role.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function TerminalResume() {
  const [visibleChars, setVisibleChars] = useState<Record<string, number>>(
    getFullVisibility,
  )
  const [status, setStatus] = useState<AnimationStatus>('static')
  const [activeLineId, setActiveLineId] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [topZIndex, setTopZIndex] = useState(10)
  const timersRef = useRef<number[]>([])
  const dragRef = useRef<{
    id: NavigationId
    offsetX: number
    offsetY: number
  } | null>(null)

  const stopAnimation = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => {
    let lineIndex = 0
    let characterIndex = 0
    let cancelled = false

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay)
      timersRef.current.push(timer)
    }

    const revealNextCharacter = () => {
      if (cancelled) return

      const line = animationLines[lineIndex]
      if (!line) {
        setActiveLineId(null)
        setStatus('complete')
        return
      }

      setActiveLineId(line.id)

      if (characterIndex < line.text.length) {
        characterIndex += 1
        setVisibleChars((current) => ({
          ...current,
          [line.id]: characterIndex,
        }))
        schedule(revealNextCharacter, TYPING_SPEED)
        return
      }

      lineIndex += 1
      characterIndex = 0
      schedule(revealNextCharacter, LINE_DELAY)
    }

    setStatus('typing')
    setVisibleChars({})
    setActiveLineId(null)
    schedule(revealNextCharacter, START_DELAY)

    return () => {
      cancelled = true
      stopAnimation()
    }
  }, [stopAnimation])

  useEffect(() => {
    const updateCurrentDate = () => setCurrentDate(new Date())
    updateCurrentDate()
    const interval = window.setInterval(updateCurrentDate, 60 * 60 * 1000)

    return () => window.clearInterval(interval)
  }, [])

  const bringToFront = (id: NavigationId) => {
    setTopZIndex((current) => current + 1)
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? { ...windowState, zIndex: topZIndex + 1, minimized: false }
          : windowState,
      ),
    )
  }

  const openApplication = (id: NavigationId) => {
    const existingWindow = windows.find((windowState) => windowState.id === id)
    if (existingWindow) {
      bringToFront(id)
      return
    }

    const offset = windows.length * 28
    const nextZIndex = topZIndex + 1
    setTopZIndex(nextZIndex)
    setWindows((current) => [
      ...current,
      {
        id,
        x: 90 + offset,
        y: 82 + offset,
        zIndex: nextZIndex,
        minimized: false,
        maximized: false,
      },
    ])
  }

  const closeApplication = (id: NavigationId) => {
    setWindows((current) =>
      current.filter((windowState) => windowState.id !== id),
    )
  }

  const minimizeApplication = (id: NavigationId) => {
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? { ...windowState, minimized: true }
          : windowState,
      ),
    )
  }

  const toggleMaximize = (id: NavigationId) => {
    bringToFront(id)
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? { ...windowState, maximized: !windowState.maximized }
          : windowState,
      ),
    )
  }

  const startDragging = (
    event: PointerEvent<HTMLDivElement>,
    windowState: WindowState,
  ) => {
    if (windowState.maximized || (event.target as HTMLElement).closest('button')) {
      return
    }

    dragRef.current = {
      id: windowState.id,
      offsetX: event.clientX - windowState.x,
      offsetY: event.clientY - windowState.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    bringToFront(windowState.id)
  }

  const dragWindow = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return

    const { id, offsetX, offsetY } = dragRef.current
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? {
              ...windowState,
              x: Math.max(12, event.clientX - offsetX),
              y: Math.max(48, event.clientY - offsetY),
            }
          : windowState,
      ),
    )
  }

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    dragRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const renderApplication = (id: NavigationId) => {
    switch (id) {
      case 'about':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>ABOUT</SectionTitle>
            <p className={styles.summary}>{profile.summary}</p>
            <p className={styles.summary}>{profile.background}</p>
          </>
        )
      case 'contact':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>CONTACT &amp; DETAILS</SectionTitle>
            <dl className={styles.contactGrid}>
              {contactDetails.map((detail) => (
                <div className={styles.contactItem} key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>
                    {'href' in detail ? (
                      <a href={detail.href}>{detail.value}</a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )
      case 'experience':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>WORK EXPERIENCE</SectionTitle>
            <div className={styles.experienceList}>
              {workExperience.map((experience) =>
                experience.type === 'company' ? (
                  <article className={styles.companyGroup} key={experience.company}>
                    <div className={styles.experienceHeader}>
                      <h3>
                        <CompanyName
                          name={experience.company}
                          url={experience.companyUrl}
                        />
                      </h3>
                      <p>{experience.total}</p>
                    </div>
                    <div className={styles.companyRoles}>
                      {experience.roles.map((role) => (
                        <ExperienceRole
                          key={`${experience.company}-${role.role}-${role.period}`}
                          role={role}
                          currentDate={currentDate}
                        />
                      ))}
                    </div>
                  </article>
                ) : (
                  <article
                    className={styles.companyGroup}
                    key={`${experience.company}-${experience.role}`}
                  >
                    <div className={styles.experienceHeader}>
                      <h3>
                        <CompanyName
                          name={experience.company}
                          url={
                            'companyUrl' in experience
                              ? experience.companyUrl
                              : undefined
                          }
                        />
                      </h3>
                      {getRoleDuration(experience, currentDate) && (
                        <p>{getRoleDuration(experience, currentDate)}</p>
                      )}
                    </div>
                    <div className={styles.companyRoles}>
                      <ExperienceRole
                        role={experience}
                        currentDate={currentDate}
                      />
                    </div>
                  </article>
                ),
              )}
            </div>
          </>
        )
      case 'projects':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>PROJECTS</SectionTitle>
            <div className={styles.projectList}>
              {projects.map((project) => (
                <a
                  className={styles.projectCard}
                  href={project.url}
                  key={project.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className={styles.projectHeader}>
                    <h3>{project.name}</h3>
                    <span>GITHUB ↗</span>
                  </div>
                  <p>{project.description}</p>
                  <code>{project.url.replace('https://', '')}</code>
                </a>
              ))}
            </div>
          </>
        )
      case 'recommendations':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>RECOMMENDATIONS</SectionTitle>
            <div className={styles.recommendationList}>
              {recommendations.map((recommendation) => (
                <article
                  className={styles.recommendationCard}
                  key={`${recommendation.author}-${recommendation.date}`}
                >
                  <header className={styles.recommendationHeader}>
                    <div>
                      <h3>
                        <a
                          className={styles.recommenderLink}
                          href={recommendation.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {recommendation.author}
                        </a>
                      </h3>
                      <p>{recommendation.role}</p>
                    </div>
                    <time>{recommendation.date}</time>
                  </header>
                  <p className={styles.recommendationContext}>
                    {recommendation.context}
                  </p>
                  <div className={styles.recommendationQuote}>
                    {recommendation.quote.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        )
      case 'hard-skills':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>HARD SKILLS</SectionTitle>
            <div className={styles.skillGroups}>
              {hardSkillGroups.map((group) => (
                <div className={styles.skillGroup} key={group.id}>
                  <h3>{group.label}</h3>
                  <ul className={styles.skillList}>
                    {group.items.map((skill) => (
                      <li className={styles.skillItem} key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )
      case 'soft-skills':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>SOFT SKILLS</SectionTitle>
            <ul className={styles.softSkillList}>
              {softSkills.map((skill) => (
                <li className={styles.skillItem} key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </>
        )
      case 'education':
        return (
          <>
            <SectionTitle id={`${id}-heading`}>EDUCATION</SectionTitle>
            <div className={styles.educationItem}>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <span>{education.period}</span>
            </div>
          </>
        )
    }
  }

  return (
    <div className={styles.desktop}>
      <header className={styles.desktopBar}>
        <span>MD7 OS</span>
        <span>DEVOPS ENGINEER / SRE</span>
        <span>{currentDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </header>

      <div className={styles.desktopIcons}>
        {navigationItems.map((item, index) => (
          <button
            className={styles.desktopIcon}
            type="button"
            key={item.id}
            onClick={() => openApplication(item.id)}
          >
            <span className={styles.desktopIconGlyph}>{appIcons[index]}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <section className={styles.desktopIdentity} aria-label="Identity">
        <p className={styles.heroLabel}>WELCOME TO MY WORKSPACE</p>
        <h1 className={styles.desktopName}>
          <AnimatedText
            id="name"
            text={profile.name}
            visibleChars={visibleChars}
            isActive={status === 'typing' && activeLineId === 'name'}
          />
        </h1>
        <p className={styles.desktopOccupation}>
          <AnimatedText
            id="occupation"
            text={profile.occupation}
            visibleChars={visibleChars}
            isActive={status === 'typing' && activeLineId === 'occupation'}
          />
        </p>
      </section>

      <div className={styles.windowLayer}>
        {windows.map((windowState) => {
          const label = navigationItems.find((item) => item.id === windowState.id)?.label

          return (
            <section
              className={`${styles.appWindow} ${
                windowState.maximized ? styles.maximized : ''
              } ${windowState.minimized ? styles.minimized : ''}`}
              key={windowState.id}
              style={{
                left: windowState.x,
                top: windowState.y,
                zIndex: windowState.zIndex,
              }}
              aria-label={`${label} terminal`}
            >
              <div
                className={styles.windowTitleBar}
                onPointerDown={(event) => startDragging(event, windowState)}
                onPointerMove={dragWindow}
                onPointerUp={stopDragging}
              >
                <span className={styles.windowTitle}>
                  <span className={styles.windowPrompt}>$</span>
                  TERMINAL — {label}
                </span>
                <div className={styles.windowControls}>
                  <button
                    type="button"
                    aria-label={`Minimize ${label}`}
                    onClick={() => minimizeApplication(windowState.id)}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    aria-label={`${windowState.maximized ? 'Restore' : 'Maximize'} ${label}`}
                    onClick={() => toggleMaximize(windowState.id)}
                  >
                    {windowState.maximized ? '◇' : '□'}
                  </button>
                  <button
                    type="button"
                    aria-label={`Close ${label}`}
                    onClick={() => closeApplication(windowState.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className={styles.windowContent}>{renderApplication(windowState.id)}</div>
            </section>
          )
        })}
      </div>

      <footer className={styles.dock} aria-label="Application dock">
        <span className={styles.dockBrand}>⌘</span>
        {windows.map((windowState) => {
          const label = navigationItems.find((item) => item.id === windowState.id)?.label

          return (
            <button
              className={`${styles.dockApp} ${
                !windowState.minimized ? styles.dockAppActive : ''
              }`}
              type="button"
              key={windowState.id}
              onClick={() => openApplication(windowState.id)}
              aria-label={`Open ${label}`}
            >
              {label}
            </button>
          )
        })}
      </footer>
    </div>
  )
}

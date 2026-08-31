'use client'

import {
  type KeyboardEvent,
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
  const [selectedView, setSelectedView] = useState<NavigationId | null>(null)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const timersRef = useRef<number[]>([])
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

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

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        target.closest('[data-resume-tabs]')
      ) {
        return
      }

      const currentIndex = buttonRefs.current.findIndex(
        (button) => button === document.activeElement,
      )
      const focusedIndex = currentIndex >= 0 ? currentIndex : 0

      if (/^\d$/.test(event.key)) {
        const selectedIndex = Number(event.key) - 1
        if (selectedIndex < 0 || selectedIndex >= navigationItems.length) return
        setSelectedView(navigationItems[selectedIndex].id)
        buttonRefs.current[selectedIndex]?.focus()
        return
      }

      if (event.key === 'Escape') {
        setSelectedView(null)
        buttonRefs.current[focusedIndex]?.focus()
        return
      }

      let nextIndex = focusedIndex
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (focusedIndex + 1) % navigationItems.length
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex =
          (focusedIndex - 1 + navigationItems.length) % navigationItems.length
      } else if (event.key === 'Home') {
        nextIndex = 0
      } else if (event.key === 'End') {
        nextIndex = navigationItems.length - 1
      } else {
        return
      }

      event.preventDefault()
      setSelectedView(navigationItems[nextIndex].id)
      buttonRefs.current[nextIndex]?.focus()
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = buttonRefs.current.findIndex(
      (button) => button === document.activeElement,
    )
    const focusedIndex = currentIndex >= 0 ? currentIndex : 0
    let nextIndex = focusedIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (focusedIndex + 1) % navigationItems.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex =
        (focusedIndex - 1 + navigationItems.length) % navigationItems.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = navigationItems.length - 1
    } else if (event.key === 'Escape') {
      setSelectedView(null)
      buttonRefs.current[focusedIndex]?.focus()
      return
    } else {
      return
    }

    event.preventDefault()
    setSelectedView(navigationItems[nextIndex].id)
    buttonRefs.current[nextIndex]?.focus()
  }

  const selectView = (id: NavigationId, index: number) => {
    setSelectedView(id)
    buttonRefs.current[index]?.focus()
  }

  const selectedLabel = navigationItems.find(
    (item) => item.id === selectedView,
  )?.label

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'about':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">ABOUT</SectionTitle>
            <p className={styles.summary}>{profile.summary}</p>
            <p className={styles.summary}>{profile.background}</p>
          </section>
        )
      case 'contact':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">CONTACT &amp; DETAILS</SectionTitle>
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
          </section>
        )
      case 'experience':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">WORK EXPERIENCE</SectionTitle>
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
                  <article className={styles.companyGroup} key={`${experience.company}-${experience.role}`}>
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
          </section>
        )
      case 'projects':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">PROJECTS</SectionTitle>
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
          </section>
        )
      case 'recommendations':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">RECOMMENDATIONS</SectionTitle>
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
          </section>
        )
      case 'hard-skills':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">HARD SKILLS</SectionTitle>
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
          </section>
        )
      case 'soft-skills':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">SOFT SKILLS</SectionTitle>
            <ul className={styles.softSkillList}>
              {softSkills.map((skill) => (
                <li className={styles.skillItem} key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )
      case 'education':
        return (
          <section className={styles.viewSection} aria-labelledby="view-heading">
            <SectionTitle id="view-heading">EDUCATION</SectionTitle>
            <div className={styles.educationItem}>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <span>{education.period}</span>
            </div>
          </section>
        )
      default:
        return null
    }
  }

  const isTyping = status === 'typing'

  return (
    <article className={styles.resume} aria-label="Mahdi Darabi CV">
      <header className={styles.hero}>
        <p className={styles.heroLabel}>IDENTITY PROTOCOL // MD7</p>
        <h1 className={styles.name}>
          <AnimatedText
            id="name"
            text={profile.name}
            visibleChars={visibleChars}
            isActive={isTyping && activeLineId === 'name'}
          />
        </h1>
        <p className={styles.occupation}>
          <AnimatedText
            id="occupation"
            text={profile.occupation}
            visibleChars={visibleChars}
            isActive={isTyping && activeLineId === 'occupation'}
          />
        </p>
      </header>

      <nav
        className={styles.tabBar}
        aria-label="Resume sections"
        data-resume-tabs="true"
      >
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="Resume sections"
          onKeyDown={handleTabKeyDown}
        >
          {navigationItems.map((item, index) => (
            <button
              className={`${styles.tab} ${
                selectedView === item.id ? styles.selected : ''
              }`}
              type="button"
              role="tab"
              aria-controls="selected-content"
              aria-selected={selectedView === item.id}
              id={`tab-${item.id}`}
              tabIndex={
                selectedView === item.id || (selectedView === null && index === 0)
                  ? 0
                  : -1
              }
              key={item.id}
              ref={(button) => {
                buttonRefs.current[index] = button
              }}
              onClick={() => selectView(item.id, index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div
        id="selected-content"
        className={styles.selectedPanel}
        aria-live="polite"
        aria-label={selectedLabel ? `Selected ${selectedLabel}` : undefined}
      >
        {selectedView ? (
          <>
            <div className={styles.selectedHeader}>
              <span>SELECTED: {selectedLabel}</span>
              <button
                className={styles.closeButton}
                type="button"
                onClick={() => setSelectedView(null)}
              >
                ESC / BACK
              </button>
            </div>
            {renderSelectedView()}
          </>
        ) : (
          <p className={styles.emptyState}>
            SELECT A MODULE TO LOAD RESUME DATA<span className={styles.cursor}>_</span>
          </p>
        )}
      </div>
    </article>
  )
}

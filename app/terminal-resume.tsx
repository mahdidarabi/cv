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
const DESKTOP_STATE_KEY = 'mahdi-cv-desktop-state'

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

type IconPosition = {
  x: number
  y: number
}

const appIconPaths = [
  'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0H4Z',
  'M3 5h18v14H3V5Zm2 2v10h14V7H5Zm0 0 7 5 7-5H5Z',
  'M7 7V5h10v2h4v13H3V7h4Zm2 0h6V6H9v1Z',
  'M3 5h6l2 2h10v12H3V5Z',
  'M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  'M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42L9.12 5.07c-.61.25-1.18.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.18-.58 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z',
  'M12 21s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 3.5C20 16.3 12 21 12 21Z',
  'M2 9 12 4l10 5-10 5L2 9Zm4 3.2V16c3 2.7 9 2.7 12 0v-3.8l-6 3-6-3Z',
] as const

function ApplicationIcon({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.desktopIconSvg}
      viewBox="0 0 24 24"
    >
      <path
        d={appIconPaths[index]}
        fillRule={index === 5 ? 'evenodd' : 'nonzero'}
      />
    </svg>
  )
}

function isNavigationId(value: unknown): value is NavigationId {
  return navigationItems.some((item) => item.id === value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function getInitialIconPositions(): Record<NavigationId, IconPosition> {
  return navigationItems.reduce(
    (positions, item, index) => {
      positions[item.id] = {
        x: 20 + (index % 2) * 104,
        y: 24 + Math.floor(index / 2) * 100,
      }
      return positions
    },
    {} as Record<NavigationId, IconPosition>,
  )
}

function getWindowBounds() {
  const width = Math.min(720, window.innerWidth - 24)
  const height = Math.min(680, window.innerHeight - 130)

  return {
    maxX: Math.max(12, window.innerWidth - width - 12),
    maxY: Math.max(12, window.innerHeight - 40 - height - 62),
  }
}

function getInitialWindowPosition(index: number) {
  if (window.innerWidth <= 700) {
    return { x: 12, y: 12 }
  }

  return {
    x: 90 + index * 28,
    y: 82 + index * 28,
  }
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
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [topZIndex, setTopZIndex] = useState(10)
  const [iconPositions, setIconPositions] = useState<
    Record<NavigationId, IconPosition>
  >(getInitialIconPositions)
  const [hasRestoredState, setHasRestoredState] = useState(false)
  const timersRef = useRef<number[]>([])
  const dragRef = useRef<{
    id: NavigationId
    offsetX: number
    offsetY: number
  } | null>(null)
  const iconDragRef = useRef<{
    id: NavigationId
    offsetX: number
    offsetY: number
    parentLeft: number
    parentTop: number
    startClientX: number
    startClientY: number
    moved: boolean
  } | null>(null)
  const suppressIconClickRef = useRef<NavigationId | null>(null)

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
    const interval = window.setInterval(updateCurrentDate, 1000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    try {
      const savedState = window.localStorage.getItem(DESKTOP_STATE_KEY)
      if (!savedState) {
        setHasRestoredState(true)
        return
      }

      const parsedState = JSON.parse(savedState) as {
        windows?: unknown
        iconPositions?: Record<string, unknown>
        topZIndex?: unknown
      }

      if (Array.isArray(parsedState.windows)) {
        const bounds = getWindowBounds()
        const restoredWindows = parsedState.windows
          .filter(
            (windowState): windowState is Record<string, unknown> =>
              typeof windowState === 'object' && windowState !== null,
          )
          .filter((windowState) => isNavigationId(windowState.id))
          .map((windowState, index) => ({
            id: windowState.id as NavigationId,
            x: Math.min(
              bounds.maxX,
              Math.max(
                12,
                isFiniteNumber(windowState.x)
                  ? windowState.x
                  : getInitialWindowPosition(index).x,
              ),
            ),
            y: Math.min(
              bounds.maxY,
              Math.max(
                12,
                isFiniteNumber(windowState.y)
                  ? windowState.y
                  : getInitialWindowPosition(index).y,
              ),
            ),
            zIndex:
              isFiniteNumber(windowState.zIndex)
                ? windowState.zIndex
                : 10 + index,
            minimized: windowState.minimized === true,
            maximized: windowState.maximized === true,
          }))
        setWindows(restoredWindows)
      }

      if (
        parsedState.iconPositions &&
        typeof parsedState.iconPositions === 'object'
      ) {
        const restoredPositions = getInitialIconPositions()
        navigationItems.forEach((item) => {
          const position = parsedState.iconPositions?.[item.id]
          if (
            typeof position === 'object' &&
            position !== null &&
            'x' in position &&
            'y' in position &&
            isFiniteNumber(position.x) &&
            isFiniteNumber(position.y)
          ) {
            restoredPositions[item.id] = {
              x: position.x,
              y: position.y,
            }
          }
        })
        setIconPositions(restoredPositions)
      }

      if (
        typeof parsedState.topZIndex === 'number' &&
        Number.isFinite(parsedState.topZIndex)
      ) {
        setTopZIndex(parsedState.topZIndex)
      }
    } catch {
      window.localStorage.removeItem(DESKTOP_STATE_KEY)
    } finally {
      setHasRestoredState(true)
    }
  }, [])

  useEffect(() => {
    if (!hasRestoredState) return

    window.localStorage.setItem(
      DESKTOP_STATE_KEY,
      JSON.stringify({ windows, iconPositions, topZIndex }),
    )
  }, [hasRestoredState, iconPositions, topZIndex, windows])

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
    const initialPosition = getInitialWindowPosition(windows.length)
    const bounds = getWindowBounds()
    const nextZIndex = topZIndex + 1
    setTopZIndex(nextZIndex)
    setWindows((current) => [
      ...current,
      {
        id,
        x: Math.min(bounds.maxX, initialPosition.x + (window.innerWidth <= 700 ? 0 : offset)),
        y: Math.min(bounds.maxY, initialPosition.y + (window.innerWidth <= 700 ? 0 : offset)),
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

    const layerRect =
      event.currentTarget.parentElement?.parentElement?.getBoundingClientRect()
    dragRef.current = {
      id: windowState.id,
      offsetX: event.clientX - (layerRect?.left ?? 0) - windowState.x,
      offsetY: event.clientY - (layerRect?.top ?? 0) - windowState.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    bringToFront(windowState.id)
  }

  const dragWindow = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return

    const { id, offsetX, offsetY } = dragRef.current
    const windowElement = event.currentTarget.parentElement
    const windowRect = windowElement?.getBoundingClientRect()
    const layerRect = windowElement?.parentElement?.getBoundingClientRect()
    const maxX = Math.max(12, window.innerWidth - (windowRect?.width ?? 720) - 12)
    const maxY = Math.max(
      12,
      window.innerHeight - 40 - (windowRect?.height ?? 680) - 62,
    )
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? {
              ...windowState,
              x: Math.min(
                maxX,
                Math.max(
                  12,
                  event.clientX - (layerRect?.left ?? 0) - offsetX,
                ),
              ),
              y: Math.min(
                maxY,
                Math.max(
                  12,
                  event.clientY - (layerRect?.top ?? 40) - offsetY,
                ),
              ),
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

  const startDraggingIcon = (
    event: PointerEvent<HTMLButtonElement>,
    id: NavigationId,
  ) => {
    const iconRect = event.currentTarget.getBoundingClientRect()
    const parentRect = event.currentTarget.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    suppressIconClickRef.current = null
    iconDragRef.current = {
      id,
      offsetX: event.clientX - iconRect.left,
      offsetY: event.clientY - iconRect.top,
      parentLeft: parentRect.left,
      parentTop: parentRect.top,
      startClientX: event.clientX,
      startClientY: event.clientY,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const dragIcon = (event: PointerEvent<HTMLButtonElement>) => {
    const iconDrag = iconDragRef.current
    if (!iconDrag) return

    const distance = Math.hypot(
      event.clientX - iconDrag.startClientX,
      event.clientY - iconDrag.startClientY,
    )
    if (!iconDrag.moved && distance < 4) return

    iconDrag.moved = true
    const parentRect = event.currentTarget.parentElement?.getBoundingClientRect()
    const iconRect = event.currentTarget.getBoundingClientRect()
    const maxX = Math.max(8, (parentRect?.width ?? window.innerWidth) - iconRect.width)
    const maxY = Math.max(
      8,
      (parentRect?.height ?? window.innerHeight) - iconRect.height,
    )
    setIconPositions((current) => ({
      ...current,
      [iconDrag.id]: {
        x: Math.min(
          maxX,
          Math.max(8, event.clientX - iconDrag.parentLeft - iconDrag.offsetX),
        ),
        y: Math.min(
          maxY,
          Math.max(8, event.clientY - iconDrag.parentTop - iconDrag.offsetY),
        ),
      },
    }))
  }

  const stopDraggingIcon = (event: PointerEvent<HTMLButtonElement>) => {
    const iconDrag = iconDragRef.current
    if (!iconDrag) return

    if (iconDrag.moved) {
      suppressIconClickRef.current = iconDrag.id
    }
    iconDragRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const openFromIcon = (id: NavigationId) => {
    if (suppressIconClickRef.current === id) {
      suppressIconClickRef.current = null
      return
    }
    openApplication(id)
  }

  const resetDesktop = () => {
    setWindows([])
    setIconPositions(getInitialIconPositions())
    setTopZIndex(10)
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
        <div className={styles.desktopBarActions}>
          <span>
            {currentDate?.toLocaleTimeString([], {
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
          <button
            className={styles.resetButton}
            type="button"
            onClick={resetDesktop}
          >
            RESET DESKTOP
          </button>
        </div>
      </header>

      <div className={styles.desktopIcons}>
        {navigationItems.map((item, index) => (
          <button
            className={styles.desktopIcon}
            type="button"
            key={item.id}
            style={{
              left: iconPositions[item.id].x,
              top: iconPositions[item.id].y,
            }}
            onClick={() => openFromIcon(item.id)}
            onPointerDown={(event) => startDraggingIcon(event, item.id)}
            onPointerMove={dragIcon}
            onPointerUp={stopDraggingIcon}
            onPointerCancel={stopDraggingIcon}
          >
            <span className={styles.desktopIconGlyph}>
              <ApplicationIcon index={index} />
            </span>
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

      <div className={styles.dockArea}>
        <span
          className={styles.dockBrand}
          role="img"
          aria-label="MD7"
        />
        {windows.length > 0 && (
          <footer className={styles.dock} aria-label="Application dock">
            {windows.map((windowState) => {
              const label = navigationItems.find(
                (item) => item.id === windowState.id,
              )?.label

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
        )}
      </div>
    </div>
  )
}

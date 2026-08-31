'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { animationLines, profile, resumeSections } from './resume-data'

const START_DELAY = 350
const TYPING_SPEED = 28
const LINE_DELAY = 220

type AnimationStatus = 'static' | 'loading' | 'typing' | 'complete'

function getFullVisibility() {
  return Object.fromEntries(
    animationLines.map((line) => [line.id, line.text.length]),
  )
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

export default function TerminalResume() {
  const [visibleChars, setVisibleChars] = useState<Record<string, number>>(
    getFullVisibility,
  )
  const [status, setStatus] = useState<AnimationStatus>('static')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeLineId, setActiveLineId] = useState<string | null>(null)
  const timersRef = useRef<number[]>([])

  const stopAnimation = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  const skipAnimation = useCallback(() => {
    stopAnimation()
    setVisibleChars(getFullVisibility())
    setActiveLineId(null)
    setStatus('complete')
  }, [stopAnimation])

  useEffect(() => {
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    if (motionPreference.matches) {
      setReducedMotion(true)
      setActiveLineId(null)
      setStatus('complete')
      return
    }

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

    setStatus('loading')
    setVisibleChars({})
    setActiveLineId(null)
    schedule(() => {
      setStatus('typing')
      revealNextCharacter()
    }, START_DELAY)

    return () => {
      cancelled = true
      stopAnimation()
    }
  }, [stopAnimation])

  useEffect(() => {
    if (status !== 'loading' && status !== 'typing') return

    const frame = window.requestAnimationFrame(() => {
      const terminalContent = document.querySelector('.terminal-content')
      terminalContent?.scrollTo({
        top: terminalContent.scrollHeight,
        behavior: 'auto',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [status, visibleChars])

  const isTyping = status === 'typing'

  return (
    <article className={styles.resume} aria-label="Mahdi Darabi CV">
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>SESSION: MD7</span>
        <button
          className={styles.skipButton}
          type="button"
          onClick={skipAnimation}
          disabled={status === 'complete' || reducedMotion}
        >
          {reducedMotion ? 'STATIC MODE' : 'SKIP ANIMATION'}
        </button>
      </div>

      {status === 'loading' && (
        <p className={styles.loadingMessage} role="status">
          RUNNING IDENTITY PROTOCOL<span aria-hidden="true">...</span>
        </p>
      )}

      <div className={styles.output}>
        <p className={styles.greeting}>
          <AnimatedText
            id="greeting"
            text={profile.greeting}
            visibleChars={visibleChars}
            isActive={isTyping && activeLineId === 'greeting'}
          />
        </p>
        <p className={styles.message}>
          <AnimatedText
            id="message"
            text={profile.message}
            visibleChars={visibleChars}
            isActive={isTyping && activeLineId === 'message'}
          />
        </p>

        <div className={styles.identity}>
          <h1 className={styles.name}>
            <AnimatedText
              id="name"
              text={profile.name}
              visibleChars={visibleChars}
              isActive={isTyping && activeLineId === 'name'}
            />
          </h1>
          <p className={styles.identityLine}>
            <AnimatedText
              id="alias"
              text={profile.alias}
              visibleChars={visibleChars}
              isActive={isTyping && activeLineId === 'alias'}
            />
          </p>
          <p className={styles.identityLine}>
            <AnimatedText
              id="occupation"
              text={profile.occupation}
              visibleChars={visibleChars}
              isActive={isTyping && activeLineId === 'occupation'}
            />
          </p>
        </div>

        <div className={styles.sections}>
          {resumeSections.map((section) => (
            <section
              className={styles.resumeSection}
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <h2 id={`${section.id}-heading`} className={styles.sectionTitle}>
                <span className={styles.sectionMarker} aria-hidden="true">
                  ▸
                </span>
                <AnimatedText
                  id={`${section.id}-heading`}
                  text={section.label}
                  visibleChars={visibleChars}
                  isActive={
                    isTyping && activeLineId === `${section.id}-heading`
                  }
                />
              </h2>
              <ul className={styles.skillList}>
                {section.items.map((item, index) => (
                  <li className={styles.skillItem} key={item}>
                    <AnimatedText
                      id={`${section.id}-item-${index}`}
                      text={item}
                      visibleChars={visibleChars}
                      isActive={
                        isTyping &&
                        activeLineId === `${section.id}-item-${index}`
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <p className={styles.screenReaderStatus} aria-live="polite">
        {status === 'complete'
          ? 'Resume loaded.'
          : status === 'loading'
            ? 'Loading resume.'
            : ''}
      </p>
    </article>
  )
}

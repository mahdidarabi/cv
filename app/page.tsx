'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './page.module.css'

const DATA = {
  greeting: 'UNIDENTIFIED ORGANIC LIFEFORM DETECTED ',
  message: 'RUNNING RESUME... ',
  name: 'NAME: MAHDI DARABI ',
  alias: 'KNOWN ALIAS: @mahdidarabi ',
  occupation: 'OCCUPATION: DEVOPS ENGINEER / SRE | BACKEND DEVELOPER ',
  devops: 'DEVOPS/SRE: ',
  devops1: 'KUBERNETES (K8S) | DOCKER ',
  devops2: 'SYSTEM MONITORING ',
  devops3: 'CONTINUOUS INTEGRATION AND CONTINUOUS DELIVERY (CI/CD) ',
  back: 'BACKEND: ',
  back1: 'NODEJS (NESTJS) | GO ',
  back2: 'POSTGRESQL | REDIS ',
  back3: 'MICROSERVICES | DOMAIN-DRIVEN DESIGN (DDD) ',
  back4: 'APACHE KAFKA ',
}

const DELAY = 300
const TYPING_SPEED = 35

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingDots, setLoadingDots] = useState('')
  const [greeting, setGreeting] = useState('')
  const [message, setMessage] = useState('')
  const [showLoadingMessage2, setShowLoadingMessage2] = useState(false)
  const [alphaLoading, setAlphaLoading] = useState('')
  const [name, setName] = useState('')
  const [alias, setAlias] = useState('')
  const [occupation, setOccupation] = useState('')
  const [devops, setDevops] = useState('')
  const [devops1, setDevops1] = useState('')
  const [devops2, setDevops2] = useState('')
  const [devops3, setDevops3] = useState('')
  const [back, setBack] = useState('')
  const [back1, setBack1] = useState('')
  const [back2, setBack2] = useState('')
  const [back3, setBack3] = useState('')
  const [back4, setBack4] = useState('')
  const [showCursor, setShowCursor] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial loading dots animation
    const loadingInterval = setInterval(() => {
      setLoadingDots((prev: string) => {
        if (prev.length === 5) return ''
        return prev + '.'
      })
    }, 100)

    // Hide loading message after delay
    const hideLoadingTimeout = setTimeout(() => {
      clearInterval(loadingInterval)
      setLoading(false)
    }, DELAY)

    return () => {
      clearInterval(loadingInterval)
      clearTimeout(hideLoadingTimeout)
    }
  }, [])

  const typeText = useCallback((
    field: string,
    text: string,
    onComplete: () => void,
    index = 0
  ) => {
    if (index < text.length) {
      setShowCursor((prev: Record<string, boolean>) => ({ ...prev, [field]: true }))
      const setters: Record<string, (val: string) => void> = {
        greeting: setGreeting,
        message: setMessage,
        name: setName,
        alias: setAlias,
        occupation: setOccupation,
        devops: setDevops,
        devops1: setDevops1,
        devops2: setDevops2,
        devops3: setDevops3,
        back: setBack,
        back1: setBack1,
        back2: setBack2,
        back3: setBack3,
        back4: setBack4,
      }

      const setter = setters[field]
      if (setter) {
        setter(text.substring(0, index + 1))
      }

      setTimeout(() => {
        typeText(field, text, onComplete, index + 1)
      }, TYPING_SPEED)
    } else {
      setShowCursor((prev: Record<string, boolean>) => ({ ...prev, [field]: false }))
      onComplete()
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      // Start the main animation sequence
      const startAnimation = () => {
        typeText('greeting', DATA.greeting, () => {
          typeText('message', DATA.message, () => {
            setShowLoadingMessage2(true)
            // Alpha loading dots
            const alphaInterval = setInterval(() => {
              setAlphaLoading((prev: string) => {
                if (prev.length === 6) {
                  clearInterval(alphaInterval)
                  setTimeout(() => {
                    setShowLoadingMessage2(false)
                  }, 2000)
                  return ''
                }
                return prev + '.'
              })
            }, 350)

            setTimeout(() => {
              typeText('name', DATA.name, () => {
                setTimeout(() => {
                  typeText('alias', DATA.alias, () => {
                    setTimeout(() => {
                      typeText('occupation', DATA.occupation, () => {
                        setTimeout(() => {
                          typeText('devops', DATA.devops, () => {
                            setTimeout(() => {
                              typeText('devops1', DATA.devops1, () => {
                                setTimeout(() => {
                                  typeText('devops2', DATA.devops2, () => {
                                    setTimeout(() => {
                                      typeText('devops3', DATA.devops3, () => {
                                        setTimeout(() => {
                                          typeText('back', DATA.back, () => {
                                            setTimeout(() => {
                                              typeText('back1', DATA.back1, () => {
                                                setTimeout(() => {
                                                  typeText('back2', DATA.back2, () => {
                                                    setTimeout(() => {
                                                      typeText('back3', DATA.back3, () => {
                                                        setTimeout(() => {
                                                          typeText('back4', DATA.back4, () => {
                                                            setShowCursor((prev: Record<string, boolean>) => ({ ...prev, back4: false }))
                                                          })
                                                        }, DELAY)
                                                      })
                                                    }, DELAY)
                                                  })
                                                }, DELAY)
                                              })
                                            }, DELAY)
                                          })
                                        }, DELAY)
                                      })
                                    }, DELAY)
                                  })
                                }, DELAY)
                              })
                            }, DELAY)
                          })
                        }, DELAY)
                      })
                    }, DELAY)
                  })
                }, DELAY)
              })
            }, 2500)
          })
        })
      }

      setTimeout(startAnimation, DELAY)
    }
  }, [loading, typeText])

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    const scrollToBottom = () => {
      const terminalContent = document.querySelector('.terminal-content') as HTMLElement
      if (terminalContent) {
        terminalContent.scrollTo({
          top: terminalContent.scrollHeight,
          behavior: 'smooth'
        })
      }
    }

    // Scroll when any text state changes
    const timeoutId = setTimeout(scrollToBottom, 50)
    return () => clearTimeout(timeoutId)
  }, [greeting, message, name, alias, occupation, devops, devops1, devops2, devops3, back, back1, back2, back3, back4, showLoadingMessage2, alphaLoading])

  return (
    <div ref={containerRef} className={styles.container}>
      {loading && (
        <h1 className={styles.loadingH1}>
          <span>
            <i className="fa fa-cogs"></i>
          </span>{' '}
          RUNNING IDENTITY PROTOCOL<span>{loadingDots}</span>
        </h1>
      )}
      <div className={styles.imgContainer}>
        <div id="identity-results" className={styles.identityResults}>
          <h1 className={`${styles.greeting} ${showCursor.greeting ? styles.cursor : ''}`}>
            {greeting}
          </h1>
          <p className={`${styles.message} ${showCursor.message ? styles.cursor : ''} ${message ? styles.sign : ''}`}>
            {message}
          </p>
        </div>
        {showLoadingMessage2 && (
          <h3 className={styles.loadingMessage2}>
            LOADING RESUME<span>{alphaLoading}</span>.
          </h3>
        )}
      </div>
      <div id="resume" className={styles.resume}>
        <h3 className={`${styles.name} ${showCursor.name ? styles.cursor : ''} ${name ? styles.sign : ''}`}>
          {name}
        </h3>
        <h3 className={`${styles.alias} ${showCursor.alias ? styles.cursor : ''} ${alias ? styles.sign : ''}`}>
          {alias}
        </h3>
        <h3 className={`${styles.occupation} ${showCursor.occupation ? styles.cursor : ''} ${occupation ? styles.sign : ''}`}>
          {occupation}
        </h3>
        <br />
        {devops && <i id="devops-span" className="fa fa-wrench"></i>}
        <h3 className={`${styles.devops} ${styles.inline} ${showCursor.devops ? styles.cursor : ''}`}>
          {devops}
        </h3>
        <h4 className={`${styles.devops1} ${styles.subItem} ${showCursor.devops1 ? styles.cursor : ''}`}>
          {devops1}
        </h4>
        <h4 className={`${styles.devops2} ${styles.subItem} ${showCursor.devops2 ? styles.cursor : ''}`}>
          {devops2}
        </h4>
        <h4 className={`${styles.devops3} ${styles.subItem} ${showCursor.devops3 ? styles.cursor : ''}`}>
          {devops3}
        </h4>
        <br />
        {back && <i id="back-span" className="fa fa-wrench"></i>}
        <h3 className={`${styles.back} ${styles.inline} ${showCursor.back ? styles.cursor : ''}`}>
          {back}
        </h3>
        <h4 className={`${styles.back1} ${styles.subItem} ${showCursor.back1 ? styles.cursor : ''}`}>
          {back1}
        </h4>
        <h4 className={`${styles.back2} ${styles.subItem} ${showCursor.back2 ? styles.cursor : ''}`}>
          {back2}
        </h4>
        <h4 className={`${styles.back3} ${styles.subItem} ${showCursor.back3 ? styles.cursor : ''}`}>
          {back3}
        </h4>
        <h4 className={`${styles.back4} ${styles.subItem} ${showCursor.back4 ? styles.cursor : ''}`}>
          {back4}
        </h4>
      </div>
    </div>
  )
}


import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mahdi Darabi | CV',
  description: 'DevOps Engineer / SRE | Backend Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <div className="terminal-wrapper">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="terminal-control close"></span>
                <span className="terminal-control minimize"></span>
                <span className="terminal-control maximize"></span>
              </div>
              <div className="terminal-title">TERMINAL</div>
            </div>
            <div className="terminal-content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}


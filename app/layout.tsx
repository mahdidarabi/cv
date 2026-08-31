import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = new URL('https://md7.ir')

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Mahdi Darabi | CV',
  description:
    'DevOps Engineer with 3+ years of experience in scalable infrastructure and CI/CD.',
  keywords: [
    'Mahdi Darabi',
    'DevOps Engineer',
    'SRE',
    'Backend Developer',
    'Kubernetes',
    'Go',
    'Node.js',
  ],
  authors: [{ name: 'Mahdi Darabi' }],
  creator: 'Mahdi Darabi',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Mahdi Darabi | CV',
    description:
      'DevOps Engineer with 3+ years of experience in scalable infrastructure and CI/CD.',
    siteName: 'Mahdi Darabi | CV',
  },
  twitter: {
    card: 'summary',
    title: 'Mahdi Darabi | CV',
    description:
      'DevOps Engineer with 3+ years of experience in scalable infrastructure and CI/CD.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#100b07',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="terminal-wrapper">
          <div className="terminal-window">
            <header className="terminal-header">
              <div className="terminal-controls" aria-hidden="true">
                <span className="terminal-control close"></span>
                <span className="terminal-control minimize"></span>
                <span className="terminal-control maximize"></span>
              </div>
              <div className="terminal-title">TERMINAL // MD7</div>
            </header>
            <div className="terminal-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}

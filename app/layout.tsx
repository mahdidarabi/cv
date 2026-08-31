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
  themeColor: '#08090c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

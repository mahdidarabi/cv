import type { Metadata, Viewport } from 'next'
import './globals.css'
import PwaRegister from './pwa-register'

const siteUrl = new URL('https://md7.ir')
const description =
  'DevOps Engineer with 3+ years of experience in scalable infrastructure and CI/CD.'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Mahdi Darabi | CV',
  description,
  applicationName: 'md7',
  manifest: '/manifest.json',
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'md7',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Mahdi Darabi | CV',
    description,
    siteName: 'Mahdi Darabi | CV',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
        alt: 'md7',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mahdi Darabi | CV',
    description,
    images: ['/icons/icon-512.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08090c',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Sanat Tarihi Portfolyo | Emrullah Demirel',
  description: 'Sanat tarihine dair çalışmalar, araştırmalar ve portfolyo sergileri. Next.js, TypeScript ve Supabase ile geliştirilmiştir.',
  keywords: ['sanat tarihi', 'portfolyo', 'next.js', 'typescript', 'supabase'],
  authors: [{ name: 'Emrullah Demirel' }],
  creator: 'Emrullah Demirel',
  openGraph: {
    title: 'Sanat Tarihi Portfolyo',
    description: 'Sanat tarihine dair çalışmalar ve portfolyo sergileri',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanat Tarihi Portfolyo',
    description: 'Sanat tarihine dair çalışmalar ve portfolyo sergileri',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          {children}
        </div>
      </body>
    </html>
  )
}
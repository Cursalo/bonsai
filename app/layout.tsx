import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext'
import AuthButton from '../src/components/AuthButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bonsai Prep | AI-Driven Tutoring',
  description: 'Personalized, affordable test preparation for standardized exams with AI-driven tutoring.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground`}>
        {/* Simple Header */}
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
        {/* Main Content Area */}
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
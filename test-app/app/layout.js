import { Inter } from 'next/font/google'
import Navbar from '@/Components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NCR',
  description: 'Consulta de cuentas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="flex flex-col w-full h-screen min-h-screen justify-between"> */}
          <header>
            <Navbar />
          </header>
          <main className="flex min-h-screen flex-col items-center p-24">
            {children}
          </main>
          <footer>

          </footer>
        {/* </div> */}
      </body>
    </html>
  )
}

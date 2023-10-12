import { Suspense } from 'react';
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { getServerSession } from 'next-auth';

import { Page } from '@/components/page';
import { Loading } from '@/components/loading';
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthProvider';
import { authOptions } from '@/lib/auth';

import '@/styles/layout.scss';


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Logic-Lab',
  description: 'Logic-Lab',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  const theme = session?.user.theme ?? "light"

  return (
    <html lang="pt-BR" className={theme}>
      <body className={roboto.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
              <Page>
                {children}
              </Page>
            </Suspense>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

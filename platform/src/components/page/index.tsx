import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "@/context/ThemeContext";
import { getServerSession } from "next-auth";
import { Nav } from "../nav";
import { authOptions } from "@/lib/auth";
// import { Toaster } from 'react-hot-toast';
type PageProps = {
  children: ReactNode;
}

export async function Page({ children }: PageProps) {
  const session = await getServerSession(authOptions);

  return (
    <div className="content">
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={
          {
            success: {
              style: {
                backgroundColor: 'green'
              }
            },
            error: {
              style: {
                backgroundColor: '#ff4141'
              }
            }
          }
        }
      /> */}
      <header>
        {session && (
          <Nav user={session.user} />
        )}
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}

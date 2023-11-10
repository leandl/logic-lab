import { ReactNode } from "react";
import './page.scss';

import { Nav } from "../nav";
import { Toaster } from "react-hot-toast";

type PageProps = {
  children: ReactNode;
}

export async function Page({ children }: PageProps) {
  return (
    <div className="content">
      <Toaster
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
      />
      <header><Nav />
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}

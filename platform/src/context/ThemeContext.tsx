'use client';
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState, useContext } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  theme: "dark" | "light";
}

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => { }
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { data: session, update } = useSession()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(session?.user.theme === "dark")

  async function toggleTheme() {
    setIsDarkMode(!isDarkMode)
    await update({
      ...session,
      user: {
        ...session?.user,
        theme: isDarkMode ? "dark" : "light"
      }
    })
    document.documentElement.classList.toggle('dark', isDarkMode);
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

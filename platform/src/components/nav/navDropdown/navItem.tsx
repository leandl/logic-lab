'use client';

import { usePathname } from "next/navigation";

import '../nav.scss';

type NavItemProps = {
  route: string;
  children: React.ReactNode
}
export function NavItem({ route, children }: NavItemProps) {
  const pathname = usePathname()
  const inRoute = pathname.includes(route);
  const navItemActive = inRoute ? 'active' : '';

  return (
    <div className={`navItem ${navItemActive}`} >
      {children}
    </div>
  )
}

import { Library } from "lucide-react"
import './nav.scss'
import { getServerSession } from "next-auth"
import Link from "next/link";

import { NavItem } from "./navDropdown/navItem";
import { NavUser } from "./navUser/navUser";
import { ROUTE } from "@/config/route";
import { authOptions } from "@/lib/auth";

import logo from "@/assets/logo.svg"

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export async function Nav() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <></>;
  }

  return (
    <nav>
      <Link href={ROUTE.APP.HOME} prefetch={true}>
        <NavItem>
          <img className="logo" src={logo.src} alt="logo" />
        </NavItem>
      </Link>
      {session?.user.type === "SUPERVISOR" && (
        <Link href={ROUTE.APP.QUESTION.LIST}>
          <NavItem route={ROUTE.APP.QUESTION.LIST}>
            <Library />
            <span>Questões</span>
          </NavItem>
        </Link>
      )}
      {/* 
      <Link href="/songfinder">
        <NavItem route="/songfinder">
          <FolderSearch2 />
          <span>Song Finder</span>
        </NavItem>
      </Link>

      <Link href="/users">
        <NavItem route="/users">
          <Users />
          <span>Users</span>
        </NavItem>
      </Link> */}

      <NavUser user={user} />
    </nav>
  )
}

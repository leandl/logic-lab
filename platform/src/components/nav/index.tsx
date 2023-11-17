import { Library, Users } from "lucide-react"
import './nav.scss'
import Link from "next/link";

import { NavItem } from "./navDropdown/navItem";
import { NavUser } from "./navUser/navUser";
import { ROUTE } from "@/config/route";

import logo from "@/assets/logo.svg"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
        <>
          <Link href={ROUTE.APP.QUESTION.LIST}>
            <NavItem route={ROUTE.APP.QUESTION.LIST}>
              <Library />
              <span>Questões</span>
            </NavItem>
          </Link>
          <Link href={ROUTE.APP.USER.DATA.LIST}>
            <NavItem route={ROUTE.APP.USER.DATA.LIST}>
              <Users />
              <span>Users</span>
            </NavItem>
          </Link>
        </>
      )}
      {/* 
      <Link href="/songfinder">
        <NavItem route="/songfinder">
          <FolderSearch2 />
          <span>Song Finder</span>
        </NavItem>
      </Link> */}

      <NavUser user={user} />
    </nav>
  )
}

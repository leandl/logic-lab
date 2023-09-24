import { FolderSearch2, Library, Users } from "lucide-react"
import './nav.scss'
import { User } from "next-auth"
import { NavItem } from "./navDropdown/navItem";
import Link from "next/link";
import { NavUser } from "./navUser/navUser";
type NavProps = {
  user: User;
}

export function Nav({ user }: NavProps) {

  return (
    <nav>
      <Link href="/songsets">
        <NavItem route="/songsets">
          <Library />
          <span>Song Set</span>
        </NavItem>
      </Link>

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
      </Link>

      <NavUser user={user} />
    </nav>
  )
}

'use client'
import { User } from "next-auth";
import { NavDropdown } from "../navDropdown/navDropdown";
import { RefAttributes, useEffect, useRef, useState } from "react";

type NavUserProps = {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  let menuRef = useRef<HTMLUListElement>(null);
  let imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function checkChildsWasClicked(nodes: NodeListOf<ChildNode>, target: HTMLElement) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === target) {
          return true;
        }
      }

      return false;
    }

    let handler = (e: MouseEvent) => {
      if (
        menuRef.current
        && imgRef.current
        && !menuRef.current.contains(e.target as HTMLElement)
        && !imgRef.current.contains(e.target as HTMLElement)
        && !checkChildsWasClicked(menuRef.current.childNodes, e.target as HTMLElement)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  })

  const avatarURL = `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name}`

  return (
    <div className="user">
      <div className="info">
        <span className="name">{user.name}</span>
      </div>
      <div className="pfp" onClick={() => { setIsDropdownOpen(!isDropdownOpen); }}>
        <img src={avatarURL} alt="Profile Picture" />
      </div>

      <NavDropdown isOpen={isDropdownOpen} />
    </div>
  )
}

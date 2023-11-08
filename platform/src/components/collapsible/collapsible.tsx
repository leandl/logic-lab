import { ReactNode, useState } from "react";
import "./collapsible.scss";

type CollapsibleProps = {
  title: ReactNode;
  color?: "red" | "green";
  children: ReactNode;
}

export function Collapsible({ title, color, children }: CollapsibleProps) {
  const [active, setActive] = useState<boolean>(true);
  const classNameCollapsibleContent = active ? "collapsible-content active" : "collapsible-content";
  const classNameCollapsibleHeader = color ? `collapsible-header ${color}` : "collapsible-header";

  return (
    <div className="wrapper-collapsible">
      <button
        type="button"
        onClick={() => setActive(!active)}
        className={classNameCollapsibleHeader}
      >
        {title}
      </button>
      <div className={classNameCollapsibleContent}>
        {children}
      </div>
    </div>
  )
}

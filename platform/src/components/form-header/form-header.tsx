import { ReactNode } from "react";

import "./form-header.scss";

type FormHeaderProps = {
  title: string;
  actions: ReactNode;
}

export function FormHeader({ title, actions }: FormHeaderProps) {
  return (
    <div className="form-header">
      <h2 className="title">{title}</h2>
      <div className="actions">
        {actions}
      </div>
    </div>
  )
}

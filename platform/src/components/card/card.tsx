import { ReactNode } from "react";
import { X } from "lucide-react";

import "./card.scss";

type CardProps = {
  onClose?(): void;
  children: ReactNode;
  title?: string;
}


export function Card({ title, onClose, children }: CardProps) {
  return (
    <div className="card">
      {onClose && <button className="card-close" onClick={onClose}><X className="icon" /></button>}
      {title && (
        <div className="card-header">
          <h3>{title}</h3>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}

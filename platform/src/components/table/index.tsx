import { HTMLAttributes, ReactNode } from "react";
import './table.scss';

type TableContainerProps = {
  itens: any[],
  match: {
    elementKey: number | string;
    render: string[]
  }
}

type CellProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Table({ children }: CellProps) {
  return (
    <div className="table">
      {children}
    </div>
  )
}

export function TableRow({ children, ...rest }: CellProps) {
  return (
    <div {...rest} className="cell">
      {children}
    </div>
  )
}
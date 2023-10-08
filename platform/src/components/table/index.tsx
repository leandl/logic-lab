import { HTMLAttributes } from "react";
import './table.scss';



export function Table({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const subClassName = className ?? "";
  return (
    <div className={`table container ${subClassName}`} {...rest}>
      {children}
    </div>
  )
}

export function TableHeadRow({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const subClassName = className ?? "";
  return (
    <div {...rest} className={`table-head-row row ${subClassName}`} {...rest}>
      {children}
    </div>
  )
}

export function TableRow({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const subClassName = className ?? "";
  return (
    <div {...rest} className={`table-row row ${subClassName}`} {...rest}>
      {children}
    </div>
  )
}


type TableCellProps = HTMLAttributes<HTMLDivElement> & {
  col: number;
}


export function TableCell({ children, className, col, ...rest }: TableCellProps) {
  const subClassName = className ?? "";
  return (
    <div {...rest} className={`col-${col} table-cell ${subClassName}`} {...rest}>
      {children}
    </div>
  )
}

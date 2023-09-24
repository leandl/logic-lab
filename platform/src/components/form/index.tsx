import { ReactNode } from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
}

export function Form({ children, ...rest }: FormProps) {
  return(
    <form {...rest}>
      {children}
    </form>
  )
}

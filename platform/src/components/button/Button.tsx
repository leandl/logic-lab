import './button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
}
export function Button({ name, ...rest }: ButtonProps) {
  return(
    <button {...rest}>{name}</button>    
  )
}
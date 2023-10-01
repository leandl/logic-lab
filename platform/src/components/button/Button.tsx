import './button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button className={`button ${className}`} {...rest} />
  )
}

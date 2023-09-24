import { getCsrfToken } from "next-auth/react"
import { forwardRef } from "react"

export const Csrf = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(async ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>, ref) => {
  const csrfToken = await getCsrfToken()

  return <input ref={ref} {...rest} type="hidden" value={csrfToken} />
})

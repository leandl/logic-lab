'use client'
import React, { forwardRef } from 'react'
import './textarea.scss';

type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(({ displayName, errorMessage, name, ...rest }: InputProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName}</label>
      <textarea
        ref={ref}
        {...rest}
        autoComplete="off"
        name={name}
      />
      {errorMessage ? <span className='error'>{errorMessage}</span> : <></>}
    </div>
  )
})

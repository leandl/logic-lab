'use client'
import React, { ReactNode, forwardRef } from 'react'
import './select.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ displayName, children, errorMessage, name, ...rest }: SelectProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName}</label>
      <select
        ref={ref}
        {...rest}
        name={name}
      >
        {children}
      </select>
      {errorMessage ? <span className='error'>{errorMessage}</span> : <></>}
    </div>
  )
})
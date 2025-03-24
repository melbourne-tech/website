import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type ?? 'text'}
      className={clsx(
        'rounded-lg shadow-sm transition duration-200 border-gray-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:border-blue-400 focus-visible:ring-blue-200',
        className,
      )}
      {...props}
    />
  )
}

export default Input

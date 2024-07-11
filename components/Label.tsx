import clsx from 'clsx'
import { LabelHTMLAttributes } from 'react'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label className={clsx('text-sm text-gray-800', className)} {...props}>
      {children}
    </label>
  )
}

export default Label

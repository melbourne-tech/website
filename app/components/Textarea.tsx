import clsx from 'clsx'
import TextareaAutosize from 'react-textarea-autosize'

export type TextareaProps = {
  id?: string
  name?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
  required?: boolean
}

const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
  required,
  ...props
}: TextareaProps) => {
  const TextareaComponent =
    typeof window !== 'undefined' ? TextareaAutosize : 'textarea'

  const autoSizeProps = typeof window !== 'undefined' ? { minRows: 2 } : {}

  return (
    <TextareaComponent
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        'rounded-lg shadow-xs transition duration-200 border-gray-300',
        'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:border-blue-400 focus-visible:ring-blue-200',
        className,
      )}
      required={required}
      {...autoSizeProps}
      {...props}
    />
  )
}

export default Textarea

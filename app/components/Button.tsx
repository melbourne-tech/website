import clsx from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  variant?: 'DEFAULT' | 'SUCCESS' | 'ERROR'
  onClick?: () => void
  isLoading?: boolean
}

const Button = ({
  icon,
  variant = 'DEFAULT',
  onClick,
  children,
  className,
  isLoading,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      key="showAllSkillsButton"
      onClick={onClick}
      className={clsx(
        'relative flex items-center select-none flex-shrink-0 px-4 py-2 font-medium text-white transition duration-200 border rounded-full focus:outline-none focus-visible:ring focus-visible:border-blue-500',
        variant === 'DEFAULT' &&
          'bg-slate-800 border-slate-800 hover:bg-slate-600 hover:border-slate-600 active:bg-slate-500',
        variant === 'SUCCESS' &&
          'bg-green-700 border-green-700 hover:bg-green-600 hover:border-green-600 active:bg-green-500',
        variant === 'ERROR' &&
          'bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-600 active:bg-red-500',
        className,
      )}
      {...props}
    >
      <span
        className={clsx(
          'flex items-center flex-shrink-0 gap-2',
          isLoading && 'opacity-0',
        )}
      >
        {icon}
        <span>{children}</span>
      </span>

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="text-white"
            viewBox="0 0 2400 2400"
            width={22}
            height={22}
          >
            <g
              strokeWidth={200}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
            >
              <path d="M1200 600L1200 100" />
              <path opacity={0.5} d="M1200 2300L1200 1800" />
              <path opacity={0.917} d="M900 680.4L650 247.4" />
              <path opacity={0.417} d="M1750 2152.6L1500 1719.6" />
              <path opacity={0.833} d="M680.4 900L247.4 650" />
              <path opacity={0.333} d="M2152.6 1750L1719.6 1500" />
              <path opacity={0.75} d="M600 1200L100 1200" />
              <path opacity={0.25} d="M2300 1200L1800 1200" />
              <path opacity={0.667} d="M680.4 1500L247.4 1750" />
              <path opacity={0.167} d="M2152.6 650L1719.6 900" />
              <path opacity={0.583} d="M900 1719.6L650 2152.6" />
              <path opacity={0.083} d="M1750 247.4L1500 680.4" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
                values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
                dur="0.83333s"
                begin="0s"
                repeatCount="indefinite"
                calcMode="discrete"
              />
            </g>
          </svg>
        </span>
      )}
    </button>
  )
}

export default Button

import { Link } from '@remix-run/react'
import { CircleCheck, XCircle } from 'lucide-react'
import { cn } from '~/lib/style'

export interface PlanCardProps {
  name: string
  rrp: string
  price: string
  discountText?: string
  isMostPopular?: boolean
  features: {
    title: string
    included: boolean
  }[]
  to: string
}

const PlanCard = ({
  name,
  rrp,
  price,
  discountText,
  isMostPopular = false,
  features,
  to,
}: PlanCardProps) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-5 bg-white border border-gray-300 py-5 relative sm:min-w-72">
      <h3 className="text-lg px-4">{name}</h3>

      <hr className="w-1/3" />

      <div className="flex flex-col gap-1 px-4">
        <p>
          <span className="line-through">{rrp}</span>
          {discountText && (
            <span className="text-xs text-gray-600 ml-1">{discountText}</span>
          )}
        </p>
        <p>
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-sm text-gray-600">/ lifetime</span>
        </p>
      </div>

      <Link
        to={to}
        className="flex items-center justify-center gap-2 p-2 border-y border-gray-300 font-medium uppercase text-sm transition-colors hover:bg-gray-100"
      >
        Buy Now
      </Link>

      <ul className="flex flex-col gap-1 px-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.included ? (
              <CircleCheck size={18} className="text-green-700" />
            ) : (
              <XCircle size={18} className="text-red-700" />
            )}
            {feature.title}
          </li>
        ))}
      </ul>

      <div className="text-xs text-center text-gray-600">
        Buy Once, Build Unlimited Apps
      </div>

      {isMostPopular && (
        <div className="border border-gray-300 px-1 py-0.5 text-xs uppercase font-semibold absolute -top-3 -right-4 rotate-12 bg-white shadow">
          Most Popular!
        </div>
      )}

      <div
        className={cn(
          'absolute w-8 h-10 border-gray-300 hidden sm:block',
          isMostPopular
            ? '-bottom-10 -right-8 border-l border-t'
            : '-top-10 -left-8 border-r border-b',
        )}
      />
    </div>
  )
}

export default PlanCard

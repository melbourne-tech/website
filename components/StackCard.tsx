import { ExternalLinkIcon } from '@heroicons/react/outline'

type StackCardProps = {
  image: string
  title: string
  link?: string
}

const StackCard = ({ image, title, link }: StackCardProps) => {
  return (
    <div className="flex flex-col justify-between flex-shrink-0 p-4 space-y-8 bg-white rounded-lg shadow-lg w-60">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`${title} Logo`}
        className="self-center object-contain w-full h-24"
      />

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">{title}</p>

        {Boolean(link) && (
          <a
            href={link}
            className="text-gray-600 transition-colors duration-200 rounded-sm hover:text-blue-500 focus:outline-none focus-visible:ring"
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${title} website`}
          >
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  )
}

export default StackCard

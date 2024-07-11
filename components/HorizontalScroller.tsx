import { Children, PropsWithChildren } from 'react'

const HorizontalScroller = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="w-full min-w-0">
      <div className="flex pb-2 overflow-x-scroll gray-200-scrollbar">
        {Children.map(children, (child) => (
          <div className="flex-none px-2 py-4 first:pl-4 last:pr-4">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorizontalScroller

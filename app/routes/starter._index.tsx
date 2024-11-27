import PricingPlans from '~/components/starter/PricingPlans'

export default function StarterIndex() {
  return (
    <section
      id="pricing"
      className="flex flex-col gap-12 py-28 bg-gray-50 relative overflow-hidden"
    >
      <h2 className="text-center text-6xl text-gray-300 uppercase font-extrabold absolute -top-[7px] -left-[4px] leading-none tracking-tight">
        Pricing.
      </h2>

      <PricingPlans />
    </section>
  )
}

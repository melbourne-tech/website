import PlanCard from './PlanCard'

const getFeatures = (premium = false) => [
  {
    title: 'App Boilerplate Code',
    included: true,
  },
  {
    title: 'Supabase Backend',
    included: true,
  },
  {
    title: 'Authentication (Email, Social)',
    included: true,
  },
  {
    title: 'Push Notifications',
    included: true,
  },
  {
    title: 'In-App Purchases',
    included: true,
  },
  {
    title: 'Basic UI Components',
    included: true,
  },
  {
    title: 'Discord Community',
    included: premium,
  },
  {
    title: 'Lifetime Updates',
    included: premium,
  },
]

const PricingPlans = () => {
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row gap-10 max-w-2xl mx-auto px-4">
      <PlanCard
        name="Updates for 1 Year"
        rrp="$299"
        price="$269"
        discountText="10% launch discount"
        features={getFeatures(false)}
        to="checkout?plan=year"
      />
      <PlanCard
        name="Lifetime Updates"
        rrp="$599"
        price="$349"
        discountText="40% launch discount"
        isMostPopular={true}
        features={getFeatures(true)}
        to="checkout?plan=lifetime"
      />
    </div>
  )
}

export default PricingPlans

import StripePricingTable from '@/components/stripe/pricing-table';

export const metadata = {
  title: 'Pricing | Bootrockets',
  description: 'Choose the perfect plan for your needs',
};

export default function PricingPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Choose the right plan for you
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our flexible pricing options designed to fit your needs.
          </p>
        </div>
        
        <StripePricingTable
          pricingTableId={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
          publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          className="w-full"
        />
      </div>
    </main>
  );
} 
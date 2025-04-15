'use client';

import { useEffect } from 'react';
interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
  className?: string;
}

/**
 * A Stripe Pricing Table component for Next.js
 * 
 * @param pricingTableId - The Stripe pricing table ID from the Stripe dashboard
 * @param publishableKey - Your Stripe publishable key
 * @param className - Optional CSS class for the container
 */
export default function StripePricingTable({
  pricingTableId,
  publishableKey,
  className,
}: StripePricingTableProps) {
  useEffect(() => {
    // Create and load the Stripe Pricing Table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className={className}>
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
      />
    </div>
  );
} 
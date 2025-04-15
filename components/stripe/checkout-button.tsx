'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  priceId: string;
  customerId?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Button component for initiating a Stripe checkout session
 * 
 * @param priceId - The Stripe price ID to create a checkout session for
 * @param customerId - Optional Stripe customer ID if the customer already exists
 * @param className - Optional CSS class for styling
 * @param children - Button content
 */
export default function CheckoutButton({
  priceId,
  customerId,
  className = '',
  children,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        router.push(url);
        return;
      }
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`px-6 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
} 
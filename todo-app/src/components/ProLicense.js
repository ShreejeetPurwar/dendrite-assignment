import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

const ProLicenseForm = () => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error);
    } else {
      //
      // Send the payment method ID to your server for processing
      const response = await fetch('/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method_id: paymentMethod.id }),
      });

      if (response.ok) {
        alert('Payment successful!');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error.message}</div>}
    </form>
  );
};

const ProLicense = () => (
  <div>
    <h2>Pro License</h2>
    <Elements stripe={stripePromise}>
      <ProLicenseForm />
    </Elements>
  </div>
);

export default ProLicense;

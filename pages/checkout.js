
import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import Cart from "../components/cart"
import AppContext from "../components/context";

function Checkout() {
  const { show } = useContext(AppContext);
  const [stripePromise, setStripePromise] = useState(() => loadStripe(
    "pk_test_51Ny4msJrJfFtrOy8yXcKkOJHf4xe0RPHCws8Kp4xj7qa2VaERf4aV2Rir41dXuJCdWeMvU5QDZzOJvYzCpYP8sCJ00CuGelQb8"
  ));

  return (
   show ? (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
    ):(
    <>
      <h1 style={{ margin: 20 }}>Checkout</h1>
      <Cart></Cart>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
    )
  );
}

export default Checkout;

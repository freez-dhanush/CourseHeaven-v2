import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
<<<<<<< HEAD
// frontend/src/main.jsx
// Corrected frontend/src/main.jsx
=======

// Load Stripe key from environment variable
>>>>>>> 48cfb65ee43e5b5aeff3918de7ee8f487ea14d35
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
<<<<<<< HEAD
);
=======
);
>>>>>>> 48cfb65ee43e5b5aeff3918de7ee8f487ea14d35

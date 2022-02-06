import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import CheckoutForm from "./CheckoutForm";
import "./CheckoutPage.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../axios";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { cartItemNumber, cartTotalCost } = useSelector((state) => state.cart);
  // to store the client secret.
  const [clientSecret, setClientSecret] = useState("");
  //checking for url and the cart-item details, to avoid direct url accessing.
  const quantity = Number(window.location.search?.split("&")[1]?.split("=")[1]);
  const total = Number(window.location.search?.split("&")[2]?.split("=")[1]);
  //taking delivery type from url.
  const deliveryType = String(
    window.location.search?.split("&")[0]?.split("=")[1]
  );
  let navigate = useNavigate();

  console.log(window.location.search);
  console.log(total);
  console.log(cartTotalCost);
  // to create PaymentIntent as soon as the page loads.

  useEffect(() => {
    window.scrollTo(0, 0);

    //if not matching, then redirect to cart.
    if (quantity !== cartItemNumber || total !== cartTotalCost) {
      navigate("/cart", { replace: true });
    }
    if (deliveryType !== "visit-store" && deliveryType !== "home-delivery") {
      navigate("/cart", { replace: true });
    }
  }, [cartItemNumber, quantity, navigate, total, cartTotalCost, deliveryType]);

  useEffect(() => {
    axios
      .post("/create-payment-intent", {
        data: cartTotalCost,
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((error) => console.log(error));
  }, [cartTotalCost]);

  const appearance = {
    theme: "stripe",
    rules: {
      ".Input": {
        border: "0.5px solid rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        height: "4px",
      },
      ".Input:focus": {
        border: "2.75px solid purple",
        boxShadow: "none",
      },
      ".Label": {
        fontSize: "13px",
      },
      ".Error": {
        color: "#b30000",
        fontSize: "0.75rem",
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      <Navbar notHome />
      <main>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm deliveryType={deliveryType} />
          </Elements>
        ) : (
          <div className="checkout__section section__sha-bor-pad">
            <LoadingBar />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

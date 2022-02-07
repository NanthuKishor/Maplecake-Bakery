import { useNavigate } from "react-router-dom";
import "./PaymentResultPage.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { addFormDataToDB } from "../../features/formDataSlice";
import { emptyCart } from "../../features/cartSlice";

const PaymentResultPage = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState([]);
  const { formData } = useSelector((state) => state.formData);
  //for stripe messages.
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // retrieving the payment intent Or the error.
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(" Your payment Succeeded !");
          setPaymentData({
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            paymentId: paymentIntent.id,
            currency: paymentIntent.currency,
            canceledAt: paymentIntent.canceled_at,
          });
          console.log(paymentIntent);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setTimeout(() => {
            navigate("/cart");
          }, 5000);
          break;
        default:
          setMessage("Something went wrong, Please try again.");
          setTimeout(() => {
            navigate("/cart");
          }, 3000);
          break;
      }
    });
  }, [stripe, navigate]);
  console.log(paymentData);

  useEffect(() => {
    if (paymentData?.status === "succeeded") {
      dispatch(addFormDataToDB(paymentData));
      dispatch(emptyCart());
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }
    console.log("done");
  }, [dispatch, paymentData, navigate]);
  //to add data to firebase
  const handleContinueClick = (status) => {
    if (status === "succeeded") {
      navigate("/", { replace: true });
    } else {
      navigate("/cart", { replace: true });
    }
  };
  return (
    <div className="paymentResult__section section__sha-bor-pad column__flex ">
      <h3>
        {formData?.customer_details?.name?.toUpperCase()} {message}
      </h3>
      {paymentData?.status === "succeeded" ? (
        <>
          <h3>Price: ${(paymentData?.amount / 100).toFixed(2)}</h3>
        </>
      ) : null}
      <Button
        disabled={
          paymentData?.status === "processing"
            ? true
            : !paymentData?.status
            ? true
            : false
        }
        type="submit"
        color="secondary"
        variant="contained"
        size="medium"
        sx={{
          fontSize: 12,
        }}
        onClick={() => handleContinueClick(paymentData?.status)}
      >
        {paymentData?.status === "succeeded"
          ? "Continue"
          : paymentData?.status === "processing"
          ? "Processing..."
          : "Try again"}
      </Button>
    </div>
  );
};

export default PaymentResultPage;

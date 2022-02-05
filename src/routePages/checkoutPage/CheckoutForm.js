import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegionDropdown, CountryDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliveryFormSchema } from "../../validations/deliveryForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { saveFormData } from "../../features/formDataSlice";
import PhoneInputField from "./PhoneInputField";
import CountryCodeInput from "./CountryCodeInput";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import SingleLineInput from "../../components/formInputs/SingleLineInput";

const CheckoutForm = ({ deliveryType }) => {
  // initiating stripe to communicate with backend.
  const stripe = useStripe();
  const elements = useElements();
  //accessing cart state from redux store.
  const { cartTotalCost, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  //for stripe messages.
  const [errorMessage, setErrorMessage] = useState(null);

  //disable submit button on click.
  const [buttonClicked, setButtonClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deliveryFormSchema),
  });

  //for country and state dropdowns.
  const [dropdown, setDropdown] = useState({
    country: "",
    region: "",
  });
  const selectCountry = (val) => {
    setDropdown({ country: val });
  };
  const selectRegion = (val) => {
    setDropdown({ ...dropdown, region: val });
  };

  //to scroll to the top on first load only.
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // to manage the form submit.
  const products = cartItems.map((item) => {
    return {
      item_id: item.id,
      item_name: item.name,
      item_image: item.image,
      item_price: item.price,
      item_quantity: item.qty,
    };
  });

  const onSubmit = async (data) => {
    // toast.info("You'r Payment is being Processed");
    const deliveryData = {
      ...data,
      state: dropdown.region,
      country: dropdown.country,
      deliveryMode: deliveryType,
      purchased_items: products,
      delivered: false,
    };
    // saving to redux state.
    dispatch(saveFormData(deliveryData));
    // toast.info("You will be Redirected to another page");

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      toast.error("Something went wrong");
      toast.error("Please Checkout again");
      navigate("/cart", { replace: true });
      return;
    }
    setButtonClicked(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://maplecake-bakery.web.app/s/payment",
      },
    });
    //if an error in confirming stripe payment.
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occured.");
    }
    setButtonClicked(false);
  };

  return (
    <div className="checkout__section section__sha-bor-pad">
      <h3>Checkout</h3>
      <div className="checkout__formDiv">
        <p>
          <strong>Please fill the Delivery Form</strong>
        </p>
        <div className="checkout__form br__padding__top">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                fontSize: 30,
                paddingBottom: 1,
              },
              width: "100%",
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form__name">
              <SingleLineInput
                type="text"
                name="fullName"
                label="Full name"
                register={register}
                error={errors.fullName?.message}
                required={true}
              />
            </div>
            <div className="form__email paddingBottom__2rem">
              <SingleLineInput
                type="email"
                name="email"
                label="Email address"
                register={register}
                error={errors.email?.message}
                required={true}
              />
              <small>We will never share your email</small>
            </div>

            {deliveryType === "home-delivery" ? (
              <div className="form__address">
                <label htmlFor="address">Delivery Address</label>

                <SingleLineInput
                  type="text"
                  name="street"
                  label="Door No. & Street"
                  register={register}
                  error={errors.street?.message}
                  required={deliveryType === "home-delivery" ? true : false}
                />
                <SingleLineInput
                  type="text"
                  name="city"
                  label="City"
                  register={register}
                  error={errors.city?.message}
                  required={deliveryType === "home-delivery" ? true : false}
                />
                <CountryDropdown
                  className="region__dropdown"
                  value={dropdown.country}
                  onChange={(val) => selectCountry(val)}
                  required={deliveryType === "home-delivery" ? true : false}
                />
                <RegionDropdown
                  className="region__dropdown"
                  country={dropdown.country}
                  value={dropdown.region}
                  onChange={(val) => selectRegion(val)}
                  required={deliveryType === "home-delivery" ? true : false}
                />
                <SingleLineInput
                  type="text"
                  name="zipCode"
                  label="Zip code"
                  register={register}
                  error={errors.zipCode?.message}
                  required={deliveryType === "home-delivery" ? true : false}
                />
              </div>
            ) : null}

            <div className="form__phone paddingBottom__2rem">
              <div className="form__phone__flex">
                <CountryCodeInput
                  type="tel"
                  name="dialerCode"
                  label="Dialer code"
                  register={register}
                  error={errors.dialerCode?.message}
                />
              </div>
              <div>
                <PhoneInputField
                  type="tel"
                  name="phone"
                  label="Phone number"
                  register={register}
                  error={errors.phone?.message}
                />
                <small>We'll never share your Phone No.</small>
              </div>
            </div>
            <PaymentElement className="stripe__payment__element" />

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="medium"
              disabled={
                cartTotalCost === 0
                  ? true
                  : buttonClicked
                  ? true
                  : !stripe
                  ? true
                  : !elements
                  ? true
                  : false
              }
              sx={{
                fontSize: 12,
                width: "100%",
                marginTop: 2,
              }}
            >
              {buttonClicked ? (
                <div className="loadingSpinner"></div>
              ) : (
                `Pay $${cartTotalCost.toFixed(2)}`
              )}
            </Button>
            {errorMessage && (
              <h4 className="stripe__payment__error">{errorMessage}</h4>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

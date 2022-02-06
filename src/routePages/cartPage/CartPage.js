import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./CartPage.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { decreaseCartQty, increaseCartQty } from "../../features/cartSlice";
import Button from "@mui/material/Button";
import RadioInput from "../../components/formInputs/RadioInput";

const CartPage = () => {
  //get the cart state from redux.
  const { cartItems, cartItemNumber, cartTotalCost } = useSelector(
    (state) => state.cart
  );

  //for delivery radio
  const radioValues = {
    delivery: {
      value1: "visit-store",
      value2: "home-delivery",
    },
  };
  //for delivery radio.
  const [deliveryValue, setDeliveryValue] = useState(
    radioValues.delivery.value1
  );
  const deliveryRadioChange = (e) => {
    setDeliveryValue(e.target.value);
  };

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  //take the user to the cakes details page.
  const viewDetailsClickHandler = (selectedCake) => {
    navigate(`/cakes/${selectedCake?.id}`);
  };

  //triggers the remove item confirmation modal.
  const removeFromCartHandler = (selectedCake) => {
    navigate(`remove/${selectedCake?.id}`);
  };

  //navigates the user to the checkout page.
  const checkoutClickHandler = () => {
    navigate(
      `/checkout?d=${deliveryValue}&q=${cartItemNumber}&t=${cartTotalCost}`
    );
  };

  return (
    <div>
      <Navbar notHome />
      <main>
        <div className="cart__section section__sha-bor-pad">
          <Outlet />
          <h3>Cart</h3>
          <div className="cart__mainDiv ">
            <div className="cart__itemsDiv content__card">
              <div className="cart__itemsHeading br__padding__bottom">
                <h4>
                  <strong className="grey__text">
                    Cart{" "}
                    {cartItems.length > 1
                      ? "items (" + cartItems.length + ")"
                      : "item (" + cartItems.length + ")"}{" "}
                  </strong>
                </h4>
                <Link to="/cakes">
                  <p className="pointer">
                    <i className="far fa-hand-point-left fa-lg padding__right1rem"></i>
                    <strong className="grey__text">Buy more</strong>
                  </p>
                </Link>
              </div>
              {cartItems.length !== 0 ? (
                cartItems?.map((cake) => (
                  <div key={cake?.id} className="cart__item">
                    <div
                      className="cartItem__image row__flex"
                      onClick={() => viewDetailsClickHandler(cake)}
                    >
                      <img
                        className="img__max pointer"
                        src={cake?.image}
                        alt={cake?.name}
                      />
                    </div>
                    <div className="cartItem__body">
                      <p
                        className="pointer"
                        onClick={() => viewDetailsClickHandler(cake)}
                      >
                        {cake?.name}
                      </p>
                      <div className=" cartItem__qty-price-total">
                        <div className="cartItem__singlePrice">
                          <span>${cake?.price?.toFixed(2)}</span>
                        </div>

                        <div className="cartItem__quantityButtons row__flex">
                          <IconButton
                            onClick={() => dispatch(decreaseCartQty(cake))}
                          >
                            <RemoveCircleOutlineOutlinedIcon
                              sx={{
                                fontSize: 20,
                                padding: 0,
                                margin: 0,
                              }}
                            />
                          </IconButton>
                          <p className="qty__betweenButton">
                            <strong>{cake?.qty}</strong>
                          </p>
                          <IconButton
                            onClick={() => dispatch(increaseCartQty(cake))}
                          >
                            <AddCircleOutlineOutlinedIcon
                              sx={{ fontSize: 20, padding: 0, margin: 0 }}
                            />
                          </IconButton>
                        </div>

                        <div className="cartItem__totalPrice">
                          <span>
                            <strong>
                              ${(cake?.price * cake?.qty).toFixed(2)}
                            </strong>
                          </span>
                        </div>
                      </div>
                      <span
                        className="pointer cartItem__remove"
                        onClick={() => removeFromCartHandler(cake)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="cartItem__empty">
                  <h4 className="error">Your cart is empty</h4>
                </div>
              )}
            </div>
            <div className="cart__subtotalDiv content__card">
              <p className="br__padding__bottom">
                <strong className="grey__text">
                  Order quantity: {cartItemNumber}
                </strong>
              </p>
              {cartItems
                ? cartItems?.map((cake) => (
                    <div key={cake?.id} className="subtotal__itemList">
                      <p>{cake?.name}</p>
                      <p>
                        <strong>{cake?.qty}</strong> x{" "}
                        <strong>${cake?.price?.toFixed(2)}</strong>
                      </p>
                    </div>
                  ))
                : null}
              <div className="cart__totalCost br__padding__top">
                <p>
                  <strong className="grey__text">Total price: </strong>
                </p>
                <p>
                  <strong>${cartTotalCost?.toFixed(2)}</strong>
                </p>
              </div>
              <div className="cart__radioDelivery br__padding__top br__padding__bottom">
                <RadioInput
                  heading="Choice of Delivery"
                  label1="Visit store"
                  label2="Home delivery"
                  name="deliveryMode"
                  value1={radioValues.delivery.value1}
                  value2={radioValues.delivery.value2}
                  value={deliveryValue}
                  onChange={deliveryRadioChange}
                />
              </div>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="medium"
                disabled={cartItemNumber !== 0 ? false : true}
                sx={{
                  fontSize: 12,
                  width: "100%",
                }}
                onClick={() => checkoutClickHandler()}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

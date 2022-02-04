import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./RemoveModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../features/cartSlice";
import Button from "@mui/material/Button";

const RemoveModal = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  //fetching the selected cake from store.
  const { items } = useSelector((state) => state.cakes);
  const rCake = items.find((item) => id === item?.id);

  let navigate = useNavigate();

  useEffect(() => {
    //to avoid scrolling while pop-up.
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "visible";
    };
  }, []);

  //navigate to previous page.
  const goBackClickHandler = () => {
    navigate("/cart", { replace: true });
  };

  //remove from cart action.
  const removeCakeHandler = (selectedCake) => {
    dispatch(removeFromCart(rCake));
    navigate("/cart", { replace: true });
  };

  //its better to use React Modal while using pop-up.
  return ReactDOM.createPortal(
    <>
      <div className="removeModal__container">
        <div
          className="removeModal__overlay"
          onClick={() => goBackClickHandler()}
        ></div>
        <div className="removeModal__content">
          <p>
            You are about to Remove <br /> "{rCake?.name?.toUpperCase()}"
          </p>
          <div className="removeModal__buttonDiv br__padding__top">
            <Button
              color="secondary"
              variant="contained"
              size="small"
              sx={{
                fontSize: 11,
                textTransform: "capitalize",
              }}
              onClick={() => removeCakeHandler(rCake)}
            >
              Remove
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              sx={{
                fontSize: 11,
                textTransform: "capitalize",
              }}
              onClick={goBackClickHandler}
            >
              Abort
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default RemoveModal;

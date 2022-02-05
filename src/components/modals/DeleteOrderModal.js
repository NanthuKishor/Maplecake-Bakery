import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./RemoveModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { ordersFetch } from "../../features/ordersSlice";

const DeleteOrderModal = () => {
  let { id } = useParams();

  //fetching the selected order from store.
  const { deliveredOrders } = useSelector((state) => state.orders);
  const selectedOrder = deliveredOrders.find((order) => id === order?.id);

  const [clicked, setClicked] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

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
    navigate("/a/admin/orders/delivered", { replace: true });
  };

  //remove from cart action.
  const deleteOrderHandler = async (order) => {
    setClicked(true);
    await deleteDoc(doc(db, "orders", order?.id)).then(() => {
      navigate("/a/admin/orders/delivered", { replace: true });
      dispatch(ordersFetch());
      toast.error(`Deleted order from "${order?.customer_details?.email}" `);
    });
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
            You'r about to Delete order from <br /> "{selectedOrder?.customer_details?.email}"
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
              onClick={() => deleteOrderHandler(selectedOrder)}
            >
              {clicked ? <div className="loadingSpinner"></div> : "Delete"}
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              disabled={clicked ? true : false}
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

export default DeleteOrderModal;

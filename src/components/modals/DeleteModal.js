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
import { cakesFetch } from "../../features/cakesSlice";

const DeleteModal = () => {
  let { id } = useParams();

  //fetching the selected cake from store.
  const { items } = useSelector((state) => state.cakes);
  const dCake = items.find((item) => id === item?.id);

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
    navigate("/a/admin/products/modify", { replace: true });
  };

  //remove from cart action.
  const deleteCakeHandler = async (cake) => {
    setClicked(true);
    await deleteDoc(doc(db, "cakes", cake?.id)).then(() => {
      navigate("/a/admin/products/modify", { replace: true });
      dispatch(cakesFetch());
      toast.error(
        `Deleted "${
          cake?.name?.charAt(0).toUpperCase() + cake?.name?.slice(1)
        }" `
      );
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
            You are about to Delete <br /> "{dCake?.name?.toUpperCase()}"
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
              onClick={() => deleteCakeHandler(dCake)}
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

export default DeleteModal;

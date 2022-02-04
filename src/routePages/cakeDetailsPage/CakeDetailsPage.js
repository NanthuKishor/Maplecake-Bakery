import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  cakeFetch,
  clearCakeDetails,
  decreaseCakeQty,
  increaseCakeQty,
} from "../../features/cakeSlice";
import "./CakeDetailsPage.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { addToCart } from "../../features/cartSlice";

const CakeDetailsPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const {
    item: clickedCake,
    error,
    status,
  } = useSelector((state) => state.cake);

  useEffect(() => {
    window.scrollTo(0, 0);
    //to fetch the particular cake.
    dispatch(cakeFetch(id));
    return () => {
      //to clear the state.
      dispatch(clearCakeDetails());
    };
  }, [dispatch, id]);

  //add to cart click handler.
  const addToCartHandler = (selectedCake) => {
    dispatch(addToCart(selectedCake));
  };

  //go to the previous page.
  let navigate = useNavigate();
  const backButtonHandler = () => {
    navigate(-1, { replace: true });
  };

  return (
    <main>
      <div className="cakeDetails__section section__sha-bor-pad">
        {status ? (
          <LoadingBar />
        ) : error ? (
          <h3 className="error">{error}</h3>
        ) : (
          <div key={clickedCake?.id} className="cakeDetails__content">
            <div className="cakeDetails__image">
              <img
                className="img__max"
                src={clickedCake?.image}
                alt={clickedCake?.name}
              />
            </div>
            <div className="cakeDetails__body">
              <h3>{clickedCake?.name}</h3>
              <div className="cakeDetails__price">
                <p>
                  <strong className="grey__text">Price: </strong>
                </p>
                <p>
                  <strong>${clickedCake?.price?.toFixed(2)}</strong>
                </p>
              </div>
              <div className="cakeDetails__quantity">
                <p>
                  <strong className="grey__text">Quantity: </strong>
                </p>
                <div className="cakeDetails__quantity__buttons row__flex">
                  <IconButton
                    onClick={() => dispatch(decreaseCakeQty(clickedCake))}
                  >
                    <RemoveCircleOutlineOutlinedIcon
                      sx={{
                        fontSize: 25,
                        padding: 0,
                        margin: 0,
                      }}
                    />
                  </IconButton>
                  <p>
                    <strong>{clickedCake?.qty}</strong>
                  </p>
                  <IconButton
                    onClick={() => dispatch(increaseCakeQty(clickedCake))}
                  >
                    <AddCircleOutlineOutlinedIcon
                      sx={{ fontSize: 25, padding: 0, margin: 0 }}
                    />
                  </IconButton>
                </div>
              </div>
              <div className="cakeDetails__description">
                <p>
                  <strong className="grey__text">Description: </strong>
                </p>

                <p>{clickedCake?.description}</p>
              </div>
              <Button
                color="secondary"
                variant="contained"
                size="medium"
                sx={{
                  fontSize: 12,
                  marginTop: 2,
                  width: "100%",
                }}
                onClick={() => addToCartHandler(clickedCake)}
              >
                Add to Cart
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="medium"
                sx={{
                  fontSize: 12,
                  width: "100%",
                }}
                onClick={() => backButtonHandler()}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CakeDetailsPage;

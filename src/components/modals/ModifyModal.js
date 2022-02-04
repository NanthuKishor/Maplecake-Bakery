import ReactDOM from "react-dom";
import { useEffect } from "react";
import "./RemoveModal.css";
import "../../routePages/checkoutPage/CheckoutPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { cakesFetch } from "../../features/cakesSlice";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductFormSchema } from "../../validations/addProductForm";
import SingleLineInput from "../formInputs/SingleLineInput";
import LoadingBar from "../loadingBar/LoadingBar";

const ModifyModal = () => {
  let { id } = useParams();

  //fetching the selected cake from store.
  const { items } = useSelector((state) => state.cakes);
  const mCake = items.find((item) => id === item?.id);

  const [clicked, setClicked] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductFormSchema),
  });

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

  const onSubmit = async (data) => {
    setClicked(true);

    const cakesRef = doc(db, "cakes", id);
    await updateDoc(cakesRef, {
      name: data?.name,
      image: data?.image,
      price: Number(data?.price),
      description: data?.description,
      timeStamp: serverTimestamp(),
    }).then(() => {
      navigate("/a/admin/products/modify", { replace: true });
      dispatch(cakesFetch());
      toast.success(
        `Updated "${
          data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1)
        }" `
      );
    });
  };

  //its better to use React Modal while using pop-up.
  return ReactDOM.createPortal(
    <main>
      <div className="removeModal__container">
        <div
          className="removeModal__overlay"
          onClick={() => goBackClickHandler()}
        ></div>
        <div className="modifyModal__content">
          <div className="checkout__formDiv">
            {mCake ? (
              <div className="checkout__form">
                <p>
                  <strong>Edit {mCake?.name}</strong>
                </p>
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
                  <div>
                    <SingleLineInput
                      type="text"
                      name="name"
                      label="Item name"
                      register={register}
                      error={errors.name?.message}
                      required={true}
                      defaultValue={mCake?.name}
                    />
                    <SingleLineInput
                      type="text"
                      name="image"
                      label="Image link"
                      register={register}
                      error={errors.image?.message}
                      required={true}
                      defaultValue={mCake?.image}
                    />
                    <SingleLineInput
                      type="text"
                      name="price"
                      label="Price"
                      register={register}
                      error={errors.price?.message}
                      required={true}
                      defaultValue={mCake?.price}
                    />
                    <SingleLineInput
                      type="text"
                      name="description"
                      label="Description"
                      register={register}
                      error={errors.description?.message}
                      required={true}
                      defaultValue={mCake?.description}
                    />
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      disabled={clicked ? true : false}
                      sx={{
                        fontSize: 11,
                        width: "100%",
                      }}
                    >
                      {clicked ? (
                        <div className="loadingSpinner"></div>
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </Box>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  disabled={clicked ? true : false}
                  sx={{
                    fontSize: 11,
                  }}
                  onClick={goBackClickHandler}
                >
                  Abort
                </Button>
              </div>
            ) : (
              <div>
                <LoadingBar />
                <p className="error">Please Wait or Try again</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>,
    document.getElementById("modal-root")
  );
};

export default ModifyModal;

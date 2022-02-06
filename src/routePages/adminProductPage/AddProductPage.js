import { useState } from "react";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import FloatingButton from "../../components/floatingActionButton/FloatingButton";
import "./AdminProductPage.css";
import "../checkoutPage/CheckoutPage.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductFormSchema } from "../../validations/addProductForm";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { productFetch } from "../../features/newProductSlice";
import LoadingBar from "../../components/loadingBar/LoadingBar";
import { useEffect } from "react";
import SingleLineInput from "../../components/formInputs/SingleLineInput";

const AddProductPage = () => {
  const { newProduct, status, error } = useSelector(
    (state) => state.newProduct
  );
  const [buttonClicked, setButtonClicked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductFormSchema),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onSubmit = async (data) => {
    setButtonClicked(true);
    console.log(data);
    const docRef = await addDoc(collection(db, "cakes"), {
      name: data?.name,
      image: data?.image,
      price: Number(data?.price),
      description: data?.description,
      timeStamp: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    dispatch(productFetch(docRef.id));
    toast.success("Successfully added new item");
    setButtonClicked(false);
    reset();
  };

  return (
    <div>
      <AdminNavbar />
      <main>
        <div className="products__section section__sha-bor-pad">
          <div className="floatingButton__div">
            <FloatingButton
              link="/a/admin/products"
              children="Add New Product"
            />
            <FloatingButton
              link="/a/admin/products/modify"
              children="Modify Products"
            />
          </div>
          <h3>Add New products</h3>
          <div className="checkout__formDiv">
            <div className="checkout__form">
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
                  />
                  <SingleLineInput
                    type="text"
                    name="image"
                    label="Image link"
                    register={register}
                    error={errors.image?.message}
                    required={true}
                  />
                  <SingleLineInput
                    type="text"
                    name="price"
                    label="Price"
                    register={register}
                    error={errors.price?.message}
                    required={true}
                  />
                  <SingleLineInput
                    type="text"
                    name="description"
                    label="Description"
                    register={register}
                    error={errors.description?.message}
                    required={true}
                  />
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="medium"
                    disabled={buttonClicked ? true : false}
                    sx={{
                      fontSize: 12,
                      width: "100%",
                      marginTop: 2,
                    }}
                  >
                    {buttonClicked ? (
                      <div className="loadingSpinner"></div>
                    ) : (
                      "Add Cake"
                    )}
                  </Button>
                </div>
              </Box>
            </div>
          </div>
          {status ? (
            <LoadingBar />
          ) : error ? (
            <h3 className="error">{error}</h3>
          ) : newProduct.length !== 0 ? (
            <div className="newProduct__section">
              <div className="newProduct__image">
                <img
                  className="img__max"
                  src={newProduct?.image}
                  alt={newProduct?.name}
                />
              </div>
              <div className="newProduct__content">
                <p>
                  <strong className="grey__text">Name: </strong>
                  {newProduct?.name}
                </p>
                <p>
                  <strong className="grey__text">Price: </strong>$
                  {newProduct?.price?.toFixed(2)}
                </p>
                <p className="product__description">
                  <strong className="grey__text">Description: </strong>
                  {newProduct?.description}
                </p>
                <p className="success">
                  <strong className="grey__text">Added on: </strong>
                  {newProduct?.timeStamp?.toDate().toDateString()} +{" "}
                  {newProduct?.timeStamp?.toDate().toLocaleTimeString("en-US")}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;

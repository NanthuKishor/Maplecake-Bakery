import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "./RemoveModal.css";
import { useNavigate } from "react-router-dom";
import SingleLineInput from "../formInputs/SingleLineInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetEmailFormSchema } from "../../validations/resetEmailForm";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const ForgotPasswordModal = () => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetEmailFormSchema),
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
    navigate("/a/admin-login", { replace: true });
  };

  const onSubmit = async (data) => {
    setClicked(true);
    sendPasswordResetEmail(auth, data?.email)
      .then(() => {
        setError("");
        alert("Password Reset email sent. Check Email-id");
        toast.info("Click the Link in received Email");
        navigate(-1, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setClicked(false);
      });
    console.log(data);
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
            <div className="checkout__form">
              <p>Enter your Email to receive a Password Reset mail.</p>
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
                    name="email"
                    label="Email"
                    register={register}
                    error={errors.email?.message}
                    required={true}
                  />
                  {error ? (
                    <h4 className="error br__padding__bottom">{error}</h4>
                  ) : null}
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
                      "Send Mail"
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
          </div>
        </div>
      </div>
    </main>,
    document.getElementById("modal-root")
  );
};

export default ForgotPasswordModal;

import { useState } from "react";
import "./AdminLoginPage.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminLoginFormSchema } from "../../validations/adminLoginForm";
import { useNavigate, Outlet } from "react-router-dom";
import SingleLineInput from "../../components/formInputs/SingleLineInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AdminLoginPage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminLoginFormSchema),
  });
  let navigate = useNavigate();

  const handleNotAdmin = () => {
    navigate("/", { replace: true });
  };
  const forgotPasswordHandler = () => {
    navigate("reset-password");
  };

  const onSubmit = (data) => {
    setButtonClicked(true);
    const email = data?.email;
    const password = data?.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        navigate("/a/admin/orders", { replace: true });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage);
        setError(errorMessage);
        setButtonClicked(false);
      });
  };
  return (
    <div>
      <main>
        <div className="adminLogin__section section__sha-bor-pad column__flex">
          <h3>Admin</h3>
          <div className="checkout__formDiv">
            <p>
              <strong>Admin Login credentials</strong>
            </p>
            <Outlet />

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
                <div>
                  <SingleLineInput
                    type="text"
                    name="email"
                    label="Email Id"
                    register={register}
                    error={errors.email?.message}
                    required={true}
                  />
                  <SingleLineInput
                    type="password"
                    name="password"
                    label="Password"
                    register={register}
                    error={errors.password?.message}
                    required={true}
                  />
                  <h5
                    className="purple__text pointer"
                    onClick={forgotPasswordHandler}
                  >
                    Forgot password ?
                  </h5>
                  {error ? (
                    <h4 className="error br__padding__top">{error}</h4>
                  ) : null}
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="small"
                    disabled={buttonClicked ? true : false}
                    sx={{
                      fontSize: 11,
                      width: "100%",
                      marginTop: 2,
                    }}
                  >
                    {buttonClicked ? (
                      <div className="loadingSpinner"></div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Box>

              <div className="notAdmin__section br__padding__top">
                <p>I'm not the Admin</p>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  disabled={buttonClicked ? true : false}
                  sx={{
                    fontSize: 11,
                    width: "100%",
                    marginTop: 1,
                  }}
                  onClick={handleNotAdmin}
                >
                  Home Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;

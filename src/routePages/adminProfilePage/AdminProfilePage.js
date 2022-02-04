import "../adminProductPage/AdminProductPage.css";
import "../checkoutPage/CheckoutPage.css";
import "./AdminProfilePage.css";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import { auth } from "../../firebaseConfig";
import SingleLineInput from "../../components/formInputs/SingleLineInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { changePasswordFormSchema } from "../../validations/changePasswordForm";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminProfilePage = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordFormSchema),
  });

  let navigate = useNavigate();

  const onSubmit = (data) => {
    setButtonClicked(true);
    if (data?.newPassword !== data?.confirmPassword) {
      setButtonClicked(false);
      alert("Passwords doesn't match");
      reset();
    } else {
      //firebase
      const user = auth.currentUser;
      const newPassword = data?.newPassword;
      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          setButtonClicked(false);
          signOut(auth)
            .then(() => {
              navigate("/a/admin-login", { replace: true });
            })
            .catch((error) => {
              alert(error.message);
            });
          toast.success("New password set. Login again");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          setButtonClicked(false);
        });
    }
  };

  return (
    <div>
      <AdminNavbar />
      <main>
        <div className="products__section section__sha-bor-pad">
          <h3>Admin Profile</h3>
          <div className="checkout__formDiv">
            <div className="checkout__form">
              <div className="profile__email">
                <p>
                  <strong className="grey__text">Admin Email-id: </strong>
                </p>
                <p>{auth?.currentUser?.email}</p>
              </div>
              <div className="column__flex profile__password">
                <p>
                  <strong className="grey__text">Change password</strong>
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
                  <SingleLineInput
                    type="password"
                    name="newPassword"
                    label="Enter New-Password"
                    register={register}
                    error={errors.newPassword?.message}
                    required={true}
                  />
                  <SingleLineInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm New-Password"
                    register={register}
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
                    disabled={buttonClicked ? true : false}
                    sx={{
                      fontSize: 11,
                      width: "100%",
                      marginTop: 2,
                      textTransform: "capitalize",
                    }}
                  >
                    {buttonClicked ? (
                      <div className="loadingSpinner"></div>
                    ) : (
                      "Change password"
                    )}
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfilePage;

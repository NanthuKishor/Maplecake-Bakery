import * as yup from "yup";

export const changePasswordFormSchema = yup
  .object()
  .shape({
    newPassword: yup
      .string("Should be a string")
      .min(8, "Password should be atleast 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Atleast 1 Letter, Number & Special character"
      )
      .required("Password is required"),
  })
  .required();

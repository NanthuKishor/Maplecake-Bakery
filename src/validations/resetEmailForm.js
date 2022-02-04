import * as yup from "yup";

export const resetEmailFormSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Email must be a valid Email")
      .required("Email is required"),
  })
  .required();

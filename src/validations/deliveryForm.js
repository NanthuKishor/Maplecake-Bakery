import * as yup from "yup";

export const deliveryFormSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(40, "Full name must be at most 40 characters")
      .matches(/^[a-zA-Z][a-zA-Z\s]*$/, "Should be in letters only")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Email must be a valid Email")
      .required("Email is required"),
    street: yup
      .string()
      .min(3, "Street must be at least 3 characters")
      .matches(
        /^[#a-zA-Z0-9][a-zA-Z0-9#\s]*$/,
        "No special characters allowed"
      ),
    city: yup
      .string()
      .min(3, "City must be at least 3 characters")
      .matches(/^[a-zA-Z][a-zA-Z\s]*$/, "Should be in letters only"),
    zipCode: yup
      .string()
      .min(5, "Zip code must be at least 5 characters")
      .matches(/^[0-9][0-9]*$/, "Should be in numbers only"),
    dialerCode: yup
      .string("Enter a valid Country-Code")
      .min(2, "Code must be atleast 1 number")
      .required("Dialer code is required"),
    phone: yup
      .string("Enter a valid Number")
      .min(10, "Phone must be at least 10 numbers")
      .max(10, "Phone must be maximum of 10 numbers")
      .matches(/^[0-9][0-9]+$/, "Should use only numbers")
      .required("Phone no. is required"),
  })
  .required();

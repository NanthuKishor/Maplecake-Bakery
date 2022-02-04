import * as yup from "yup";

export const addProductFormSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(
        /^[A-Z][a-zA-Z\s]+$/,
        "Should be alphabets, first letter being Upper case"
      )
      .required("Item name is required"),
    image: yup
      .string()
      .url("Enter a valid link for image")
      .required("Image link is required"),
    price: yup
      .string()
      .matches(
        /^[0-9]+(?:\.[0-9]{1,2})?$/,
        "Price should be in ex: 99 or 99.00 format"
      )
      .required("Item price is required"),
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(100, "Cannot exceed 100 characters")
      .required("Description is required"),
  })
  .required();

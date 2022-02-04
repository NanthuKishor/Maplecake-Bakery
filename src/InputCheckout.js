import TextField from "@mui/material/TextField";

const InputCheckout = ({ type, name, label, error, register, required }) => {
  return (
    <TextField
      id={name}
      type={type}
      name={name}
      label={label}
      error={error ? true : false}
      helperText={error ? error : ""}
      {...register(name)}
      fullWidth
      size="small"
      required={required}
      color="secondary"
      InputLabelProps={{ style: { fontSize: 13 } }}
      sx={{
        "& .MuiInputBase-root": {
          fontSize: 14,
        },
        "& .MuiFormHelperText-root": {
          fontSize: 11,
        },
      }}
    />
  );
};

export default InputCheckout;

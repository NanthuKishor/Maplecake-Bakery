import TextField from "@mui/material/TextField";

const PhoneInputField = ({ type, name, label, error, register }) => {
  return (
    <TextField
      id={name}
      type={type}
      name={name}
      label={label}
      error={error ? true : false}
      helperText={error ? error : ""}
      {...register(name)}
      size="small"
      required
      fullWidth
      color="secondary"
      InputLabelProps={{ style: { fontSize: 13 } }}
      sx={{
        "& .MuiInputBase-root": {
          fontSize: 14,
        },
        "& .MuiFormHelperText-root": {
          fontSize: 11
        }
      }}
    />
  );
};

export default PhoneInputField;

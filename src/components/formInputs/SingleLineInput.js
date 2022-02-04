import TextField from "@mui/material/TextField";

const SingleLineInput = ({
  type,
  name,
  label,
  error,
  register,
  required,
  defaultValue,
}) => {
  return (
    <TextField
      aria-label={label}
      id={name}
      type={type}
      name={name}
      label={label}
      defaultValue={defaultValue}
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

export default SingleLineInput;

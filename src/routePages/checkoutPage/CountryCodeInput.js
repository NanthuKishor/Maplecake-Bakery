import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import countryDialCodes from "../../utilities/countryDialCodes";

const CountryCodeInput = ({ type, name, label, error, register }) => {
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
          width: "100%",
        },
        "& .MuiFormHelperText-root": {
          fontSize: 11,
        },
      }}
      select
      defaultValue="+91"
    >
      {countryDialCodes.map((country) => (
        <MenuItem
          key={country.name}
          value={country.dialCode}
          sx={{
            fontSize: 12,
          }}
        >
          {`(${country.dialCode}) ${country.name}`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CountryCodeInput;

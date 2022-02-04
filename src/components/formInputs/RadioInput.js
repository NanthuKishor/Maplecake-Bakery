import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioInput = ({
  heading,
  value,
  value1,
  value2,
  label1,
  label2,
  name,
  onChange,
}) => {
  return (
    <FormControl
      component="fieldset"
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: 12,
          fontFamily: "Montserrat, sans-serif",
        },
      }}
    >
      <FormLabel
        component="legend"
        sx={{
          fontSize: 13,
          color: "black",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold",
        }}
      >
        {heading}
      </FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        defaultValue={value1}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel
          value={value1}
          control={
            <Radio
              disabled={false}
              color="secondary"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
              }}
            />
          }
          label={label1}
        />
        <FormControlLabel
          value={value2}
          control={
            <Radio
              disabled={false}
              color="secondary"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
              }}
            />
          }
          label={label2}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;

import React, { FC } from "react";
import { FormControl, TextField, Box, Grid, Slider } from "@mui/material";
import { marsEarthDateConversions } from "@/utils/marsEarthDateConversions";
interface MartianCalendarProps {
  setMartianSol: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
  landingDate: string;
}
const MartianCalendar: FC<MartianCalendarProps> = ({
  setMartianSol,
  disabled,
  landingDate,
}) => {
  const maxSol = marsEarthDateConversions.getMaxSol(landingDate);

  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(maxSol);

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: Math.floor(maxSol * 0.25),
      label: Math.floor(maxSol * 0.25),
    },
    {
      value: Math.floor(maxSol * 0.5),
      label: Math.floor(maxSol * 0.5),
    },
    {
      value: Math.floor(maxSol * 0.75),
      label: Math.floor(maxSol * 0.75),
    },
    {
      value: maxSol,
      label: maxSol,
    },
  ];

  const handleSliderChange = (event: Event, newValue: number) => {
    setValue(newValue);
    setMartianSol(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (Number(value) < 0) {
      setValue(0);
      setMartianSol(0);
    } else if (Number(value) > maxSol) {
      setValue(maxSol);
      setMartianSol(maxSol);
    }
  };

  return (
    <FormControl sx={{ m: 1, minHeight: 300, minWidth: 300, maxWidth: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <div
          style={{
            padding: "40px 0px 40px 10px",
            borderRadius: "4px",
            // border: "1px solid #bab8b7",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                disabled={disabled}
                step={1}
                max={maxSol}
                marks={marks}
                color={"warning" as "primary"}
              />
            </Grid>
            <Grid item>
              <TextField
                value={value}
                label={"Sol"}
                color="warning"
                variant="outlined"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: maxSol,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </FormControl>
  );
};

export default MartianCalendar;

import React, { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DateType } from "../interfaces/mainInterfaces";

interface DateTypeSelectProps {
  dateType: DateType;
  setDateType: React.Dispatch<React.SetStateAction<DateType>>;
}
const DateTypeSelect: FC<DateTypeSelectProps> = ({ dateType, setDateType }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 300, maxWidth: "100%" }}>
      <InputLabel id="camera-select-label">Date type</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        value={dateType}
        label="dateType"
        onChange={(e) => setDateType(e.target.value as DateType)}
      >
        <MenuItem value={"sol"}>Mars Sol</MenuItem>
        <MenuItem value={"earth"}>Earth date</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateTypeSelect;

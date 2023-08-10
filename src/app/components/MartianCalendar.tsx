import React, { FC } from "react";
import { FormControl, TextField } from "@mui/material";

interface MartianCalendarProps {
  martianSol: number;
  setMartianSol: React.Dispatch<React.SetStateAction<number>>;
}
const MartianCalendar: FC<MartianCalendarProps> = ({
  martianSol,
  setMartianSol,
}) => {
  return (
    <FormControl sx={{ m: 1, minHeight: 300, minWidth: 300, maxWidth: "100%" }}>
      <TextField
        id="filled-number"
        label="Martian Sol"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={martianSol}
        onChange={(e) => setMartianSol(Number(e.target.value))}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />
    </FormControl>
  );
};

export default MartianCalendar;

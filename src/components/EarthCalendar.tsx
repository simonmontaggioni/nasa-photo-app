import React, { FC } from "react";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";

interface EarthCalendarProps {
  earthDate: Dayjs | null;
  setEarthDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  disabled: boolean;
}
const EarthCalendar: FC<EarthCalendarProps> = ({
  earthDate,
  setEarthDate,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <DateCalendar
          value={earthDate}
          onChange={(newValue) => setEarthDate(newValue)}
          disableFuture
          disabled={disabled}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default EarthCalendar;

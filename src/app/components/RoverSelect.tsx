import { FC, useState } from "react";
import {
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Rover } from "../interfaces/mainInterfaces";

const RoverSelectStyles = {
  container: { display: "flex", alignItems: "center" },
  formControl: { mr: 1, minWidth: 120, width: "100%" },
  avatar: { width: 56, height: 56 },
};

interface RoverSelectProps {
  rovers: Rover[];
  selectedRover: string;
  setSelectedRover: React.Dispatch<React.SetStateAction<string>>;
}
const RoverSelect: FC<RoverSelectProps> = ({
  rovers,
  selectedRover,
  setSelectedRover,
}) => {
  return (
    <Grid item xs={12} mb={2} style={RoverSelectStyles.container}>
      <FormControl sx={RoverSelectStyles.formControl}>
        <InputLabel id="rover-select-label">Rover</InputLabel>
        <Select
          labelId="rover-select-label"
          id="rover-select"
          value={selectedRover}
          label="rover"
          onChange={(e) => setSelectedRover(e.target.value)}
          fullWidth
        >
          {rovers.map((rover) => (
            <MenuItem key={rover.name} value={rover.name}>
              {rover.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Avatar
        src={`/${selectedRover}.jpeg`}
        alt={selectedRover}
        sx={RoverSelectStyles.avatar}
      ></Avatar>
    </Grid>
  );
};

export default RoverSelect;

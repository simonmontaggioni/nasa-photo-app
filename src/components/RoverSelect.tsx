import { FC, useState } from "react";
import {
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Rover, RoverName } from "../interfaces/mainInterfaces";

const RoverSelectStyles = {
  container: { display: "flex", alignItems: "center" },
  formControl: { mr: 1, minWidth: 120, width: "100%" },
  avatar: { width: 56, height: 56 },
};

interface RoverSelectProps {
  rovers: Rover[];
  selectedRover: Rover;
  setSelectedRover: (newRover: Rover) => void;
  disabled: boolean;
}
const RoverSelect: FC<RoverSelectProps> = ({
  rovers,
  selectedRover,
  setSelectedRover,
  disabled,
}) => {
  const handleChangeRover = (newRoverName: RoverName) => {
    const newRover = rovers.find((rover: Rover) => rover.name === newRoverName);
    setSelectedRover(newRover as Rover);
  };
  return (
    <Grid item xs={12} mb={2} style={RoverSelectStyles.container}>
      <FormControl sx={RoverSelectStyles.formControl}>
        <InputLabel id="rover-select-label">Rover</InputLabel>
        <Select
          labelId="rover-select-label"
          id="rover-select"
          value={selectedRover.name}
          label="rover"
          onChange={(e) => handleChangeRover(e.target.value as RoverName)}
          fullWidth
          disabled={disabled}
        >
          {rovers.map((rover) => (
            <MenuItem key={rover.name} value={rover.name}>
              {rover.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Avatar
        src={`/${selectedRover.name}.jpeg`}
        alt={selectedRover.name}
        sx={RoverSelectStyles.avatar}
      ></Avatar>
    </Grid>
  );
};

export default RoverSelect;

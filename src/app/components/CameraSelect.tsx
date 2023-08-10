import React, { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Camera, Rover } from "../interfaces/mainInterfaces";

interface CameraSelectProps {
  rovers: Rover[];
  selectedRover: string;
  camera: string;
  setCamera: React.Dispatch<React.SetStateAction<string>>;
}

const CameraSelect: FC<CameraSelectProps> = ({
  rovers,
  selectedRover,
  setCamera,
  camera,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 300, maxWidth: "100%" }}>
      <InputLabel id="camera-select-label">Camera</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        value={camera}
        label="camera"
        onChange={(e) => setCamera(e.target.value)}
      >
        {rovers
          .filter((rover: Rover) => rover.name === selectedRover)[0]
          .cameras.map((camera: Camera) => (
            <MenuItem key={camera.name} value={camera.name}>
              {camera.full_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CameraSelect;

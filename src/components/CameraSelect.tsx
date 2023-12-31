import React, { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Camera, CameraName, Rover } from "../interfaces/mainInterfaces";

interface CameraSelectProps {
  rovers: Rover[];
  selectedRover: Rover;
  camera: CameraName;
  setCamera: React.Dispatch<React.SetStateAction<CameraName>>;
  disabled: boolean;
}

const CameraSelect: FC<CameraSelectProps> = ({
  rovers,
  selectedRover,
  setCamera,
  camera,
  disabled,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 300, maxWidth: "100%" }}>
      <InputLabel id="camera-select-label">Camera</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        value={camera}
        label="camera"
        onChange={(e) => setCamera(e.target.value as CameraName)}
        disabled={disabled}
      >
        {selectedRover.cameras.map((camera: Camera) => (
          <MenuItem key={camera.name} value={camera.name}>
            {camera.full_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CameraSelect;

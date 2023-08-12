import React, { FC } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { Rover } from "@/interfaces/mainInterfaces";

interface RoverImageContainerProps {
  selectedRover: Rover;
}
const RoverImageContainer: FC<RoverImageContainerProps> = ({
  selectedRover,
}) => {
  return (
    <Grid item xs={4} sm={4} md={6}>
      <Image
        width={400}
        height={500}
        alt={selectedRover.name}
        src={`/${selectedRover.name}.webp`}
        priority
      />
    </Grid>
  );
};

export default RoverImageContainer;

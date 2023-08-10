import React, { FC } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";

interface RoverImageContainerProps {
  selectedRover: string;
}
const RoverImageContainer: FC<RoverImageContainerProps> = ({
  selectedRover,
}) => {
  return (
    <Grid item xs={4} sm={4} md={6}>
      <Image
        width={400}
        height={500}
        alt={selectedRover}
        src={`/${selectedRover}.webp`}
        priority
      />
    </Grid>
  );
};

export default RoverImageContainer;

import React, { FC, forwardRef, useState } from "react";
import Image from "next/image";
import {
  Box,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhotoDetails from "./PhotoDetail";
import { Photo } from "../interfaces/mainInterfaces";
import { handleFavorite } from "../utils/handleFavorite";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCardBase: FC<PhotoCardProps> = ({ photo }) => {
  const [open, setOpen] = useState(false);

  const isInFav = !!handleFavorite.isInFavorites(photo as Photo);
  const photoTitle = `Id: ${photo?.id}`;
  const photoSubtitle = `${photo?.rover.name} - ${photo.camera.name} - ${photo.earth_date}`;
  const photoInfo = `Photo ${photo?.id}, captured at ${photo?.earth_date} in mars exploration by ${photo?.rover.name} rover with the ${photo?.camera.full_name}.`;
  return (
    <ImageListItem>
      <Image
        src={photo.img_src}
        alt={`${photo.id}`}
        loading="lazy"
        fill
        onClick={() => setOpen(true)}
      />
      <ImageListItemBar
        title={photoTitle}
        subtitle={photoSubtitle}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={photoInfo}
          >
            <StarIcon sx={{ color: isInFav ? "gold" : "" }} />
          </IconButton>
        }
      />
      <PhotoDetails open={open} handleClose={setOpen} photo={photo} />
    </ImageListItem>
  );
};

const PhotoCard = forwardRef((props: PhotoCardProps, ref) => {
  const { photo } = props as PhotoCardProps;
  return (
    <Box ref={ref}>
      <PhotoCardBase photo={photo} />
    </Box>
  );
});
PhotoCard.displayName = "PhotoCard";
export default PhotoCard;

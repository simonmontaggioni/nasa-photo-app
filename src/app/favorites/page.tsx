"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Stack,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhotoDetails from "../components/PhotoDetail";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import { Photo } from "../interfaces/mainInterfaces";
import { handleFavorite } from "../utils/handleFavorite";
import styles from "./page.module.css";
import Link from "next/link";

const COLUMS_BY_MEDIASIZE = {
  xs: 2,
  sm: 3,
  sm2: 3,
  md: 4,
  lg: 5,
  xl: 5,
};

const FavoritePage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [open, setOpen] = useState(false);
  const mediaSize = useGetMediaSize();
  const handleClickOpen = (photo: Photo) => {
    setOpen(true);
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className={styles.main}>
      <Paper
        elevation={4}
        sx={{
          padding: "10px 20px",
          marginTop: "40px",
          backgroundColor: "rgba(255,255,255,.15)",
          backdropFilter: "blur",
          margin: "auto",
        }}
        className={styles.fade_in}
      >
        <PhotoDetails
          open={open}
          handleClose={handleClose}
          photo={selectedPhoto}
        />
        <ImageList
          cols={COLUMS_BY_MEDIASIZE[mediaSize] || 1}
          rowHeight={200}
          gap={20}
          sx={{ width: "90vw", height: "75vh", paddingRight: "10px" }}
        >
          {handleFavorite.getFavorites().map((photo, index) => {
            const photoTitle = `${photo?.rover.name} - ${photo?.id}`;
            return (
              <ImageListItem key={photo.id}>
                <Image
                  src={photo.img_src}
                  alt={`${photo.id}`}
                  loading="lazy"
                  fill
                  onClick={() => handleClickOpen(photo)}
                />
                <ImageListItemBar
                  title={photoTitle}
                  subtitle={photo.id}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${photoTitle}`}
                    >
                      <StarIcon sx={{ color: "gold" }} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
        <Stack
          direction={
            ["sm", "md", "lg", "xl"].includes(mediaSize) ? "row" : "column"
          }
          sx={{ justifyContent: "end", paddingTop: "20px" }}
        >
          <Link href={"/"}>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => {}}
            >
              home
            </Button>
          </Link>
        </Stack>
      </Paper>
    </main>
  );
};

export default FavoritePage;

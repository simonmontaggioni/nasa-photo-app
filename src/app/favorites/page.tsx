"use client";
import React, { useState } from "react";
import { Button, Stack, Paper, ImageList } from "@mui/material";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import { Photo } from "../interfaces/mainInterfaces";
import { handleFavorite } from "../utils/handleFavorite";
import styles from "./page.module.css";
import Link from "next/link";
import PhotoCard from "../components/PhotoCard";

const COLUMS_BY_MEDIASIZE = {
  xs: 2,
  sm: 3,
  sm2: 3,
  md: 4,
  lg: 5,
  xl: 5,
};

const FavoritePageStyles = {
  paper: {
    padding: "10px 20px",
    marginTop: "40px",
    backgroundColor: "rgba(255,255,255,.15)",
    backdropFilter: "blur",
    margin: "auto",
  },
  imageList: { width: "90vw", height: "75vh", paddingRight: "10px" },
};

const FavoritePage = () => {
  const mediaSize = useGetMediaSize();

  return (
    <main className={styles.main}>
      <Paper
        elevation={4}
        sx={FavoritePageStyles.paper}
        className={styles.fade_in}
      >
        <ImageList
          cols={COLUMS_BY_MEDIASIZE[mediaSize] || 1}
          rowHeight={200}
          gap={20}
          sx={FavoritePageStyles.imageList}
        >
          {handleFavorite.getFavorites().map((photo: Photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </ImageList>
        <Stack
          direction={"row"}
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

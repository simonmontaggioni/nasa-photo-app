import React, { FC, useEffect, useRef, useState } from "react";
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
import styles from "../page.module.css";
import PhotoDetails from "./PhotoDetail";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import { Photo, RequestPhotosParams } from "../interfaces/mainInterfaces";

const COLUMS_BY_MEDIASIZE = {
  xs: 2,
  sm: 3,
  sm2: 3,
  md: 4,
  lg: 5,
  xl: 5,
};

interface PhotoGalleryProps {
  loading: boolean;
  photosData: Photo[];
  showRoverForm: boolean;
  setShowRoverForm: React.Dispatch<React.SetStateAction<boolean>>;
  requestPhotosParams: RequestPhotosParams | null;
  requestPhotos: (requestPhotosParams: RequestPhotosParams) => void;
}
const PhotoGallery: FC<PhotoGalleryProps> = ({
  loading,
  photosData,
  showRoverForm,
  setShowRoverForm,
  requestPhotosParams,
  requestPhotos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [open, setOpen] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const mediaSize = useGetMediaSize();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isIntersecting && !showRoverForm && !loading)
          setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-20px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  });

  useEffect(() => {
    if (isIntersecting && !loading) {
      const requestParams: RequestPhotosParams = {
        ...(requestPhotosParams as RequestPhotosParams),
        page: (requestPhotosParams?.page || 0) + 1,
      };
      requestPhotos(requestParams);
      setIsIntersecting(false);
      ref.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, loading, requestPhotosParams]);

  const handleClickOpen = (photo: Photo) => {
    setOpen(true);
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const opacityValue = showRoverForm ? 0 : 1;
  const zIndexValue = showRoverForm ? 0 : 1;
  const pointerActions = showRoverForm ? "none" : "all";
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "10px 20px",
        marginTop: "20px",
        backgroundColor: "rgba(255,255,255,.15)",
        backdropFilter: "blur",
        opacity: opacityValue,
        position: "absolute",
        zIndex: zIndexValue,
        margin: "auto",
        pointerEvents: pointerActions,
      }}
      className={!showRoverForm ? styles.fade_in : styles.fade_out}
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
        {photosData.map((photo, index) => {
          const photoTitle = `${photo?.rover.name} - ${photo?.id}`;
          return (
            <ImageListItem key={photo.id} ref={ref}>
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
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => setShowRoverForm(!showRoverForm)}
        >
          {loading ? "loading more photos" : "Change Filters"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PhotoGallery;

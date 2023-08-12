import React, { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Stack,
  Paper,
  ImageList,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import { Photo, RequestPhotosParams } from "../interfaces/mainInterfaces";
import PhotoCard from "./PhotoCard";
import styles from "../app/page.module.css";

const COLUMS_BY_MEDIASIZE = {
  xs: 2,
  sm: 3,
  sm2: 3,
  md: 4,
  lg: 5,
  xl: 5,
};

const PhotoGalleryStyles = {
  paper: {
    padding: "10px 20px",
    marginTop: "20px",
    backgroundColor: "rgba(255,255,255,.15)",
    backdropFilter: "blur",
    position: "absolute",
    margin: "auto",
  },
  imageList: { width: "90vw", height: "75vh", paddingRight: "10px" },
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

  return (
    <Paper
      elevation={4}
      sx={PhotoGalleryStyles.paper}
      className={styles.fade_in}
    >
      <ImageList
        cols={COLUMS_BY_MEDIASIZE[mediaSize] || 1}
        rowHeight={200}
        gap={20}
        sx={PhotoGalleryStyles.imageList}
      >
        {photosData.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} ref={ref} />
        ))}
      </ImageList>
      <Stack
        direction={"row"}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="warning" />
      </Backdrop>
    </Paper>
  );
};

export default PhotoGallery;

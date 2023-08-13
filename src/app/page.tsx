"use client";
import { useState } from "react";
import RoverForm from "../components/RoverForm";
import PhotoGallery from "../components/PhotoGallery";
import {
  ErrorMessage,
  Photo,
  RequestPhotosParams,
} from "../interfaces/mainInterfaces";
import { Alert, Snackbar } from "@mui/material";
import styles from "./page.module.css";
import { requestPhotos } from "@/utils/requestPhotos";

export default function HomePage() {
  const [showRoverForm, setShowRoverForm] = useState(true);
  const [photosData, setPhotosData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>({ message: "" });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [photosParams, setPhotosParams] = useState<RequestPhotosParams | null>(
    null
  );

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handlePhotoRequestFromForm = async (params: RequestPhotosParams) => {
    setLoading(true);
    const sameParams =
      JSON.stringify(params) === JSON.stringify(photosParams || {});
    if (!sameParams) {
      try {
        const response = await requestPhotos(params);
        const photosDataResponse = await response.json();
        if (photosDataResponse.photos.length === 0) {
          throw new Error("No photos matches this parameters");
        }
        setPhotosData([...photosDataResponse.photos]);
        setPhotosParams(params);
        setShowRoverForm(!showRoverForm);
      } catch (newError: any) {
        setError({ message: newError?.message });
        setOpenSnackBar(true);
      }
    } else {
      setShowRoverForm(!showRoverForm);
    }
    setLoading(false);
  };

  const handlePhotoRequestFromGallery = async (params: RequestPhotosParams) => {
    setLoading(true);
    const sameParams =
      JSON.stringify(params) === JSON.stringify(photosParams || {});
    if (!sameParams) {
      try {
        const response = await requestPhotos(params);
        const photosDataResponse = await response.json();
        // if (photosDataResponse.photos.length === 0) {
        // throw new Error("No photos matches this parameters");
        // }
        setPhotosData([...photosData, ...photosDataResponse.photos]);
        setPhotosParams(params);
      } catch (newError: any) {
        setError({ message: newError?.message || "" });
        setOpenSnackBar(true);
      }
    }
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      {showRoverForm ? (
        <RoverForm
          requestPhotos={handlePhotoRequestFromForm}
          loading={loading}
        />
      ) : (
        <PhotoGallery
          loading={loading}
          showRoverForm={showRoverForm}
          setShowRoverForm={setShowRoverForm}
          photosData={photosData}
          requestPhotosParams={photosParams}
          requestPhotos={handlePhotoRequestFromGallery}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{
            width: "100%",
            background: "rgba(250,200,200,1)",
          }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

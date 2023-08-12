"use client";
import { useState } from "react";
import styles from "./page.module.css";
import RoverForm from "./components/RoverForm";
import PhotoGallery from "./components/PhotoGallery";
import { NextPage } from "next";
import { Photo, RequestPhotosParams } from "./interfaces/mainInterfaces";
import { Alert, Snackbar } from "@mui/material";

export default function HomePage(): NextPage {
  const [showRoverForm, setShowRoverForm] = useState(true);
  const [photosData, setPhotosData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const requestPhotos = async (params: RequestPhotosParams) => {
    const { rover, camera, dateType, date, page } = params;
    const searchParams = new URLSearchParams("");
    searchParams.append("rover", rover);
    searchParams.append("camera", camera);
    if (dateType === "earth") {
      searchParams.append(
        "earth_date",
        date?.format("YYYY-MM-DD").toString() ?? ""
      );
    } else {
      searchParams.append("sol", String(date));
    }

    searchParams.append("page", String(page));
    const URL = `http://localhost:3000/api/rovers/photos?${searchParams.toString()}`;
    return fetch(URL);
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
      } catch (error) {
        console.error("form error", error);
        setError(error?.message || "");
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
      } catch (error) {
        console.error("galery error", error);
        setError(error?.message || "");
        setOpenSnackBar(true);
      }
    }
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <RoverForm
        showRoverForm={showRoverForm}
        requestPhotos={handlePhotoRequestFromForm}
        loading={loading}
      ></RoverForm>
      <PhotoGallery
        loading={loading}
        showRoverForm={showRoverForm}
        setShowRoverForm={setShowRoverForm}
        photosData={photosData}
        requestPhotosParams={photosParams}
        requestPhotos={handlePhotoRequestFromGallery}
      ></PhotoGallery>
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
          {error}
        </Alert>
      </Snackbar>
    </main>
  );
}

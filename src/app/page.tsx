"use client";
import { useState } from "react";
import styles from "./page.module.css";
import RoverForm from "./components/RoverForm";
import PhotoGallery from "./components/PhotoGallery";
import { NextPage } from "next";

export default function HomePage(): NextPage {
  const [showRoverForm, setShowRoverForm] = useState(true);
  return (
    <main className={styles.main}>
      <RoverForm
        showRoverForm={showRoverForm}
        setShowRoverForm={setShowRoverForm}
      ></RoverForm>
      <PhotoGallery
        showRoverForm={showRoverForm}
        setShowRoverForm={setShowRoverForm}
      ></PhotoGallery>
    </main>
  );
}

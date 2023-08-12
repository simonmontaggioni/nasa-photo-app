"use client";
import { useRouter } from "next/navigation";

const GalleryPage = () => {
  const router = useRouter();
  console.info("router", router);
  // console.info("photos data", photosData);

  return <div>GalleryPage</div>;
};

export default GalleryPage;

import { useRouter } from "next/router";

const GalleryPage = () => {
  const router = useRouter();
  const { photosData } = router.query;
  console.info("photos data", photosData);

  return <div>GalleryPage</div>;
};

export default GalleryPage;

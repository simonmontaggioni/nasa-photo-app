import { RequestPhotosParams } from "@/interfaces/mainInterfaces";

export const requestPhotos = async (params: RequestPhotosParams) => {
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

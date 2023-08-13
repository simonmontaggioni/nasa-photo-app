import { RequestPhotosParams } from "@/interfaces/mainInterfaces";
import { Dayjs } from "dayjs";

export const requestPhotos = async (params: RequestPhotosParams) => {
  const { rover, camera, dateType, page } = params;
  const searchParams = new URLSearchParams("");
  searchParams.append("rover", rover);
  searchParams.append("camera", camera);
  if (dateType === "earth") {
    const date: Dayjs = params.date as Dayjs;
    searchParams.append("earth_date", date?.format("YYYY-MM-DD") ?? "");
  } else {
    const date: number = params.date as number;
    searchParams.append("sol", String(date));
  }

  searchParams.append("page", String(page));
  const URL = `http://localhost:3000/api/rovers/photos?${searchParams.toString()}`;
  return fetch(URL);
};

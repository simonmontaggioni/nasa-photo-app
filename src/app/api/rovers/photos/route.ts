import { NextResponse } from "next/server";

const NASA_DATA_SOURCE_URL: string =
  "https://api.nasa.gov/mars-photos/api/v1/rovers";
const API_KEY: string = (process.env.DATA_API_KEY as string) || "DEMO_KEY";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rover = searchParams.get("rover");
  searchParams.delete("rover");
  searchParams.append("api_key", API_KEY);
  console.log(
    "NASA - URL",
    `${NASA_DATA_SOURCE_URL}/${rover}/photos?${searchParams.toString()}`
  );
  const response = await fetch(
    `${NASA_DATA_SOURCE_URL}/${rover}/photos?${searchParams.toString()}`
  );
  console.log("response", response);
  let photos = await response.json();
  console.log("photos", photos.photos);
  return NextResponse.json(photos);
}

import { Rover } from "./interfaces/mainInterfaces";

export const ROVERS: Rover[] = [
  {
    id: 5,
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: 3910,
    max_date: "2023-08-08",
    total_photos: 670165,

    cameras: [
      { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
      { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
      { name: "MAST", full_name: "Mast Camera" },
      { name: "CHEMCAM", full_name: "Chemistry and Camera Complex" },
      { name: "MAHLI", full_name: "Mars Hand Lens Imager" },
      { name: "MARDI", full_name: "Mars Descent Imager" },
      { name: "NAVCAM", full_name: "Navigation Camera" },
    ],
  },
  {
    id: 6,
    name: "Opportunity",
    landing_date: "2004-01-25",
    launch_date: "2003-07-07",
    status: "complete",
    max_sol: 5111,
    max_date: "2018-06-11",
    total_photos: 198439,
    cameras: [
      { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
      { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
      { name: "NAVCAM", full_name: "Navigation Camera" },
      { name: "PANCAM", full_name: "Panoramic Camera" },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
    ],
  },

  {
    id: 7,
    name: "Spirit",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: 3910,
    max_date: "2023-08-06",
    total_photos: 670165,
    cameras: [
      { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
      { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
      { name: "NAVCAM", full_name: "Navigation Camera" },
      { name: "PANCAM", full_name: "Panoramic Camera" },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
    ],
  },
];

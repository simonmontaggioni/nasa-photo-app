import { Rover } from "./interfaces/mainInterfaces";

export const ROVERS: Rover[] = [
  {
    id: 5,
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: 3914,
    max_date: "2023-08-10",
    total_photos: 670915,
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "MAST",
        full_name: "Mast Camera",
      },
      {
        name: "CHEMCAM",
        full_name: "Chemistry and Camera Complex",
      },
      {
        name: "MAHLI",
        full_name: "Mars Hand Lens Imager",
      },
      {
        name: "MARDI",
        full_name: "Mars Descent Imager",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
  {
    id: 7,
    name: "Spirit",
    landing_date: "2004-01-04",
    launch_date: "2003-06-10",
    status: "complete",
    max_sol: 2208,
    max_date: "2010-03-21",
    total_photos: 124550,
    cameras: [
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "PANCAM",
        full_name: "Panoramic Camera",
      },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      {
        name: "ENTRY",
        full_name: "Entry, Descent, and Landing Camera",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
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
      {
        name: "FHAZ",
        full_name: "Front Hazard Avoidance Camera",
      },
      {
        name: "NAVCAM",
        full_name: "Navigation Camera",
      },
      {
        name: "PANCAM",
        full_name: "Panoramic Camera",
      },
      {
        name: "MINITES",
        full_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
      },
      {
        name: "ENTRY",
        full_name: "Entry, Descent, and Landing Camera",
      },
      {
        name: "RHAZ",
        full_name: "Rear Hazard Avoidance Camera",
      },
    ],
  },
  {
    id: 8,
    name: "Perseverance",
    landing_date: "2021-02-18",
    launch_date: "2020-07-30",
    status: "active",
    max_sol: 878,
    max_date: "2023-08-09",
    total_photos: 173424,
    cameras: [
      {
        name: "EDL_RUCAM",
        full_name: "Rover Up-Look Camera",
      },
      {
        name: "EDL_DDCAM",
        full_name: "Descent Stage Down-Look Camera",
      },
      {
        name: "EDL_PUCAM1",
        full_name: "Parachute Up-Look Camera A",
      },
      {
        name: "EDL_PUCAM2",
        full_name: "Parachute Up-Look Camera B",
      },
      {
        name: "NAVCAM_LEFT",
        full_name: "Navigation Camera - Left",
      },
      {
        name: "NAVCAM_RIGHT",
        full_name: "Navigation Camera - Right",
      },
      {
        name: "MCZ_RIGHT",
        full_name: "Mast Camera Zoom - Right",
      },
      {
        name: "MCZ_LEFT",
        full_name: "Mast Camera Zoom - Left",
      },
      {
        name: "FRONT_HAZCAM_LEFT_A",
        full_name: "Front Hazard Avoidance Camera - Left",
      },
      {
        name: "FRONT_HAZCAM_RIGHT_A",
        full_name: "Front Hazard Avoidance Camera - Right",
      },
      {
        name: "REAR_HAZCAM_LEFT",
        full_name: "Rear Hazard Avoidance Camera - Left",
      },
      {
        name: "REAR_HAZCAM_RIGHT",
        full_name: "Rear Hazard Avoidance Camera - Right",
      },
      {
        name: "EDL_RDCAM",
        full_name: "Rover Down-Look Camera",
      },
      {
        name: "SKYCAM",
        full_name: "MEDA Skycam",
      },
      {
        name: "SHERLOC_WATSON",
        full_name: "SHERLOC WATSON Camera",
      },
      {
        name: "SUPERCAM_RMI",
        full_name: "SuperCam Remote Micro Imager",
      },
      {
        name: "LCAM",
        full_name: "Lander Vision System Camera",
      },
    ],
  },
];

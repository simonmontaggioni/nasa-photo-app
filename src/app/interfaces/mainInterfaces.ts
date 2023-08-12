import { Dayjs } from "dayjs";

export type DateType = "earth" | "sol";

export interface Camera {
  name: CameraName;
  full_name: CameraFullName;
}

export interface Photo {
  id: number;
  sol: number;
  camera: PhotoCamera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface PhotoCamera {
  id: number;
  name: CameraName;
  rover_id: number;
  full_name: CameraFullName;
}

export type CameraFullName =
  | "Chemistry and Camera Complex"
  | "Front Hazard Avoidance Camera"
  | "Mars Descent Imager"
  | "Mars Hand Lens Imager"
  | "Mast Camera"
  | "Navigation Camera"
  | "Panoramic Camera"
  | "Rear Hazard Avoidance Camera"
  | "Rover Up-Look Camera"
  | "Descent Stage Down-Look Camera"
  | "Parachute Up-Look Camera A"
  | "Parachute Up-Look Camera B"
  | "Navigation Camera - Left"
  | "Navigation Camera - Right"
  | "Mast Camera Zoom - Right"
  | "Mast Camera Zoom - Left"
  | "Front Hazard Avoidance Camera - Left"
  | "Front Hazard Avoidance Camera - Right"
  | "Rear Hazard Avoidance Camera - Left"
  | "Rear Hazard Avoidance Camera - Right"
  | "Rover Down-Look Camera"
  | "MEDA Skycam"
  | "SHERLOC WATSON Camera"
  | "SuperCam Remote Micro Imager"
  | "Lander Vision System Camera"
  | "Miniature Thermal Emission Spectrometer (Mini-TES)"
  | "Entry, Descent, and Landing Camera";

export type CameraName =
  | "CHEMCAM"
  | "FHAZ"
  | "MAHLI"
  | "MARDI"
  | "MAST"
  | "NAVCAM"
  | "PANCAM"
  | "RHAZ"
  | "EDL_RUCAM"
  | "EDL_DDCAM"
  | "EDL_PUCAM1"
  | "EDL_PUCAM2"
  | "NAVCAM_LEFT"
  | "NAVCAM_RIGHT"
  | "MCZ_RIGHT"
  | "MCZ_LEFT"
  | "FRONT_HAZCAM_LEFT_A"
  | "FRONT_HAZCAM_RIGHT_A"
  | "REAR_HAZCAM_LEFT"
  | "REAR_HAZCAM_RIGHT"
  | "EDL_RDCAM"
  | "SKYCAM"
  | "SHERLOC_WATSON"
  | "SUPERCAM_RMI"
  | "LCAM"
  | "MINITES"
  | "ENTRY";
export interface Rover {
  id: number;
  name: RoverName;
  landing_date: string;
  launch_date: string;
  status: Status;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: CameraElement[];
}

export interface CameraElement {
  name: CameraName;
  full_name: CameraFullName;
}

export type RoverName = "Curiosity" | "Spirit" | "Opportunity" | "Perseverance";

export type Status = "active" | "complete";

export interface RequestPhotosParams {
  rover: string;
  camera: string;
  dateType: DateType;
  date: Dayjs | null | number;
  page: number;
}

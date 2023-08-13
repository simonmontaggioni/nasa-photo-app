import { FC, useState } from "react";
import { Grid, Button, Stack, Paper, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import dayjs, { Dayjs } from "dayjs";
import RoverSelect from "./RoverSelect";
import RoverImageContainer from "./RoverImageContainer";
import CameraSelect from "./CameraSelect";
import DateTypeSelect from "./DateTypeSelect";
import EarthCalendar from "./EarthCalendar";
import MartianCalendar from "./MartianCalendar";
import { RequestPhotosParams, Rover } from "../interfaces/mainInterfaces";
import { marsEarthDateConversions } from "@/utils/marsEarthDateConversions";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import { ROVERS } from "../app/rovers";
import styles from "../app/page.module.css";

const RoverFormStyles = {
  paper: {
    padding: "20px",
    backgroundColor: "rgba(255,255,255,.75)",
    backdropFilter: "blur",
    position: "absolute",
    margin: "0 1em",
    display: "flex",
    justifyContent: "center",
  },
  selectsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

interface RoverFormProps {
  loading: boolean;
  requestPhotos: (requestPhotosParams: RequestPhotosParams) => void;
}
const RoverForm: FC<RoverFormProps> = ({ loading, requestPhotos }) => {
  const [selectedRover, setSelectedRover] = useState<Rover>(ROVERS[0]);
  const [camera, setCamera] = useState(ROVERS[0].cameras[0].name);
  const [dateType, setDateType] = useState<"earth" | "sol">("earth");
  const [earthDate, setEarthDate] = useState<Dayjs | null>(dayjs());
  const [martianSol, setMartianSol] = useState<number>(
    marsEarthDateConversions.getMaxSol(ROVERS[0].landing_date)
  );

  const mediaSize = useGetMediaSize();

  const handleChangeSelectedRover = (newRover: Rover) => {
    setSelectedRover(newRover);
    setCamera(newRover.cameras[0].name);
  };

  return (
    <Paper elevation={4} sx={RoverFormStyles.paper} className={styles.fade_in}>
      <Grid container sx={{ width: "100%" }}>
        <RoverSelect
          rovers={ROVERS.filter((rover) => rover.name !== "Perseverance")}
          selectedRover={selectedRover}
          setSelectedRover={handleChangeSelectedRover}
          disabled={loading}
        />
        <Grid container item xs={12} sx={{ justifyContent: "space-between" }}>
          {["sm2", "md", "lg", "xl"].includes(mediaSize) && (
            <RoverImageContainer selectedRover={selectedRover} />
          )}
          <Grid
            item
            xs={12}
            sm={["sm"].includes(mediaSize) ? 12 : 5}
            md={6}
            sx={RoverFormStyles.selectsContainer}
          >
            <Stack direction="column" spacing={2}>
              <CameraSelect
                rovers={ROVERS}
                selectedRover={selectedRover}
                camera={camera}
                setCamera={setCamera}
                disabled={loading}
              />
              <DateTypeSelect
                dateType={dateType}
                setDateType={setDateType}
                disabled={loading}
              />
              {dateType === "earth" ? (
                <EarthCalendar
                  earthDate={earthDate}
                  setEarthDate={setEarthDate}
                  disabled={loading}
                  minimalDate={dayjs(selectedRover.landing_date)}
                />
              ) : (
                <MartianCalendar
                  setMartianSol={setMartianSol}
                  disabled={loading}
                  landingDate={selectedRover.landing_date}
                />
              )}
            </Stack>
            <Button
              variant="contained"
              color="warning"
              endIcon={
                loading ? (
                  <CircularProgress color="warning" size={20} />
                ) : (
                  <SendIcon />
                )
              }
              onClick={() =>
                requestPhotos({
                  rover: selectedRover.name,
                  camera,
                  dateType: dateType,
                  date: dateType === "earth" ? earthDate : martianSol,
                  page: 1,
                })
              }
              disabled={loading}
            >
              {loading ? "loading" : "search"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoverForm;

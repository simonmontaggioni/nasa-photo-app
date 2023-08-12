import { FC, useState } from "react";
import { Grid, Button, Stack, Paper, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import dayjs, { Dayjs } from "dayjs";
import styles from "../page.module.css";
import { ROVERS } from "../rovers";
import { useGetMediaSize } from "../hooks/useGetMediaSize";
import RoverSelect from "./RoverSelect";
import RoverImageContainer from "./RoverImageContainer";
import CameraSelect from "./CameraSelect";
import DateTypeSelect from "./DateTypeSelect";
import EarthCalendar from "./EarthCalendar";
import MartianCalendar from "./MartianCalendar";
import { RequestPhotosParams, RoverName } from "../interfaces/mainInterfaces";

const RoverFormStyles = {
  paper: {
    padding: "20px",
    backgroundColor: "rgba(255,255,255,.75)",
    backdropFilter: "blur",
    opacity: 1,
    position: "absolute",
    zIndex: 1,
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
  showRoverForm: boolean;
  requestPhotos: (requestPhotosParams: RequestPhotosParams) => void;
}
const RoverForm: FC<RoverFormProps> = ({
  loading,
  showRoverForm,
  requestPhotos,
}) => {
  const [selectedRover, setSelectedRover] = useState(ROVERS[0].name);
  const [camera, setCamera] = useState(
    ROVERS.filter((rover) => rover.name === selectedRover)[0].cameras[0].name
  );
  const [dateType, setDateType] = useState<"earth" | "sol">("earth");
  const [earthDate, setEarthDate] = useState<Dayjs | null>(dayjs());
  const [martianSol, setMartianSol] = useState<number>(0);

  const mediaSize = useGetMediaSize();

  const handleChangeSelectedRover = (newRover: RoverName) => {
    setSelectedRover(newRover);
    setCamera(
      ROVERS.filter((rover) => rover.name === newRover)[0].cameras[0].name
    );
  };

  const opacityValue = showRoverForm ? 1 : 0;
  const zIndexValue = showRoverForm ? 1 : 0;
  return (
    <Paper
      elevation={4}
      sx={{
        ...RoverFormStyles.paper,
        opacity: opacityValue,
        zIndex: zIndexValue,
      }}
      className={showRoverForm ? styles.fade_in : styles.fade_out}
    >
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
              <DateTypeSelect dateType={dateType} setDateType={setDateType} />
              {dateType === "earth" ? (
                <EarthCalendar
                  earthDate={earthDate}
                  setEarthDate={setEarthDate}
                  disabled={loading}
                />
              ) : (
                <MartianCalendar
                  martianSol={martianSol}
                  setMartianSol={setMartianSol}
                  disabled={loading}
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
                  rover: selectedRover,
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

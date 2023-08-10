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
    // width: "fit-content",
  },
  selectsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

interface RoverFormProps {
  showRoverForm: boolean;
  setShowRoverForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoverForm: FC<RoverFormProps> = ({ showRoverForm, setShowRoverForm }) => {
  const [selectedRover, setSelectedRover] = useState(ROVERS[0].name);
  const [camera, setCamera] = useState(
    ROVERS.filter((rover) => rover.name === selectedRover)[0].cameras[0].name
  );
  const [dateType, setDateType] = useState<"earth" | "sol">("earth");
  const [earthDate, setEarthDate] = useState<Dayjs | null>(dayjs());
  const [martianSol, setMartianSol] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const mediaSize = useGetMediaSize();

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
          rovers={ROVERS}
          selectedRover={selectedRover}
          setSelectedRover={setSelectedRover}
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
              />
              <DateTypeSelect dateType={dateType} setDateType={setDateType} />
              {dateType === "earth" ? (
                <EarthCalendar
                  earthDate={earthDate}
                  setEarthDate={setEarthDate}
                />
              ) : (
                <MartianCalendar
                  martianSol={martianSol}
                  setMartianSol={setMartianSol}
                />
              )}
            </Stack>
            <Button
              variant="contained"
              endIcon={
                loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SendIcon />
                )
              }
              onClick={() => setShowRoverForm(!showRoverForm)}
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

import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

interface PhotoDetailsProps {
  open: boolean;
  handleClose: () => void;
}

const PhotoDetails: FC<PhotoDetailsProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="responsive-dialog-title"
        sx={{ backgroundColor: "trasparent" }}
      >
        <DialogTitle id="responsive-dialog-title">
          Photo from Rover in Mars
        </DialogTitle>
        <DialogContent>
          <Image
            src={`/curiosity.webp`}
            alt={"ntsrnsr"}
            loading="lazy"
            width={500}
            height={500}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotoDetails;

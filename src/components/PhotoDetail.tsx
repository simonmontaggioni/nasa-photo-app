import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Photo } from "../interfaces/mainInterfaces";
import { DialogContentText, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { handleFavorite } from "../utils/handleFavorite";

const PhotoDetailsStyles = {
  dialogContent: { display: "flex", justifyContent: "center" },
};
interface PhotoDetailsProps {
  photo: Photo | null;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const PhotoDetails: FC<PhotoDetailsProps> = ({ photo, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isInFav, setIsInFav] = useState(false);

  useEffect(() => {
    setIsInFav(!!handleFavorite.isInFavorites(photo as Photo));
  }, [photo]);

  const handleSaveOnFavorites = () => {
    const result = handleFavorite.toggleFavoriteFromLocalStorage(
      photo as Photo
    );
    setIsInFav(!!result);
  };

  const imageLoader = ({ src }) => {
    return `${src}`;
  };

  const photoTitle = `Photo - ${photo?.id}`;
  const photoInfo = `Photo ${photo?.id}, captured at ${photo?.earth_date} in mars exploration by ${photo?.rover.name} rover with the ${photo?.camera.full_name}.`;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="responsive-dialog-title"
        sx={{ backgroundColor: "trasparent" }}
      >
        <DialogTitle id="responsive-dialog-title">{photoTitle}</DialogTitle>
        <DialogContent sx={PhotoDetailsStyles.dialogContent}>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item mb={2}>
              <DialogContentText>{photoInfo}</DialogContentText>
            </Grid>
            <Grid item>
              <Image
                src={photo?.img_src as string}
                alt={photoTitle}
                loading="lazy"
                width={500}
                height={500}
                loader={imageLoader}
                placeholder="blur"
                blurDataURL="/nasa.svg"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"outlined"}
            color="error"
            onClick={() => handleSaveOnFavorites()}
            autoFocus
          >
            {`${isInFav ? "remove from" : "save on"} favorites`}
            {isInFav ? (
              <DeleteIcon color="error" />
            ) : (
              <StarIcon sx={{ color: "gold" }} />
            )}
          </Button>
          <Button onClick={() => handleClose(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotoDetails;

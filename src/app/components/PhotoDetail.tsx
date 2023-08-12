import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { Photo } from "../interfaces/mainInterfaces";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { handleFavorite } from "../utils/handleFavorite";

const PhotoDetailsStyles = {
  dialogContent: { display: "flex", justifyContent: "center" },
};
interface PhotoDetailsProps {
  photo: Photo | null;
  open: boolean;
  handleClose: () => void;
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

  const photoTitle = `Photo ${photo?.id}, captured at ${photo?.earth_date} by ${photo?.rover.name} rover.`;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="responsive-dialog-title"
        sx={{ backgroundColor: "trasparent" }}
      >
        <DialogTitle id="responsive-dialog-title">{photoTitle}</DialogTitle>
        <DialogContent sx={PhotoDetailsStyles.dialogContent}>
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
        </DialogContent>
        <DialogActions>
          <Button
            variant={"outlined"}
            onClick={() => handleSaveOnFavorites()}
            autoFocus
          >
            {`${isInFav ? "remove from" : "save on"} favorites`}
            {isInFav ? (
              <DeleteIcon sx={{ color: "black" }} />
            ) : (
              <StarIcon sx={{ color: "gold" }} />
            )}
          </Button>
          <Button onClick={() => handleClose()} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotoDetails;

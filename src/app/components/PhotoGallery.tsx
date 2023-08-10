import React, { FC, useState } from "react";
import Image from "next/image";
import {
  Button,
  Stack,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  TablePagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "../page.module.css";
import PhotoDetails from "./PhotoDetail";
import { useGetMediaSize } from "../hooks/useGetMediaSize";

const itemData = [...new Array(22)].map((item, index) => ({
  title: `photo - ${index}`,
  id: index,
}));

const COLUMS_BY_MEDIASIZE = {
  xs: 2,
  sm: 3,
  sm2: 3,
  md: 4,
  lg: 5,
  xl: 5,
};

interface PhotoGalleryProps {
  showRoverForm: boolean;
  setShowRoverForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const PhotoGallery: FC<PhotoGalleryProps> = ({
  showRoverForm,
  setShowRoverForm,
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const mediaSize = useGetMediaSize();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const opacityValue = showRoverForm ? 0 : 1;
  const zIndexValue = showRoverForm ? 0 : 1;
  const pointerActions = showRoverForm ? "none" : "all";
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "10px 20px",
        marginTop: "20px",
        backgroundColor: "rgba(255,255,255,.15)",
        backdropFilter: "blur",
        opacity: opacityValue,
        position: "absolute",
        zIndex: zIndexValue,
        margin: "auto",
        pointerEvents: pointerActions,
      }}
      className={!showRoverForm ? styles.fade_in : styles.fade_out}
    >
      <PhotoDetails open={open} handleClose={handleClose} />
      <ImageList
        cols={COLUMS_BY_MEDIASIZE[mediaSize] || 1}
        rowHeight={200}
        gap={20}
        sx={{ width: "90vw", height: "75vh", paddingRight: "10px" }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <Image
              src={`/Curiosity.webp`}
              alt={item.title}
              loading="lazy"
              fill
              onClick={handleClickOpen}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={"author"}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <StarIcon sx={{ color: "gold" }} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Stack
        direction={
          ["sm", "md", "lg", "xl"].includes(mediaSize) ? "row" : "column"
        }
        sx={{ justifyContent: "end", paddingTop: "20px", height: "75px" }}
      >
        {["sm", "md", "lg", "xl"].includes(mediaSize) && (
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: "white" }}
          />
        )}
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => setShowRoverForm(!showRoverForm)}
        >
          Change Filters
        </Button>
      </Stack>
    </Paper>
  );
};

export default PhotoGallery;

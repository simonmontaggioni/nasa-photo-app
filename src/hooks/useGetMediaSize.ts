import useMediaQuery from "@mui/material/useMediaQuery";
export const useGetMediaSize = () => {
  const isXs = useMediaQuery("(min-width:0px)");
  const isSm = useMediaQuery("(min-width:600px)");
  const isSm2 = useMediaQuery("(min-width:800px)");
  const isMd = useMediaQuery("(min-width:900px)");
  const isLg = useMediaQuery("(min-width:1200px)");
  const isXl = useMediaQuery("(min-width:1536px)");
  const xs = isXs ? "xs" : "xs";
  const sm = isSm ? "sm" : null;
  const sm2 = isSm2 ? "sm2" : null;
  const md = isMd ? "md" : null;
  const lg = isLg ? "lg" : null;
  const xl = isXl ? "xl" : null;

  return xl || lg || md || sm2 || sm || xs;
};

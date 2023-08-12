import type { Metadata } from "next";

import {
  Grid,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeblurIcon from "@mui/icons-material/Deblur";
import { Inter } from "next/font/google";

import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA Photo App",
  description: "A simple app to watch the NASA Mars rovers photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: "url(/background_2.webp)",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            color="transparent"
            sx={{
              backgroundColor: "rgba(255,255,255,.25)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Toolbar
              variant="dense"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link href={"/"}>
                <Stack
                  direction={"row"}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <DeblurIcon color="warning" />
                  <Typography
                    variant="h6"
                    fontSize={12}
                    color="white"
                    component="div"
                  >
                    NASA Photo App
                  </Typography>
                </Stack>
              </Link>
              <Link href={"/favorites"}>
                <Typography
                  variant="h6"
                  color="white"
                  component="div"
                  sx={{ textShadow: "2px 2px 2px black" }}
                >
                  Favorites
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container>{children}</Grid>
      </body>
    </html>
  );
}

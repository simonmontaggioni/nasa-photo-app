import type { Metadata } from "next";

import {
  Grid,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Inter } from "next/font/google";

import "./globals.css";

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
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            color="transparent"
            sx={{ backgroundColor: "rgba(255,255,255,.25)" }}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" color="white" component="div">
                NASA Photo App
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container>{children}</Grid>
      </body>
    </html>
  );
}

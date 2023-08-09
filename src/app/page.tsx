import Image from "next/image";
import { Typography } from "@mui/material";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Typography>Home Page</Typography>
      <Image
        src={"/nasa.svg"}
        alt={"nasa logo"}
        width={200}
        height={200}
      ></Image>
    </main>
  );
}

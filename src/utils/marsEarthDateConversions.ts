import dayjs, { Dayjs } from "dayjs";
const SOL_SECONDS = 88740;

const getMaxSol = (landingDate: string) => {
  const today = dayjs();
  const secondsFromLanding = today.diff(dayjs(landingDate), "second");
  // 1 day on mars is 24h 39m 35.244s
  const maxSol = Math.floor(secondsFromLanding / SOL_SECONDS);
  return maxSol;
};

export const marsEarthDateConversions = { getMaxSol };

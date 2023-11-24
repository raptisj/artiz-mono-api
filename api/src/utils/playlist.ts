export const durationToSeconds = (duration: string): number => {
  const durationSplit = duration.split(":").map(Number).reverse();
  const [seconds, minutes, hours] = durationSplit;

  return duration.length > 5
    ? seconds + minutes * 60 + hours * 3600
    : seconds + minutes * 60;
};

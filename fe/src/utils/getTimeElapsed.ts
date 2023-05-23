export interface ElapseTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const getTimeElapsed = (startTime: string): ElapseTime => {
  const start = new Date(startTime);
  const now = new Date();

  const elapsedTime = now.getTime() - start.getTime();
  const elapsedSeconds = Math.floor(elapsedTime / 1000);
  const days = Math.floor(elapsedSeconds / 86400);
  const hours = Math.floor((elapsedSeconds % 86400) / 3600);
  const minutes = Math.floor(((elapsedSeconds % 86400) % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

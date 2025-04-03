import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { DateTime } from "luxon";

interface CountdownProps {
  startTime: bigint;
}

const Countdown: React.FC<CountdownProps> = ({ startTime }) => {
  const [initialDiff, setInitialDiff] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const start = Number(startTime || 0);

  useEffect(() => {
    const now = DateTime.now().toSeconds();
    const initialDiff = Math.ceil(start - now);

    setInitialDiff(initialDiff);
    if (initialDiff > 0) {
      setRemainingTime(initialDiff);
    } else {
      setRemainingTime(0);
      setHasStarted(true);
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          setHasStarted(true);
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start]);

  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = hasStarted
    ? 100
    : initialDiff > 0
    ? (remainingTime / initialDiff) * 100
    : 100;

  return (
    <div className="relative size-[5.5em]">
      <svg
        className="size-full rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          strokeWidth={3}
          className="stroke-current text-white/5"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          strokeWidth={3}
          strokeDasharray={100}
          strokeDashoffset={100 - progress}
          strokeLinecap="round"
          className={`stroke-current text-[#1691FF] ${
            progress === 100 ? "hidden" : ""
          }`}
        />
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <p className="text-center text-[0.75em] font-bold">
          {formatTime(remainingTime)}
        </p>

        <p className="text-center text-[0.75em] mt-[0.5em] text-[#B2C5D2]">
          {hasStarted ? (
            <FormattedMessage id="已开放" />
          ) : (
            <FormattedMessage id="倒计时" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Countdown;

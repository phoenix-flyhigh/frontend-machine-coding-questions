import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
interface NotificationProps {
  message: string;
  classList: string;
  onClose: () => void;
  duration: number;
}

export const Notification = ({
  message,
  classList,
  onClose,
  duration,
}: NotificationProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  const handleCancel = () => {
    onClose();
  };

  const startTimer = (remainingTime: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => onClose(), remainingTime);
    startTimeRef.current = Date.now();
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedTime(elapsed);
    }
  };

  const resumeTimer = () => {
    const remainingTime = Math.max(0, duration - elapsedTime);
    timerRef.current = setTimeout(() => onClose(), remainingTime);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (!startTimeRef.current) return;

    if (isPaused) {
      pauseTimer();
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    } else {
      resumeTimer();
      updateProgress();
    }
  }, [isPaused]);

  useEffect(() => {
    startTimer(duration);
    updateProgress();

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const updateProgress = () => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress > 100 && progressRef.current) {
          clearInterval(progressRef.current);
          return 100;
        }
        return newProgress;
      });
    }, duration / 10);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-full">
      <section
        className={`${classList} flex justify-between px-4 py-3 text-white w-full ease-in duration-300`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-label="notification"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div>{message}</div>
        <button onClick={handleCancel} className="focus:outline-none">
          <RxCross2 />
        </button>
      </section>
      <div
        className={`${classList} bg-opacity-20 h-2 w-full relative overflow-hidden`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className={`${classList} -translate-x-full w-full h-full transition-transform duration-100 ease-linear`}
          style={{
            transform: `translateX(${-100 + progress}%)`,
          }}
        />
      </div>
    </div>
  );
};

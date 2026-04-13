"use client";

import { useEffect, useState, useRef } from "react";
import { formatTime } from "../lib/formatTime";

interface TimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  isRunning: boolean;
}

export default function Timer({ timeLimit, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const percentage = (timeLeft / timeLimit) * 100;
  const isWarning = timeLeft < 300; // Less than 5 minutes
  const isCritical = timeLeft < 60; // Less than 1 minute

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isCritical
              ? "bg-red-500 animate-pulse"
              : isWarning
                ? "bg-yellow-500"
                : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={`font-mono text-lg font-bold min-w-[5ch] ${
          isCritical
            ? "text-red-500"
            : isWarning
              ? "text-yellow-500"
              : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

"use client"

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Timer({minutes = 25, alarm}: {minutes: number, alarm: HTMLAudioElement}) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(curr => (curr -1));
      else {
        setFinished(true);
        alarm.play();
      }
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft - (minutesLeft * 60);

  const padStartSucksBalls = (number: number) => {
    return `${number < 10 ? '0' : ''}${number}`
  }

  return <div className={twMerge("text-center p-6 text-lg text-black-rgb font-bold",
    finished ? "text-orange-rgb animate-pulse" : "")}>
    { padStartSucksBalls(minutesLeft) }:{ padStartSucksBalls(secondsLeft)}
  </div>;
}

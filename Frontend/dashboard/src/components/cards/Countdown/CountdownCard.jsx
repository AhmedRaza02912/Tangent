import { useEffect, useState } from "react";
import "./CountdownCard.css";

function CountdownCard({ targetDate }) {
  const raceDate = targetDate || new Date("2026-03-16T05:00:00Z");

  function getTimeLeft() {
    const difference = raceDate - new Date();
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <div className="countdown-glass-container">
      <TimeGroup value={formatTime(timeLeft.days)} label="DAYS" />
      <Separator />
      <TimeGroup value={formatTime(timeLeft.hours)} label="HOURS" />
      <Separator />
      <TimeGroup value={formatTime(timeLeft.minutes)} label="MINS" />
      <Separator />
      <TimeGroup value={formatTime(timeLeft.seconds)} label="SECS" />
    </div>
  );
}

function Separator() {
  return <div className="countdown-separator">:</div>;
}

function TimeGroup({ value, label }) {
  return (
    <div className="countdown-time-group">
      <span className="countdown-number">{value}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default CountdownCard;
import { useEffect, useMemo, useState } from "react";
import "./CountdownCard.css";

function CountdownCard({ targetDate }) {
  const raceDate = useMemo(() => {
    if (!targetDate) return null;
    const parsed = new Date(targetDate);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [targetDate]);

  function getTimeLeft() {
    if (!raceDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
    if (!raceDate) return;

    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [raceDate]);

  const formatTime = (time) => String(time).padStart(2, "0");

  if (!raceDate) {
    return (
      <div className="countdown-glass-container countdown-skeleton" aria-busy="true" aria-label="Loading countdown">
        <SkeletonGroup />
        <Separator />
        <SkeletonGroup />
        <Separator />
        <SkeletonGroup />
        <Separator />
        <SkeletonGroup />
      </div>
    );
  }

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

function SkeletonGroup() {
  return (
    <div className="countdown-time-group countdown-time-group-skeleton" aria-hidden="true">
      <span className="countdown-number countdown-skeleton-block" />
    </div>
  );
}

export default CountdownCard;
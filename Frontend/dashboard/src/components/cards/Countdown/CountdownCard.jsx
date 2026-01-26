import { useEffect, useState } from "react";

function CountdownCard() {
  const raceDate = new Date("2026-02-12T14:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const difference = raceDate - new Date();
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }
  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div style={styles.glassContainer}>
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
  return <div style={styles.separator}>:</div>;
}
function TimeGroup({ value, label }) {
  return (
    <div style={styles.timeGroup}>
      <span style={styles.number}>{value}</span>
      <span style={styles.label}>{label}</span>
    </div>
  );
}

const styles = {
  glassContainer: {
    // Glassmorphism effect
    background: "rgba(23, 23, 23, 0.6)", // Dark transparent background
    backdropFilter: "blur(12px)", // Blurs the image behind it
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "15px 30px",
    display: "inline-flex",
    alignItems: "center",
    gap: "15px",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  timeGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  number: {
    fontSize: "32px", // Large numbers
    fontWeight: "600",
    lineHeight: "1",
    fontVariantNumeric: "tabular-nums", // Keeps numbers from shifting width
  },
  label: {
    fontSize: "10px",
    opacity: 0.6,
    letterSpacing: "1px",
    marginTop: "5px",
    textTransform: "uppercase",
  },
  separator: {
    fontSize: "28px",
    fontWeight: "400",
    marginTop: "-15px", // Adjust vertical alignment of colon
    opacity: 0.8,
  },
};

export default CountdownCard;
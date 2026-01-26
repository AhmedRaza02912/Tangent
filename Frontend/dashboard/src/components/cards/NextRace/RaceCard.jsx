import CountdownCard from "../Countdown/CountdownCard";
// import "./RaceCard.css"; // Ensure this file doesn't override inline styles below

function RaceCard() {
  return (
    <div style={styles.card}>
      {/* Background Image Overlay */}
      <div style={styles.overlay}></div>

      {/* Top Section: Title and Red Badge */}
      <div style={styles.topSection}>
        <div style={styles.text}>
          <h3 style={styles.subHeader}>Next Race:</h3>
          <h2 style={styles.header}>British Grand Prix</h2>
        </div>
        
        {/* Red Badge at Top Right */}
        <div style={styles.redBadge}>Sync with Calendar</div>
      </div>

      {/* Bottom Section: The Countdown Component */}
      <div style={styles.countdownWrapper}>
        <CountdownCard />
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    backgroundImage: "url('/images/silverstone.JPG')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "16px",
    padding: "30px",
    width: "500px", 
    height: "200px", 
    color: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
    zIndex: 0,
  },
  topSection: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  subHeader: {
    fontSize: "18px",
    fontWeight: "400",
    opacity: 0.9,
    margin: 0,
  },
  header: {
    fontSize: "42px",
    fontWeight: "700",
    margin: 0,
    lineHeight: "1.1",
  },
  redBadge: {
    backgroundColor: "#ef4444", // Red color
    color: "white",
    padding: "6px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "11px",
    boxShadow: "0 2px 10px rgba(239, 68, 68, 0.3)",
  },
  countdownWrapper: {
    position: "relative",
    zIndex: 1,
  },
};

export default RaceCard;
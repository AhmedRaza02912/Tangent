function RaceCard() {
  return (
    <div style={styles.card}>
      {/* Overlay */}
      <div style={styles.overlay}></div>
      
      <div style={styles.text}>
        <h3 style={styles.text}>Next Race</h3>
        <h2 style={styles.text}>British Grand Prix</h2>
        <p style={styles.text}>SilverStone Circuit</p>
        <p style={styles.text}>July 14, 2024</p>
      </div>

      <button style={styles.button}>Add to Calendar</button>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    backgroundImage: "url('/images/silverstone.JPG')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
    width: "500px",
    color: "white",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
  },

  text: {
    position: "relative",
    zIndex: 1,
  },

  button: {
    marginTop: "12px",
    padding: "10px",
    width: "30%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(2px)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
  },
};

export default RaceCard;

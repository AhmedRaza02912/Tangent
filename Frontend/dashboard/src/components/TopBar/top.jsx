import "./TopBar.css";

function Top({ activeSeries, onSeriesChange }) {
    return (
        <div className="nav-buttons">
            <button
                className="button"
                onClick={() => onSeriesChange("f1")}
                aria-pressed={activeSeries === "f1"}
            >
                Formula 1 🏎️
            </button>
            <button
                className="button"
                onClick={() => onSeriesChange("motogp")}
                aria-pressed={activeSeries === "motogp"}
            >
                MotoGP 🏍️
            </button>
        </div>
    );
}

export default Top;
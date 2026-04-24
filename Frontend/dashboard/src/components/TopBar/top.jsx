import "./TopBar.css";

function Top({ activeSeries, onSeriesChange }) {
    return (
        <div className="nav-buttons">
            <button
                className="button"
                onClick={() => onSeriesChange("f1")}
                aria-pressed={activeSeries === "f1"}
            >
                <img src="/Formula1.png" alt="Formula 1" width={22} height={22} />
                FORMULA 1
            </button>
            <button
                className="button"
                onClick={() => onSeriesChange("motogp")}
                aria-pressed={activeSeries === "motogp"}
            >
                <img src="/MotoGP.png" alt="MotoGP" width={20} height={20} />
                MOTO GP
            </button>
        </div>
    );
}

export default Top;
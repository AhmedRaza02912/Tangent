import { useState } from "react";
import "./TopBar.css";
import formula1Icon from "../../assets/Icons/Formula1.png";
import motoGpIcon from "../../assets/Icons/MotoGP.png";

function Top({ activeSeries, onSeriesChange }) {
    const [showMessage, setShowMessage] = useState(false);

    const handleMotoClick = () => {
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    return (
        <div className="topbar-nav-buttons">
            
            {/* F1 BUTTON */}
            <button
                className="topbar-button"
                onClick={() => onSeriesChange("f1")}
                aria-pressed={activeSeries === "f1"}
            >
                <img src={formula1Icon} alt="Formula 1" width={22} height={22} />
                FORMULA 1
            </button>

            {/* MOTOGP BUTTON */}
            <div className="button-wrapper">
                <button
                    className="topbar-button"
                    onClick={handleMotoClick}
                >
                    <img src={motoGpIcon} alt="MotoGP" width={20} height={20} />
                    MOTO GP
                </button>

                {showMessage && (
                    <div className="coming-soon">
                        Coming Soon 🚧
                    </div>
                )}
            </div>

        </div>
    );
}

export default Top;
import { useEffect, useState } from "react";


function CountdownCard(){
    const raceDate = new Date("2026-02-12T14:00:00");
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    function getTimeLeft(){
        const difference = raceDate - new Date();
        return{
            days: Math.max(0,Math.floor(difference/(1000 * 60 * 60 * 24))),
            hours: Math.max(0,Math.floor((difference / (1000 * 60 * 60)) % 24)),
            minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
            seconds: Math.max(0, Math.floor((difference / (1000)) % 60)),
        };
    }


    return(
        <div style={styles.card}>
            <h3 style={{fontSize: "20px"}}>Race starts in</h3>
            <div style={styles.row}>
                <Timebox value={timeLeft.days} label ="Days"/>
                <Timebox value={timeLeft.hours} label ="Hours"/>
                <Timebox value={timeLeft.minutes} label ="Minutes"/>
                <Timebox value={timeLeft.seconds} label ="Seconds"/>
            </div>
        </div>
    );
}

function Timebox({value, label}){
    return (
        <div style={styles.box}>
            <h2>{value}</h2>
            <span>{label}</span>
        </div>
    );
}


const styles = {
    card:{
        width: "400px",
        backgroundColor: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px"
    },
    row:{
        color: "white",
        display: "flex",
        gap: "12px",
        marginTop: "12px"
    },
    box:{
        backgroundColor: "#020617",
        border: "1px solid #334155",
        borderRadius: "10px",
        padding: "12px",
        width: "80px",
        textAlign: "center"
    }

};

export default CountdownCard;
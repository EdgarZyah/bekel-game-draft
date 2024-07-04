import React, { useState, useEffect } from 'react';
import '../styles/QTEBar.css';

const QTEBar = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for down, -1 for up

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + direction;
                    if (newProgress >= 100 || newProgress <= 0) {
                        setDirection(-direction);
                    }
                    return newProgress;
                });
            }, 20);
            return () => clearInterval(interval);
        }
    }, [isActive, direction]);

    const handleComplete = () => {
        setIsActive(false);
        const inRedZone = progress <= 20 || progress >= 80;
        const inYellowZone = (progress > 20 && progress <= 40) || (progress >= 60 && progress < 80);
        const inGreenZone = progress > 40 && progress < 60;
        onComplete(inRedZone, inYellowZone, inGreenZone);
    };

    return (
        <div className="qte-bar-container">
            <div className="qte-bar">
                <div className="zones">
                    <div className="zone red"></div>
                    <div className="zone yellow"></div>
                    <div className="zone green"></div>
                    <div className="zone yellow"></div>
                    <div className="zone red"></div>
                </div>
                <div className="pendulum" style={{ top: `${progress}%` }}></div>
            </div>
            <button className="qte-button" onClick={() => setIsActive(true)}>Start QTE</button>
            <button className="qte-button" onClick={handleComplete}>Stop QTE</button>
        </div>
    );
};

export default QTEBar;

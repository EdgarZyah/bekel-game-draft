import React, { useState } from 'react';
import Jacks from './Jacks';
import Ball from './Ball';
import QTEBar from './QTEBar';
import '../styles/GameBoard.css';

const GameBoard = () => {
    const [score, setScore] = useState(0);
    const [ballThrown, setBallThrown] = useState(false);
    const [bounceDuration, setBounceDuration] = useState(1.25);

    const handleQTEComplete = (duration) => {
        setBounceDuration(duration);
        setBallThrown(true);
        setTimeout(() => {
            setBallThrown(false);
            setScore(score + 1);
        }, duration * 2000); // Double the duration to account for two bounces
    };

    return (
        <div className="game-board">
            <div className="left-section">
                <div className="score-board">Score: {score}</div>
                <Jacks />
            </div>
            <div className="right-section">
                <QTEBar onComplete={handleQTEComplete} />
                <div className="ball-container">
                    <Ball thrown={ballThrown} bounceDuration={bounceDuration} />
                </div>
            </div>
        </div>
    );
};

export default GameBoard;

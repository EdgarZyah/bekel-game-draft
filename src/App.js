import React, { useState, useEffect } from 'react';
import Ball from './components/Ball';
import Jacks from './components/Jacks';
import QTEBar from './components/QTEBar';
import './styles/App.css';

const App = () => {
  const [thrown, setThrown] = useState(false);
  const [points, setPoints] = useState(0);
  const [bounceDuration, setBounceDuration] = useState(0);
  const [groundTouches, setGroundTouches] = useState(0);
  const [jacks, setJacks] = useState(Array.from({ length: 6 }, () => ({ id: Math.random(), taken: false, top: Math.random() * 80, left: Math.random() * 80 })));

  const handleComplete = (inRedZone, inYellowZone, inGreenZone) => {
    let duration = 0;
    if (inRedZone) duration = 15;
    if (inYellowZone) duration = 10;
    if (inGreenZone) duration = 5;
    setBounceDuration(duration);
    setThrown(true);
    setGroundTouches(0);
  };

  const handleBallGroundTouch = () => {
    setGroundTouches((prev) => prev + 1);
  };

  const handleJackClick = (id) => {
    if (groundTouches === 1) {
      setPoints((prev) => prev + 1);
      setJacks((prevJacks) => prevJacks.map((jack) => (jack.id === id ? { ...jack, taken: true } : jack)));
    }
  };

  useEffect(() => {
    if (groundTouches === 2) {
      setThrown(false);
      setGroundTouches(0);
      alert('Game Over! Points: ' + points);
      setPoints(0);
      setJacks(Array.from({ length: 6 }, () => ({ id: Math.random(), taken: false, top: Math.random() * 80, left: Math.random() * 80 })));
    }
  }, [groundTouches, points]);

  return (
    <div className="app">
      <div className="game-container">
        <div className="jacks-box-container">
          <Jacks jacks={jacks} onJackClick={handleJackClick} />
        </div>
        <div className="ball-container">
          <Ball thrown={thrown} bounceDuration={bounceDuration} onGroundTouch={handleBallGroundTouch} />
        </div>
        <div className="qtebar-container">
          <QTEBar onComplete={handleComplete} />
        </div>
      </div>
      <div className="points">Points: {points}</div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import '../styles/Ball.css';

const Ball = ({ thrown, bounceDuration, onGroundTouch }) => {
    const [bouncing, setBouncing] = useState(false);

    useEffect(() => {
        if (thrown) {
            setBouncing(true);
            const timer = setTimeout(() => {
                setBouncing(false);
            }, bounceDuration * 1000);

            const groundTouchInterval = setInterval(() => {
                onGroundTouch();
            }, (bounceDuration / 2) * 1000);

            return () => {
                clearTimeout(timer);
                clearInterval(groundTouchInterval);
            };
        }
    }, [thrown, bounceDuration, onGroundTouch]);

    return (
        <div className={`ball ${bouncing ? 'bouncing' : ''}`}>
            {/* Ball animation and mechanics */}
        </div>
    );
};

export default Ball;

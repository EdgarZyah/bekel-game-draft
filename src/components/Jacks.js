import React from 'react';
import '../styles/Jacks.css';

const Jacks = ({ jacks, onJackClick }) => {
    return (
        <div className="jacks-box">
            {jacks.map((jack) => (
                <div
                    key={jack.id}
                    className={`jack ${jack.taken ? 'taken' : ''}`}
                    style={{ top: `${jack.top}%`, left: `${jack.left}%` }}
                    onClick={() => onJackClick(jack.id)}
                />
            ))}
        </div>
    );
};

export default Jacks;

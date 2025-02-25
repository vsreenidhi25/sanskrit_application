'use client';

import React, { useState } from 'react';
import './CounterApp.css'; // Add custom CSS for styling

const CounterApp: React.FC = () => {
    const [count, setCount] = useState(0);
    const [round, setRound] = useState(0);

    const total = count + round * 108;

    // Function to handle increasing count
    const plusCount = () => {
        if (count >= 108) {
            setCount(0);
            setRound(round + 1);
        } else {
            setCount(count + 1);
        }
    };

    // Function to reset the app
    const resetApp = () => {
        setCount(0);
        setRound(0);
    };

    return (
        <div className="container">
            Chant This or any mantra you know for 108 times
            <h1 className="heading">
                Hare Krishna Hare Krishna<br></br>
                Krishna Krishna Hare Hare<br></br>
                Hare Rama Hare Rama<br></br>
                Rama Rama Hare Hare or<br></br>
                Om Namah Shivaya
            </h1>
            
            <div className="counter-box">
                <p>Rounds Completed: <span>{round}</span></p>
                <p>Count: <span>{total}</span></p>
            </div>
            <div className="button-box">
                <button className="big-yellow-button" onClick={plusCount}>+</button>
            </div>
            <button className="reset-button" onClick={resetApp}>Reset</button>
        </div>
    );
};

export default CounterApp;

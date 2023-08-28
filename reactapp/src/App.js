import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isDisabled,setDisabled] = useState(true);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((stime) => time + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
        setDisabled(false);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setDisabled(true);
    };

    return (
        <div>
            <div data-testid="time">{formatTime(time)}</div>
            {isRunning ? (
                <button data-testid="pause" onClick={handlePause}>
                    Pause
                </button>
            ) : (
                <button data-testid="start" onClick={handleStart}>
                    Start
                </button>
            )}
            <button data-testid="reset" disabled={isDisabled} onClick={handleReset}>
                Reset
            </button>
        </div>
    );
};

function formatTime(timeInSeconds) {
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 3600);

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default Stopwatch;
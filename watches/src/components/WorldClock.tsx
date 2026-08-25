import React, { useState, useEffect } from 'react';
import type { Time } from '../types';

interface Props {
    id: string;
    name: string;
    timezone: number;
    onRemove: (id: string) => void;
}

const WorldClock: React.FC<Props> = ({ id, name, timezone, onRemove }) => {
    const [time, setTime] = useState<Time>(() => getTime(timezone));

    useEffect(() => {
        const interval = setInterval(() => setTime(getTime(timezone)), 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    const { hours, minutes, seconds } = time;
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="clock">
            <div className="clock-header">
                <span className="city-name">{name}</span>
                <button className="remove-btn" onClick={() => onRemove(id)}>
                    ✕
                </button>
            </div>
            <div className="clock-content">
                <div className="digital-time">{timeString}</div>
                <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
            </div>
        </div>
    );
};

const getTime = (timezone: number): Time => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + timezone * 3600000);
    return {
        hours: cityTime.getHours(),
        minutes: cityTime.getMinutes(),
        seconds: cityTime.getSeconds()
    };
};

interface AnalogClockProps {
    hours: number;
    minutes: number;
    seconds: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ hours, minutes, seconds }) => {
    const secondAngle = (seconds / 60) * 360;
    const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourAngle = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="clock-face">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="clock-mark"
                    style={{ transform: `rotate(${i * 30 - 90}deg)` }}
                />
            ))}
            <div className="hand hour-hand" style={{ transform: `rotate(${hourAngle}deg)` }} />
            <div className="hand minute-hand" style={{ transform: `rotate(${minuteAngle}deg)` }} />
            <div className="hand second-hand" style={{ transform: `rotate(${secondAngle}deg)` }} />
            <div className="center-dot" />
        </div>
    );
};

export default WorldClock;
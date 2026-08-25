import React from 'react';
import WorldClock from './WorldClock';
import type { CityClock } from '../types';

interface Props {
    clocks: CityClock[];
    onRemove: (id: string) => void;
}

const WorldClockList: React.FC<Props> = ({ clocks, onRemove }) => {
    if (clocks.length === 0) {
        return <p className="empty-state">Нет добавленных часов</p>;
    }

    return (
        <div className="clock-grid">
            {clocks.map((clock) => (
                <WorldClock key={clock.id} {...clock} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default WorldClockList;
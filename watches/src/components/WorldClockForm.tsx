import React, { useState } from 'react';

interface Props {
    onAdd: (name: string, timezone: number) => void;
}

const WorldClockForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('0');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Проверка названия
        if (!name.trim()) {
            setError('Введите название города');
            return;
        }

        // Проверка временной зоны
        const numTimezone = parseFloat(timezone);
        if (isNaN(numTimezone)) {
            setError('Введите число (например: 3, -5, 5.5)');
            return;
        }

        if (numTimezone < -12 || numTimezone > 14) {
            setError('Временная зона должна быть от -12 до +14');
            return;
        }

        // Все хорошо - добавляем
        onAdd(name.trim(), numTimezone);
        setName('');
        setTimezone('0');
        setError('');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    className={`input ${error ? 'input-error' : ''}`}
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                    }}
                    placeholder="Название города"
                />
                <input
                    className={`input ${error ? 'input-error' : ''}`}
                    type="text"
                    value={timezone}
                    onChange={(e) => {
                        setTimezone(e.target.value);
                        setError('');
                    }}
                    placeholder="Временная зона (UTC)"
                />
                <button className="button" type="submit">
                    Добавить
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="hint">Примеры: 3 (Москва), -5 (Нью-Йорк), 5.5 (Индия)</p>
        </form>
    );
};

export default WorldClockForm;
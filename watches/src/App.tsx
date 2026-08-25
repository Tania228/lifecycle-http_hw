import React, { useState, useCallback } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClockList from './components/WorldClockList';
import type { CityClock } from './types';
import './App.css';

const App: React.FC = () => {
  const [clocks, setClocks] = useState<CityClock[]>([]);

  const handleAdd = useCallback((name: string, timezone: number) => {
    console.log('App: добавление часов', name, timezone);
    setClocks((prev) => [...prev, { id: Date.now().toString(), name, timezone }]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    console.log('App: удаление часов', id);
    setClocks((prev) => prev.filter((clock) => clock.id !== id));
  }, []);

  return (
    <div className="app">
      <h1>🌍 Мировые часы</h1>
      <WorldClockForm onAdd={handleAdd} />
      <WorldClockList clocks={clocks} onRemove={handleRemove} />
    </div>
  );
};

export default App;
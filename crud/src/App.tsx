
import React, { useState, useEffect, useCallback } from 'react';
import NotesForm from './components/NotesForm';
import NotesList from './components/NotesList';
import type { Note } from './types';
import './App.css';

const API_URL = 'http://localhost:7070/notes';

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки заметок');
            const data = await response.json();
            setNotes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAdd = async (content: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: 0, content }),
            });
            if (!response.ok) throw new Error('Ошибка добавления заметки');
            await fetchNotes();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка добавления');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Ошибка удаления заметки');
            await fetchNotes();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка удаления');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className="app">
            <div className="app-header">
                <h1>📝 Заметки</h1>
                <button
                    className="btn btn-refresh"
                    onClick={fetchNotes}
                    disabled={loading}
                    title="Обновить список"
                >
                    🔄
                </button>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <NotesForm onAdd={handleAdd} loading={loading} />
            <NotesList notes={notes} onDelete={handleDelete} loading={loading} />
        </div>
    );
};

export default App;
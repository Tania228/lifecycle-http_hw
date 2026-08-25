import React from 'react';
import NoteCard from './NoteCard';
import type { Note } from '../types';

interface Props {
    notes: Note[];
    onDelete: (id: number) => Promise<void>;
    loading: boolean;
}

const NotesList: React.FC<Props> = ({ notes, onDelete, loading }) => {
    if (notes.length === 0) {
        return <p className="empty-state">Нет заметок. Добавьте первую!</p>;
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    loading={loading}
                />
            ))}
        </div>
    );
};

export default NotesList;
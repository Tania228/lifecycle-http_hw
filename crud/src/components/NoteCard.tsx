import React from 'react';
import type { Note } from '../types';

interface Props {
    note: Note;
    onDelete: (id: number) => Promise<void>;
    loading: boolean;
}

const NoteCard: React.FC<Props> = ({ note, onDelete, loading }) => {
    return (
        <div className="note-card">
            <span className="note-content">{note.content}</span>
            <button
                className="btn-delete"
                onClick={() => onDelete(note.id)}
                disabled={loading}
                title="Удалить заметку"
            >
                ✕
            </button>
        </div>
    );
};

export default NoteCard;
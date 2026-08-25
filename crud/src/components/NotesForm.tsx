import React, { useState } from 'react';

interface Props {
    onAdd: (content: string) => Promise<void>;
    loading: boolean;
}

const NotesForm: React.FC<Props> = ({ onAdd, loading }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed) {
            setError('Введите текст заметки');
            return;
        }
        setError('');
        await onAdd(trimmed);
        setContent('');
    };

    return (
        <form className="notes-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-input"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setError('');
                    }}
                    placeholder="Введите заметку..."
                    disabled={loading}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default NotesForm;
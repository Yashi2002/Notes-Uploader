import { useEffect, useState } from 'react';
import axios from 'axios';
import "./NotesList.css";

const NotesList = () => {
  const [notes, setNotes] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
        if (response.data && typeof response.data === 'object') {
          setNotes(response.data);
        } else {
          throw new Error('Notes data is not in the expected format.');
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.message || 'Error fetching notes');
      }
    };

    fetchNotes();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="notes-list">
      <h1>Notes List</h1>
      <div className="notes-grid">
        {Object.keys(notes).length > 0 ? (
          Object.keys(notes).map((semester) => (
            <div key={semester} className="note-card">
              <h2>Semester {semester} Notes</h2>
              {notes[semester].length > 0 ? (
                <ul>
                  {notes[semester].map((note) => (
                    <li key={note.filename}>
                      <a
                        href={`http://localhost:5001/uploads/${note.filepath.split('/').pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {note.filename}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-notes">No notes available for this semester.</p>
              )}
            </div>
          ))
        ) : (
          <p>No notes available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NotesList;

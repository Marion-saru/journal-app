import React, { useState, useEffect } from 'react';
import JournalCard from './JournalCard';
import Create from './Create';
import '../assets/css/App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedEntry, setEditedEntry] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Initialize "important" flag locally
        setEntries(data.map(e => ({ ...e, important: false })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  function addEntry(entry) {
    setEntries(prev => [ { ...entry, important: false }, ...prev ]);
  }

  function handleDeletedJournal(id) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  function handleToggleImportant(id) {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, important: !e.important } : e));
  }

  function handleEditJournal(entry) {
    setEdit(true);
    setEditedEntry(entry);
    setShowCreate(true);
  }

  function updateEntry(updated) {
    setEntries(prev => prev.map(e => e.id === updated.id ? { ...e, ...updated } : e));
  }

  function notEditing() {
    setEdit(false);
    setEditedEntry(null);
  }

  return (
    <div className="app">
      <header>
        <h1>Journal App</h1>
        <button onClick={() => setShowCreate(show => !show)}>
          {showCreate ? 'Close' : 'New Entry'}
        </button>
      </header>

      {showCreate && (
        <Create
          url={API_URL}
          addEntry={addEntry}
          toggleShowCreate={() => setShowCreate(false)}
          edit={edit}
          editedEntry={editedEntry}
          notEditing={notEditing}
          updateEntry={updateEntry}
          isLoading={setLoading}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="journal-list">
          {entries.map(entry => (
            <JournalCard
              key={entry.id}
              {...entry}
              handleDeletedJournal={handleDeletedJournal}
              handleEditJournal={handleEditJournal}
              handleToggleImportant={handleToggleImportant}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
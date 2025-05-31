import { useState, useEffect } from 'react';
import JournalList from './JournalList';
import Create from './Create';
import Toggle from './Toggle';
import '../assets/css/App.css'; 

const url = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [journals, setJournals] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImportant, setShowImportant] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJournals(data.slice(0, 10).map(item => ({ ...item, isImportant: false })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleToggle() {
    setDisplayForm(!displayForm);
    setEditingEntry(null); 
  }

  function addNewEntry(newEntry) {
    setJournals([{ ...newEntry, isImportant: false }, ...journals]);
  }

  function updateEntry(updatedEntry) {
    setJournals(journals.map(journal => 
      journal.id === updatedEntry.id ? { ...updatedEntry, isImportant: journal.isImportant } : journal
    ));
    setEditingEntry(null);
    setDisplayForm(false);
  }

  function deleteEntry(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setJournals(journals.filter(journal => journal.id !== id));
      });
  }

  function toggleImportant(id) {
    setJournals(journals.map(journal =>
      journal.id === id ? { ...journal, isImportant: !journal.isImportant } : journal
    ));
  }

  return (
    <div className="app">
      <h1> 📝 Journal Application 📝 </h1>
      <Toggle 
        onClick={handleToggle} 
        text={displayForm ? "Hide Journal Form" : "Show Journal Form"} 
      />
      <Toggle 
        onClick={() => setShowImportant(!showImportant)}
        text={showImportant ? "Show All Journals" : "Show Important Journals"}
      />
      {displayForm && <Create onSubmit={addNewEntry} editingEntry={editingEntry} updateEntry={updateEntry} />}
      <h2>Journals</h2>
      {loading ? (
        <h3 className='loading'>Loading...</h3>
      ) : (
        <JournalList 
          journals={showImportant ? journals.filter(j => j.isImportant) : journals} 
          onDelete={deleteEntry}
          onEdit={setEditingEntry}
          onToggleImportant={toggleImportant}
        />
      )}
    </div>
  );
}
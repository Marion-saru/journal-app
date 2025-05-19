import React, { useState, useEffect } from 'react';
import '../assets/css/Create.css';

function Create({
  url,
  addEntry,
  toggleShowCreate,
  edit,
  editedEntry,
  notEditing,
  updateEntry,
  isLoading,
}) {
  const [newEntry, setNewEntry] = useState({ title: '', body: '' });

  useEffect(() => {
    if (edit && editedEntry) {
      setNewEntry({ title: editedEntry.title, body: editedEntry.body });
    } else {
      setNewEntry({ title: '', body: '' });
    }
  }, [edit, editedEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    try {
      const res = await fetch(edit ? `${url}/${editedEntry.id}` : url, {
        method: edit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      if (!res.ok) throw new Error('Failed to save entry');
      const data = await res.json();
      if (edit) updateEntry({ ...editedEntry, ...data });
      else addEntry(data);
    } catch (err) {
      console.error(err);
    } finally {
      toggleShowCreate();
      notEditing();
      isLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>{edit ? 'Edit Entry' : 'New Journal Entry'}</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          name="title"
          value={newEntry.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="body"
          value={newEntry.body}
          onChange={handleChange}
          placeholder="Write your thoughts..."
          required
        />
        <button type="submit">{edit ? 'Update' : 'Add Entry'}</button>
      </form>
    </div>
  );
}

export default Create;
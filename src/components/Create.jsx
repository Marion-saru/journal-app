import { useState, useEffect } from 'react';
import '../assets/css/Create.css';


export default function Create({ onSubmit, editingEntry, updateEntry }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [invalidInput, setInvalidInput] = useState("");

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setBody(editingEntry.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingEntry]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title || !body) {
      setInvalidInput("Both input fields are required!");
      return;
    }

    const entry = {
      title,
      body,
      userId: 1,
      ...(editingEntry && { id: editingEntry.id })
    };

    const request = editingEntry ? 
      fetch(`https://jsonplaceholder.typicode.com/posts/${editingEntry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }) :
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

    request
      .then(res => res.json())
      .then(data => {
        if (editingEntry) {
          updateEntry({ ...data, id: editingEntry.id });
        } else {
          onSubmit(data);

        }
        setTitle("");
        setBody("");
        setInvalidInput("");
      });
  }

  return (
    <form className='create-form' onSubmit={handleSubmit}>
      {invalidInput && <h3 style={{ color: "red", marginLeft: "10px" }}>{invalidInput}</h3>}
      <label htmlFor='title'>Title</label>
      <input 
        type='text' 
        id='title'
        placeholder='Title' 
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor='body'>Body</label>
      <textarea 
        id='body'
        placeholder='Body' 
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button type='submit'>{editingEntry ? "Update" : "Submit"}</button>
    </form>
  );
}
import '../assets/css/JournalCard.css';

function JournalCard({
  id,
  title,
  body,
  important,
  handleDeletedJournal,
  handleEditJournal,
  handleToggleImportant
}) {
  function handleImportantClick() {
    handleToggleImportant(id);
  }

  function removeJournal() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then(() => handleDeletedJournal(id));
  }

  function editJournal() {
    handleEditJournal({ id, title, body });
  }

  return (
    <li className={`journal-card ${important ? 'important' : ''}`}>
      <h2>Journal Entry {id}</h2>
      <h3>{title}</h3>
      <p>{body}</p>
      <button onClick={handleImportantClick}>
        {important ? 'MARK UNIMPORTANT' : 'MARK IMPORTANT'}
      </button>
      <button onClick={editJournal}>EDIT</button>
      <button onClick={removeJournal}>DELETE</button>
    </li>
  );
}

export default JournalCard;
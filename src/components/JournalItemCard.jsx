import { useState } from "react";
import '../assets/css/JournalItemCard.css'; 


export default function JournalItemCard({ item, onDelete, onEdit, onToggleImportant }) {
  const [isImportant, setIsImportant] = useState(item.isImportant || false);

  return (
    <div className="journal-item" style={{ backgroundColor: isImportant ? '#fff3cd' : 'white' }}>
      <h3>{item.title}</h3>
      <p>{item.body}</p>

      <button 
        className="buttons"
        style={{marginLeft: "0px"}}
        onClick={() => {
          setIsImportant(!isImportant);
          onToggleImportant(item.id);
        }}
      >
        {isImportant ? "Unmark as Important" : "Mark as Important"}
      </button>
      <button 
        className="buttons"
        onClick={() => onDelete(item.id)}
      >
        Delete Journal
      </button>
      <button 
        className="buttons" 
               
        onClick={() => onEdit(item)}
      >
        Edit Journal
      </button>
    </div>
  );
}
import JournalItemCard from "./JournalItemCard";


export default function JournalList({ journals, onDelete, onEdit, onToggleImportant }) {
  return (
    <div className="journal-list">
      {journals.map((journal) => (
        <JournalItemCard 
          key={journal.id} 
          item={journal}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </div>
  );
}
'use client';

type Entry = {
  id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
}; 

export default function EntryList({ entries, onEntryDeleted }: { entries: Entry[], onEntryDeleted: () => void }) {
  
  const handleDelete = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цей запис?')) return;

    const res = await fetch(`/api/entries?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      onEntryDeleted(); 
    } else {
      alert('Помилка при видаленні');
    }
  };

  const grouped = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, Entry[]>);

  const grandTotal = entries.reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="space-y-6 text-black">
      <div className="text-xl font-bold p-4 bg-blue-50 rounded-lg border border-blue-100">
        Загальний час: <span className="text-blue-700">{grandTotal} год.</span>
      </div>
      
      {Object.entries(grouped).map(([date, items]) => {
        const dayTotal = items.reduce((sum, i) => sum + i.hours, 0);
        return (
          <div key={date} className="border rounded-lg overflow-hidden shadow-sm">
            <h3 className="bg-gray-50 p-3 font-bold flex justify-between border-b">
              <span>{date}</span>
              <span className="text-gray-600">Всього: {dayTotal} год.</span>
            </h3>
            <div className="divide-y">
              {items.map(item => (
                <div key={item.id} className="p-3 hover:bg-gray-50 flex justify-between items-start group">
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900">{item.project}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    <div className="text-xs font-bold mt-1">{item.hours} год.</div>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Видалити
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
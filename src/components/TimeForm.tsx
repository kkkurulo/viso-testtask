'use client';
import { useState } from 'react';

const PROJECTS = ["Viso Internal", "Client A", "Client B", "Personal Development"];

export default function TimeForm({ onEntryAdded }: { onEntryAdded: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    project: PROJECTS[0],
    hours: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ ...formData, hours: '', description: '' });
      onEntryAdded();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  const inputStyle = "w-full p-2 border rounded border-gray-300 text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-md space-y-4 bg-white">
      <h2 className="text-xl font-bold text-black border-b pb-2">Додати час</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
        <input 
          type="date" 
          value={formData.date} 
          required 
          className={inputStyle}
          onChange={e => setFormData({...formData, date: e.target.value})} 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Проєкт</label>
        <select 
          value={formData.project} 
          className={inputStyle}
          onChange={e => setFormData({...formData, project: e.target.value})}
        >
          {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Кількість годин</label>
        <input 
          type="number" 
          step="0.5" 
          placeholder="Наприклад: 4.5" 
          required 
          value={formData.hours}
          className={inputStyle}
          onChange={e => setFormData({...formData, hours: e.target.value})} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Опис роботи</label>
        <textarea 
          placeholder="Що саме ви робили?" 
          required 
          value={formData.description}
          className={`${inputStyle} h-24 resize-none`}
          onChange={e => setFormData({...formData, description: e.target.value})} 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
      >
        Зберегти запис
      </button>
    </form>
  );
}
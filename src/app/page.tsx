'use client';
import { useEffect, useState } from 'react';
import TimeForm from '@/components/TimeForm';
import EntryList from '@/components/EntryList';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/entries');
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-black mb-2">
            Time Tracker
          </h1>
          <p className="text-gray-600">Тестове завдання для Viso Academy</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          <aside className="sticky top-8">
            <TimeForm onEntryAdded={fetchEntries} />
          </aside>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              Історія роботи
              {entries.length > 0 && (
                <span className="ml-3 text-sm font-normal bg-blue-100 text-blue-700 py-1 px-3 rounded-full">
                  {entries.length} записів
                </span>
              )}
            </h2>

            {loading ? (
              <p className="text-gray-500">Завантаження...</p>
            ) : entries.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
                <p className="text-gray-400">Записів ще немає. Додайте свій перший відпрацьований час!</p>
              </div>
            ) : (
              <EntryList entries={entries} onEntryDeleted={fetchEntries} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
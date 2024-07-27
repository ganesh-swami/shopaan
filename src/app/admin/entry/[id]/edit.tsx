import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EntryForm } from '@/components/entry-from';
import { Button } from '@/components/ui/button';

interface Entry {
  id: number;
  userId: number;
  itemId?: number;
  totalItem: number;
  returnCount: number;
  value: number;
  cash: number;
  pickedBy?: string;
}

const EditEntryPage = () => {
  const [entry, setEntry] = useState<Entry | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchEntry();
    }
  }, [id]);

  const fetchEntry = async () => {
    const res = await fetch(`/api/entries/${id}`);
    const data = await res.json();
    setEntry(data);
  };

  const handleUpdateEntry = async (entryData: Omit<Entry, 'id'>) => {
    const res = await fetch(`/api/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData),
    });

    if (res.ok) {
      router.push('/admin/entries');
    } else {
      console.error('Failed to update entry');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Edit Entry</h1>
      {entry ? (
        <>
          <EntryForm defaultValues={entry} onSubmit={handleUpdateEntry} />
          <Button onClick={() => router.push('/admin/entries')} className="mt-4">Back to Entries</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditEntryPage;

"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { EntryForm } from '@/components/entry-from';
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

export default function  AddEntryPage () {
//   const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  

//   const handleAddEntry = async (entryData: Omit<Entry, 'id'>) => {
//     const res = await fetch('/api/entries', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(entryData),
//     });

//     if (res.ok) {
//       setIsAdding(false);
//     } else {
//       console.error('Failed to add entry');
//     }
//   };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Add Entry</h1>
        <>
          {/* <EntryForm  onSubmit={handleAddEntry} /> */}
          <Button onClick={() => router.push('/admin/entries')} className="mt-4">Back to Entries</Button>
        </>
    </div>
  );
};



import { createContext, useState } from 'react'
import type { Note } from '../types'

type NotesContextType = {
  notes: Note[]
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  createNote: () => {},
})

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  function createNote({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    }

    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  return (
    <NotesContext.Provider value={{ notes, createNote }}>
      {children}
    </NotesContext.Provider>
  )
}

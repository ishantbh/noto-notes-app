import { createContext, useState } from 'react'
import type { Note } from '../types'

type NotesContextType = {
  notes: Note[]
  getNoteById: (id: string) => Note | undefined
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  getNoteById: () => undefined,
  createNote: () => {},
})

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  function getNoteById(id: string) {
    return notes.find((note) => note.id === id)
  }

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
    <NotesContext.Provider value={{ notes, getNoteById, createNote }}>
      {children}
    </NotesContext.Provider>
  )
}

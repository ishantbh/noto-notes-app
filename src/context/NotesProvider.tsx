import { createContext, useEffect, useState } from 'react'
import type { Note } from '../types'

const NOTES_STORAGE_KEY = 'notes'

type NotesContextType = {
  notes: Note[]
  getNoteById: (id: string) => Note | undefined
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
  deleteNote: (id: string) => void
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  getNoteById: () => undefined,
  createNote: () => {},
  deleteNote: () => {},
})

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY)
    return storedNotes ? JSON.parse(storedNotes) : []
  })

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

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

  function deleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
  }

  return (
    <NotesContext.Provider
      value={{ notes, getNoteById, createNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  )
}

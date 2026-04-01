import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Note } from '../types'

type NotesStore = {
  notes: Note[]
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
  updateNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      createNote: ({ title, content }) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title,
          content,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          notes: [...state.notes, newNote],
        }))
      },

      updateNote: (updatedNote) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note,
          ),
        }))
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },
    }),
    { name: 'notes-storage' },
  ),
)

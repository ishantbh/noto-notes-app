import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Note } from '../types'

type NotesStore = {
  notes: Record<string, Note>
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
  updateNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: {},

      createNote: ({ title, content }) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title,
          content,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          notes: { ...state.notes, [newNote.id]: newNote },
        }))
      },

      updateNote: (updatedNote) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [updatedNote.id]: updatedNote,
          },
        }))
      },

      deleteNote: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.notes

          return { notes: rest }
        })
      },
    }),
    { name: 'notes-storage' },
  ),
)

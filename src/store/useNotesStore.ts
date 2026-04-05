import { create } from 'zustand'
import type { Note } from '@/types'

type NotesState = {
  notes: Record<string, Note>
  initialized: boolean
  setInitialized: (initialized: boolean) => void
  createNote: (note: Note) => void
  updateNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>()((set) => ({
  notes: {},
  initialized: false,

  setInitialized: (initialized) => {
    set({ initialized })
  },

  createNote: (newNote) => {
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
}))

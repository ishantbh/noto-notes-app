import { create } from 'zustand'
import type { Note } from '@/types'

type NotesState = {
  notes: Record<string, Note>
  createNote: (note: Note) => void
  updateNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>()((set) => ({
  notes: {},

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

import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'sonner'
import { db } from '@/firebase/firestore'
import type { Note } from '@/types'
import { useAuthStore, useNotesStore } from '@/store'

export function useNotesChangesEffect() {
  const user = useAuthStore((state) => state.user)

  const {
    setInitialized: setNotesInitialized,
    createNote,
    updateNote,
    deleteNote,
  } = useNotesStore(
    useShallow((state) => ({
      setInitialized: state.setInitialized,
      createNote: state.createNote,
      updateNote: state.updateNote,
      deleteNote: state.deleteNote,
    })),
  )

  useEffect(() => {
    if (!user) return

    const notesQuery = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid),
    )

    const unsub = onSnapshot(
      notesQuery,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const id = change.doc.id
          const data = change.doc.data({ serverTimestamps: 'estimate' })
          const note = {
            id,
            ...data,
            createdAt: data.createdAt.toDate(),
          } as Note

          switch (change.type) {
            case 'added':
              createNote(note)
              break
            case 'modified':
              updateNote(note)
              break
            case 'removed':
              deleteNote(id)
              break
            default:
              console.error('Unknown change type:', change.type)
          }
        })

        setNotesInitialized(true)
      },
      (error) => {
        console.error('Error listening to notes:', error)

        toast.error(
          error instanceof Error ? error.message : 'Error listening to notes',
        )
      },
    )

    return () => unsub()
  }, [user])

  return null
}

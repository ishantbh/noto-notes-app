import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'sonner'
import { auth } from '@/firebase/auth'
import { db } from '@/firebase/firestore'
import { getUserFromDB } from '@/lib/firestore'
import type { AppUser, Note } from '@/types'
import { useAuthStore, useNotesStore, useThemeStore } from '@/store'
import { AuthLayout, ProtectedLayout, Root } from '@/layouts'
import {
  Create,
  Edit,
  Home,
  Login,
  NoteDetails,
  NotFound,
  Signup,
} from '@/pages'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  const theme = useThemeStore((state) => state.theme)
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({ user: state.user, setUser: state.setUser })),
  )
  const { createNote, updateNote, deleteNote } = useNotesStore(
    useShallow((state) => ({
      createNote: state.createNote,
      updateNote: state.updateNote,
      deleteNote: state.deleteNote,
    })),
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      let appUser: AppUser | null = null

      if (firebaseUser) {
        try {
          appUser = await getUserFromDB(firebaseUser.uid)
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : 'Error loading user',
          )
        }
      }

      setUser(appUser)
    })

    return unsub
  }, [setUser])

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route element={<ProtectedLayout />}>
              <Route index element={<Home />} />
              <Route path='create' element={<Create />} />
              <Route path='notes/:id'>
                <Route index element={<NoteDetails />} />
                <Route path='edit' element={<Edit />} />
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster closeButton richColors />
    </>
  )
}

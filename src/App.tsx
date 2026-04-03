import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/auth'
import { useAuthStore, useThemeStore } from '@/store'
import { Root } from '@/layouts'
import { Create, Edit, Home, Login, NoteDetails, NotFound } from '@/pages'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  const theme = useThemeStore((state) => state.theme)
  const setUser = useAuthStore((state) => state.setUser)

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
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsub
  }, [setUser])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='create' element={<Create />} />
            <Route path='notes/:id'>
              <Route index element={<NoteDetails />} />
              <Route path='edit' element={<Edit />} />
            </Route>
            <Route path='login' element={<Login />} />

            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster closeButton richColors />
    </>
  )
}

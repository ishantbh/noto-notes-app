import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useThemeStore } from '@/store'
import { Root } from '@/layouts'
import { Create, Edit, Home, NoteDetails, NotFound } from '@/pages'

export default function App() {
  const theme = useThemeStore((state) => state.theme)

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='create' element={<Create />} />
          <Route path='notes/:id'>
            <Route index element={<NoteDetails />} />
            <Route path='edit' element={<Edit />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

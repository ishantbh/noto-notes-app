import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useThemeStore } from '@/store'
import { Root } from '@/layouts'
import { Create, Edit, Home, NoteDetails, NotFound } from '@/pages'

export default function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
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

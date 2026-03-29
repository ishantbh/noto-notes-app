import { BrowserRouter, Route, Routes } from 'react-router'
import { Root } from './layouts'
import { Create, Home, NoteDetails, NotFound } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='create' element={<Create />} />
          <Route path='notes/:id' element={<NoteDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

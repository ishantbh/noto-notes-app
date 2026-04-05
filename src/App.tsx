import { BrowserRouter, Route, Routes } from 'react-router'
import {
  useAuthChangedEffect,
  useNotesChangesEffect,
  useThemeEffect,
} from '@/hooks'
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
  useThemeEffect()
  useAuthChangedEffect()
  useNotesChangesEffect()

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

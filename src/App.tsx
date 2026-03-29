import { BrowserRouter, Route, Routes } from 'react-router'
import { Root } from './layouts'
import { Home } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

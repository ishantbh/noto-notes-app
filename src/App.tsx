import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import { Root } from './layouts/Root'

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

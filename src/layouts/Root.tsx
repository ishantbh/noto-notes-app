import { Outlet } from 'react-router'
import { Header } from '../components'

export function Root() {
  return (
    <div className='min-h-screen w-full flex flex-col bg-blue-50'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
    </div>
  )
}

import { Outlet } from 'react-router'
import { Header } from '../components'

export function Root() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
    </div>
  )
}

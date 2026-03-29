import { Outlet } from 'react-router'

export function Root() {
  return (
    <div className='min-h-screen w-full flex flex-col bg-blue-50'>
      <main className='grow'>
        <Outlet />
      </main>
    </div>
  )
}

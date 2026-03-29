import { Link } from 'react-router'

export function Header() {
  return (
    <header className='shadow-sm'>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        <h1 className='text-3xl font-extrabold tracking-tight'>
          <Link to='/'>Noto</Link>
        </h1>
        <Link
          to='/create'
          className='block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer transition hover:bg-blue-600 font-medium'
        >
          New Note
        </Link>
      </div>
    </header>
  )
}

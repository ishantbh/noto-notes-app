import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export function NoteNotFound() {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-medium mt-1'>Not Found</h2>
      <p className='text-neutral-500 mb-4'>
        The note you are looking for does not exist!
      </p>
      <Link to='/' className='btn flex items-center justify-center gap-2'>
        <ArrowLeft className='size-5' aria-hidden />
        Go Back Home
      </Link>
    </div>
  )
}

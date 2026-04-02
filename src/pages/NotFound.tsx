import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-medium mt-1'>Not Found</h2>
          <p className='text-neutral-500 mb-4'>
            The resource you are looking for does not exist!
          </p>
          <Link to='/' className='btn flex items-center justify-center gap-2'>
            <ArrowLeft className='size-5' aria-hidden />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import { ThemeToggle } from '@/components'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className='shadow-sm shadow-foreground/10'>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        <h1 className='text-3xl font-extrabold tracking-tight'>
          <Link to='/'>Noto</Link>
        </h1>
        <div className='flex items-center gap-4'>
          <Button asChild>
            <Link to='/create'>
              <Plus className='size-5' aria-hidden />
              <span>New Note</span>
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

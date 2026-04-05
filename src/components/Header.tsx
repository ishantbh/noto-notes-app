import { useTransition } from 'react'
import { Link } from 'react-router'
import { LogOut, Plus } from 'lucide-react'
import { useAuthStore } from '@/store'
import { logout } from '@/lib/auth'
import { ThemeToggle } from '@/components'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export function Header() {
  const [isLoggingOut, startTransition] = useTransition()

  const user = useAuthStore((state) => state.user)
  const userInitialized = useAuthStore((state) => state.initialized)

  function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <header className='shadow-sm shadow-foreground/10'>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        <h1 className='text-3xl font-extrabold tracking-tight'>
          <Link to='/'>Noto</Link>
        </h1>
        <div className='flex items-center gap-2'>
          {userInitialized &&
            (user ? (
              <>
                <Button asChild>
                  <Link to='/create'>
                    <Plus className='size-5' aria-hidden />
                    <span>New Note</span>
                  </Link>
                </Button>

                <Button
                  variant='secondary'
                  size='icon'
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? <Spinner /> : <LogOut />}
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link to='/login'>
                    <span>Login</span>
                  </Link>
                </Button>

                <Button variant='secondary' asChild>
                  <Link to='/signup'>
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            ))}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

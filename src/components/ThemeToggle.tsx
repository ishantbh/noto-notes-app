import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className='btn' onClick={() => toggleTheme()}>
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}

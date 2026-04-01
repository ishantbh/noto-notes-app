import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <button className='btn' onClick={() => toggleTheme()}>
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}

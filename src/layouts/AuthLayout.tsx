import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store'
import { Splash } from '@/pages'

export function AuthLayout() {
  const initialized = useAuthStore((state) => state.initialized)
  const user = useAuthStore((state) => state.user)

  if (!initialized) return <Splash />

  if (user) return <Navigate to='/' />

  return <Outlet />
}

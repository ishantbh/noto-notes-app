import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/store'
import Splash from '@/pages/Splash'

export function ProtectedLayout() {
  const initialized = useAuthStore((state) => state.initialized)
  const user = useAuthStore((state) => state.user)

  if (!initialized) return <Splash />

  if (!user) return <Navigate to='/login' />

  return <Outlet />
}

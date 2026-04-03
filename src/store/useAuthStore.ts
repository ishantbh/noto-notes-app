import type { AppUser } from '@/types'
import { create } from 'zustand'

type AuthState = {
  user: AppUser | null
  initialized: boolean
  setUser: (user: AppUser | null) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user, initialized: true }),
}))

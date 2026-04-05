import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'sonner'
import { auth } from '@/firebase/auth'
import { getUserFromDB } from '@/lib/firestore'
import type { AppUser } from '@/types'
import { useAuthStore } from '@/store'

export function useAuthChangedEffect() {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      let appUser: AppUser | null = null

      if (firebaseUser) {
        try {
          appUser = await getUserFromDB(firebaseUser.uid)
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : 'Error loading user',
          )
        }
      }

      setUser(appUser)
    })

    return () => unsub()
  }, [setUser])

  return null
}

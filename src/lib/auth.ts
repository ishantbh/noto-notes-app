import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/auth'

export async function logout() {
  await signOut(auth)
}

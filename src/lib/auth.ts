import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/firebase/auth'

export async function loginWithEmail({
  email,
  password,
}: {
  email: string
  password: string
}) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  await signOut(auth)
}

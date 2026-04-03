import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/firebase/auth'

export async function signupWithEmail({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  await createUserWithEmailAndPassword(auth, email, password)

  // TODO: Add user info to firestore
}

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

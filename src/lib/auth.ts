import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/firebase/auth'
import { createUserInDB } from '@/lib/firestore'
import type { AppUser } from '@/types'

export async function signupWithEmail({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password)
  const user: AppUser = {
    uid: userCreds.user.uid,
    name,
    email,
  }

  // Add user info to firestore
  await createUserInDB(user)
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

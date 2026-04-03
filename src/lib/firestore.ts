import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firestore'
import type { AppUser } from '@/types'

export async function createUserInDB(user: AppUser) {
  try {
    await setDoc(doc(db, 'users', user.uid), user)
  } catch (error) {
    console.error('Error creating user in Firestore:', error)

    throw new Error('Error creating user in Firestore')
  }
}

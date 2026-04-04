import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '@/firebase/firestore'
import type { AppUser, Note } from '@/types'

export async function createUserInDB(user: AppUser) {
  try {
    await setDoc(doc(db, 'users', user.uid), user)
  } catch (error) {
    console.error('Error creating user in Firestore:', error)

    throw new Error('Error creating user in Firestore')
  }
}

export async function getUserFromDB(uid: string) {
  try {
    const docRef = doc(db, 'users', uid)
    const snapshot = await getDoc(docRef)

    if (snapshot.exists()) {
      return snapshot.data() as AppUser
    }

    throw new Error('User not found')
  } catch (error) {
    console.error('Error getting user from Firestore:', error)

    throw new Error('Error getting user from Firestore')
  }
}

export async function createNoteInDB(note: Omit<Note, 'id' | 'createdAt'>) {
  try {
    await addDoc(collection(db, 'notes'), {
      ...note,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Error creating note in Firestore',
    )
  }
}

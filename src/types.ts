export type Theme = 'light' | 'dark' | 'system'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
}

export type AppUser = {
  uid: string
  name: string
  email: string
}

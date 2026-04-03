export type Theme = 'light' | 'dark' | 'system'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
}

export type AppUser = {
  uid: string
  name: string
  email: string
}

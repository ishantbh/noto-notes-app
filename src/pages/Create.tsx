import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import type { Note } from '@/types'
import { createNoteInDB } from '@/lib/firestore'
import { useAuthStore } from '@/store'
import { AddEditForm } from '@/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Create() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  async function handleSubmit({
    title,
    content,
  }: Omit<Note, 'id' | 'createdAt' | 'userId'>) {
    if (!title || !content) {
      toast.error('Title and content are required')
      return
    }

    if (!user) {
      toast.error('You must be logged in to create a note')
      return
    }

    // Save the note
    try {
      await createNoteInDB({ title, content, userId: user.uid })

      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error creating note',
      )
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='w-full sm:max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Create Note</CardTitle>
          <CardDescription>Create a new note</CardDescription>
        </CardHeader>

        <CardContent>
          <AddEditForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

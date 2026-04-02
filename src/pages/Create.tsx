import type { Note } from '@/types'
import { useNotesStore } from '@/store'
import { AddEditForm } from '@/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Create() {
  const createNote = useNotesStore((state) => state.createNote)

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    createNote({ title, content })
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

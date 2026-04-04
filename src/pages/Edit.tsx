import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import type { Note } from '@/types'
import { updateNoteInDB } from '@/lib/firestore'
import { useNotesStore } from '@/store'
import { AddEditForm, NoteNotFound } from '@/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Edit() {
  const { id } = useParams()

  const note = useNotesStore((state) => (id ? state.notes[id] : null))

  return (
    <div className='container mx-auto px-4 py-8'>
      {note ? <EditView note={note} /> : <NoteNotFound />}
    </div>
  )
}

function EditView({ note }: { note: Note }) {
  const navigate = useNavigate()

  async function handleSubmit({
    title,
    content,
  }: Omit<Note, 'id' | 'createdAt' | 'userId'>) {
    if (!title || !content) return

    // Save the note
    try {
      await updateNoteInDB({ ...note, title, content })

      toast.success('Note updated successfully')
      navigate('/')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error updating note',
      )
    }
  }

  return (
    <div>
      <Card className='w-full sm:max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>Edit an existing note</CardDescription>
        </CardHeader>

        <CardContent>
          <AddEditForm onSubmit={handleSubmit} note={note} />
        </CardContent>
      </Card>
    </div>
  )
}

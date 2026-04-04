import { useParams } from 'react-router'
import type { Note } from '@/types'
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
  function handleSubmit({
    title,
    content,
  }: Omit<Note, 'id' | 'createdAt' | 'userId'>) {
    if (!title || !content) return

    // Save the note
    // TODO: Update the note in Firestore
    // updateNote({ ...note, title, content })
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

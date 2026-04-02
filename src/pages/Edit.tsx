import { useParams } from 'react-router'
import type { Note } from '@/types'
import { useNotesStore } from '@/store'
import { AddEditForm, NoteNotFound } from '@/components'

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
  const updateNote = useNotesStore((state) => state.updateNote)

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    updateNote({ ...note, title, content })
  }

  return (
    <div>
      <div className='w-full max-w-xl mx-auto mb-8 text-center'>
        <h2 className='text-xl font-extrabold'>Edit Note</h2>
        <p className='text-neutral-500'>Edit an existing note</p>
      </div>

      <AddEditForm onSubmit={handleSubmit} note={note} />
    </div>
  )
}

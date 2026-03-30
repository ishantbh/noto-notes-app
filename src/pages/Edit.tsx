import { useParams } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import { AddEditForm, NoteNotFound } from '../components'
import type { Note } from '../types'

export default function Edit() {
  let note: Note | undefined

  const { id } = useParams()

  const { getNoteById } = useNotes()

  if (id) {
    note = getNoteById(id)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {note ? <EditView note={note} /> : <NoteNotFound />}
    </div>
  )
}

function EditView({ note }: { note: Note }) {
  const { updateNote } = useNotes()

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    updateNote({ ...note, title, content })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-xl font-extrabold'>Edit Note</h2>
          <p className='text-neutral-500'>Edit an existing note</p>
        </div>

        <AddEditForm onSubmit={handleSubmit} note={note} />
      </div>
    </div>
  )
}

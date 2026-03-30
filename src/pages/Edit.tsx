import { useNavigate, useParams } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import { AddEditForm, NoteNotFound } from '../components'
import type { Note } from '../types'
import { ArrowLeft } from 'lucide-react'

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
  const navigate = useNavigate()

  const { updateNote } = useNotes()

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    updateNote({ ...note, title, content })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <div className='w-full max-w-xl mx-auto mb-8 gap-4 relative'>
          <button
            onClick={() => navigate(-1)}
            className='absolute btn-outline text-neutral-500 -translate-y-1/2 top-1/2'
          >
            <ArrowLeft className='size-5' aria-hidden />
            <span className='sr-only'>Go Back</span>
          </button>
          <div className='text-center'>
            <h2 className='text-xl font-extrabold'>Edit Note</h2>
            <p className='text-neutral-500'>Edit an existing note</p>
          </div>
        </div>

        <AddEditForm onSubmit={handleSubmit} note={note} />
      </div>
    </div>
  )
}

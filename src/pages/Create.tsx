import { useNotes } from '../hooks/useNotes'
import { AddEditForm } from '../components'
import type { Note } from '../types'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function Create() {
  const navigate = useNavigate()

  const { createNote } = useNotes()

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    createNote({ title, content })
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
            <h2 className='text-xl font-extrabold'>Create Note</h2>
            <p className='text-neutral-500'>Create a new note</p>
          </div>
        </div>

        <AddEditForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

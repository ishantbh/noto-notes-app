import { useNotes } from '../hooks/useNotes'
import { AddEditForm } from '../components'
import type { Note } from '../types'

export default function Create() {
  const { createNote } = useNotes()

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    createNote({ title, content })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-xl font-extrabold'>Create Note</h2>
          <p className='text-neutral-500'>Create a new note</p>
        </div>

        <AddEditForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

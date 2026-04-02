import type { Note } from '@/types'
import { useNotesStore } from '@/store'
import { AddEditForm } from '@/components'

export default function Create() {
  const createNote = useNotesStore((state) => state.createNote)

  function handleSubmit({ title, content }: Omit<Note, 'id' | 'createdAt'>) {
    if (!title || !content) return

    // Save the note
    createNote({ title, content })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <div className='w-full max-w-xl mx-auto mb-8 text-center'>
          <h2 className='text-xl font-extrabold'>Create Note</h2>
          <p className='text-neutral-500'>Create a new note</p>
        </div>

        <AddEditForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

import { Link } from 'react-router'
import { NoteCard } from '@/components'
import { useNotesStore } from '@/store'
import { Splash } from '@/pages'
import { Button } from '@/components/ui/button'

export function NotesList() {
  const initialized = useNotesStore((state) => state.initialized)

  const notes = useNotesStore((state) => state.notes)
  const noteIds = Object.keys(notes)

  if (!initialized) return <Splash />

  if (noteIds.length === 0) {
    return (
      <div className='text-center flex flex-col items-center'>
        <h2 className='text-2xl font-medium mt-1'>No notes yet</h2>
        <p className='text-neutral-500 mb-4'>
          Create a new note to get started
        </p>
        <Button asChild>
          <Link to='/create' className='btn'>
            Create Note
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {noteIds.map((noteId) => (
        <NoteCard key={noteId} noteId={noteId} />
      ))}
    </div>
  )
}

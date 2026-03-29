import { Link } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import { NoteCard } from './NoteCard'

export function NotesList() {
  const { notes } = useNotes()

  if (notes.length === 0) {
    return (
      <div className='text-center flex flex-col items-center'>
        <h2 className='text-2xl font-medium mt-1'>No notes yet</h2>
        <p className='text-neutral-500 mb-4'>
          Create a new note to get started
        </p>
        <Link to='/create' className='btn'>
          Create Note
        </Link>
      </div>
    )
  }

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

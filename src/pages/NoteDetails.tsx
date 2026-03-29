import { Link, useParams } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import type { Note } from '../types'
import { formatDate } from '../utils/fomatters'

export default function NoteDetails() {
  let note: Note | undefined

  const { id } = useParams()

  const { getNoteById } = useNotes()

  if (id) {
    note = getNoteById(id)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {note ? <NoteDetailsView note={note} /> : <NoteNotFound />}
    </div>
  )
}

function NoteDetailsView({ note }: { note: Note }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full max-w-xl mx-auto'>
        <div className='flex items-center gap-2 mb-4'>
          <h2 className='text-3xl font-bold grow'>{note.title}</h2>
          <Link to={`/notes/${note.id}/edit`} className='btn'>
            Edit
          </Link>
          <button className='btn bg-red-400 hover:bg-red-500'>Delete</button>
        </div>
        <time dateTime={note.createdAt} className='text-sm text-neutral-400'>
          {formatDate(note.createdAt)}
        </time>
        <p className='text-lg text-neutral-500 tracking-wide leading-relaxed'>
          {note.content}
        </p>
      </div>
    </div>
  )
}

function NoteNotFound() {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-medium mt-1'>Not Found</h2>
      <p className='text-neutral-500 mb-4'>
        The note you are looking for does not exist!
      </p>
      <Link to='/' className='btn'>
        Go Back Home
      </Link>
    </div>
  )
}

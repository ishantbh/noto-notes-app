import { Link, useParams } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import type { Note } from '../types'
import { formatDate } from '../utils/fomatters'
import { Pencil } from 'lucide-react'
import { DeleteButton } from '../components'
import { NoteNotFound } from '../components'

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
            <Pencil className='size-5' aria-hidden />
            <span className='sr-only'>Edit</span>
          </Link>
          <DeleteButton id={note.id} />
        </div>
        <time dateTime={note.createdAt} className='text-sm text-neutral-400'>
          {formatDate(note.createdAt)}
        </time>
        <p className='text-lg text-neutral-500 tracking-wide leading-relaxed whitespace-pre-wrap'>
          {note.content}
        </p>
      </div>
    </div>
  )
}

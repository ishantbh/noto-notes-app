import { Link } from 'react-router'
import type { Note } from '../types'
import { formatDate } from '../utils/fomatters'

type NoteCardProps = {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className='block bg-white p-4 rounded-xl shadow-sm transition hover:shadow-md'
    >
      <div className='flex flex-col gap-1 h-full'>
        <h2 className='font-bold text-xl'>{note.title}</h2>
        <p className='line-clamp-2 text-neutral-500 mb-2 grow'>
          {note.content}
        </p>
        <time dateTime={note.createdAt} className='text-sm text-neutral-400'>
          {formatDate(note.createdAt)}
        </time>
      </div>
    </Link>
  )
}

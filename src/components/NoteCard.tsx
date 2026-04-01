import { Link } from 'react-router'
import removeMd from 'remove-markdown'
import { useNotesStore } from '@/store'
import { formatDate } from '@/utils'

type NoteCardProps = {
  noteId: string
}

export function NoteCard({ noteId }: NoteCardProps) {
  const note = useNotesStore((state) => state.notes[noteId])

  return (
    <Link
      to={`/notes/${note.id}`}
      className='block bg-card p-6 rounded-xl shadow-sm transition hover:shadow-md shadow-foreground/10 border border-foreground/10'
    >
      <div className='flex flex-col gap-1 h-full'>
        <h2 className='font-bold text-xl'>{note.title}</h2>
        <p className='line-clamp-2 text-neutral-500 dark:text-neutral-400 mb-2 grow whitespace-pre-wrap'>
          {removeMd(note.content)}
        </p>
        <time
          dateTime={note.createdAt}
          className='text-sm text-neutral-400 dark:text-neutral-500'
        >
          {formatDate(note.createdAt)}
        </time>
      </div>
    </Link>
  )
}

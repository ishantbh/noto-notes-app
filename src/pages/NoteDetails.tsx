import { Link, useParams } from 'react-router'
import type { Note } from '../types'
import { formatDate } from '../utils/fomatters'
import { Pencil } from 'lucide-react'
import { DeleteButton, NoteNotFound } from '../components'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNotesStore } from '../store/useNotesStore'

export default function NoteDetails() {
  const { id } = useParams()

  const note = useNotesStore((state) =>
    state.notes.find((note) => note.id === id),
  )

  return (
    <div className='container mx-auto px-4 py-8'>
      {note ? <NoteDetailsView note={note} /> : <NoteNotFound />}
    </div>
  )
}

function NoteDetailsView({ note }: { note: Note }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full max-w-2xl mx-auto'>
        <div className='flex items-center gap-2 mb-2'>
          <h2 className='text-3xl font-bold grow'>{note.title}</h2>
          <Link to={`/notes/${note.id}/edit`} className='btn'>
            <Pencil className='size-5' aria-hidden />
            <span className='sr-only'>Edit</span>
          </Link>
          <DeleteButton id={note.id} />
        </div>
        <time
          dateTime={note.createdAt}
          className='text-sm text-neutral-500 dark:text-neutral-400'
        >
          {formatDate(note.createdAt)}
        </time>
        <div className='bg-card prose prose-neutral max-w-none mt-4 p-4 rounded-md dark:prose-invert'>
          <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
        </div>
      </div>
    </div>
  )
}

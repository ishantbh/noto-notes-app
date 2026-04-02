import { Link, useParams } from 'react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Pencil } from 'lucide-react'
import type { Note } from '@/types'
import { formatDate } from '@/utils'
import { useNotesStore } from '@/store'
import { DeleteButton, NoteNotFound } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NoteDetails() {
  const { id } = useParams()

  const note = useNotesStore((state) => (id ? state.notes[id] : null))

  return (
    <div className='container mx-auto px-4 py-8'>
      {note ? <NoteDetailsView note={note} /> : <NoteNotFound />}
    </div>
  )
}

function NoteDetailsView({ note }: { note: Note }) {
  return (
    <Card className='max-w-3xl mx-auto'>
      <CardHeader>
        <CardTitle>
          <h2 className='text-2xl'>{note.title}</h2>
          <time
            dateTime={note.createdAt}
            className='text-xs text-muted-foreground'
          >
            {formatDate(note.createdAt)}
          </time>
        </CardTitle>

        <CardAction>
          <div className='space-x-2'>
            <Button variant='outline' size='icon' asChild>
              <Link to={`/notes/${note.id}/edit`}>
                <Pencil aria-hidden />
                <span className='sr-only'>Edit</span>
              </Link>
            </Button>

            <DeleteButton id={note.id} />
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className='prose dark:prose-invert max-w-full'>
          <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
        </div>
      </CardContent>
    </Card>
  )
}

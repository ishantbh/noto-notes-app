import { Link } from 'react-router'
import removeMd from 'remove-markdown'
import { useNotesStore } from '@/store'
import { formatDate } from '@/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type NoteCardProps = {
  noteId: string
}

export function NoteCard({ noteId }: NoteCardProps) {
  const note = useNotesStore((state) => state.notes[noteId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>
            <Link to={`/notes/${note.id}`} className='hover:opacity-80'>
              {note.title}
            </Link>
          </h3>
          <time
            dateTime={note.createdAt}
            className='text-xs text-muted-foreground'
          >
            {formatDate(note.createdAt)}
          </time>
        </CardTitle>
      </CardHeader>
      <CardContent className='grow'>
        <p className='line-clamp-2'>{removeMd(note.content)}</p>
      </CardContent>
    </Card>
  )
}

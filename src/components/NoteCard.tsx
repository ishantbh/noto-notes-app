import { Link } from 'react-router'
import removeMd from 'remove-markdown'
import { useNotesStore } from '@/store'
import { formatDate } from '@/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type NoteCardProps = {
  noteId: string
}

export function NoteCard({ noteId }: NoteCardProps) {
  const note = useNotesStore((state) => state.notes[noteId])

  const tags = note.tags
    .trim()
    .split(',')
    .filter((tag) => tag.trim())

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
      <CardContent>
        <p className='line-clamp-2'>{removeMd(note.content)}</p>
      </CardContent>

      {/* {!!tags.length && ( */}
      <CardFooter>
        <div className='flex w-full flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <Badge key={index} variant='secondary'>
              {tag.trim()}
            </Badge>
          ))}
        </div>
      </CardFooter>
      {/* )} */}
    </Card>
  )
}

import { NoteCard } from '../components/NoteCard'
import type { Note } from '../types'

export default function Home() {
  const dummyNotes: Note[] = [
    {
      id: '1',
      title: 'Note Title 1',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi quibusdam tempore cupiditate voluptatum incidunt iste fugiat architecto amet dolore a.',
      createdAt: '2026-03-29',
    },
    {
      id: '2',
      title: 'Note Title 2',
      content: 'Lorem ipsum, dolor sit',
      createdAt: '2026-03-29',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {dummyNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

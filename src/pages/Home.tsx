import { NoteCard } from '../components'
import { useNotes } from '../hooks/useNotes'

export default function Home() {
  const { notes } = useNotes()

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

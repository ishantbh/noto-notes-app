import { NotesList } from '@/components'
import { useAuthStore } from '@/store'
import { extractFirstName } from '@/utils/fomatters'

export default function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className='container mx-auto px-4 py-8'>
      {user && (
        <h2 className='text-3xl text-center mb-8'>
          Welcome{' '}
          <span className='font-bold'>{extractFirstName(user.name)}!</span>
        </h2>
      )}
      <NotesList />
    </div>
  )
}

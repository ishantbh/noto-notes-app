import { useNavigate } from 'react-router'
import type { Note } from '../types'

type AddEditFormProps = {
  onSubmit: (data: Omit<Note, 'id' | 'createdAt'>) => void
  note?: Note
}

export function AddEditForm({ onSubmit, note }: AddEditFormProps) {
  const navigate = useNavigate()

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target

    const formData = new FormData(form)

    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()

    if (!title || !content) {
      alert('Please fill all the fields')
      return
    }

    // Save the note
    onSubmit({ title, content })

    form.reset()

    navigate('/')
  }

  return (
    <div className='w-full max-w-xl mx-auto bg-card border border-foreground/10 p-8 rounded-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='title' className='font-medium text-sm'>
            Title
          </label>
          <input
            id='title'
            type='text'
            name='title'
            defaultValue={note?.title}
            placeholder='My amazing note title'
            className='border px-2 py-1 rounded-md border-neutral-400 dark:border-neutral-500'
            required
          />
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='content' className='font-medium text-sm'>
            Content
          </label>
          <textarea
            name='content'
            id='content'
            defaultValue={note?.content}
            placeholder="What's on your mind?"
            className='border px-2 py-1 rounded-md border-neutral-400 dark:border-neutral-500'
            rows={10}
            required
          ></textarea>
        </div>

        <button type='submit' className='btn w-full'>
          Save
        </button>
      </form>
    </div>
  )
}

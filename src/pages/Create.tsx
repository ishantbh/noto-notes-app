export default function Create() {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const title = formData.get('title')
    const content = formData.get('content')

    if (!title || !content) {
      alert('Please fill all the fields')
      return
    }

    // TODO: Save the note
    console.log(Object.fromEntries(formData))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <div className='text-center mb-8'>
          <h2 className='text-xl font-extrabold'>Create Note</h2>
          <p className='text-neutral-500'>Create a new note</p>
        </div>

        <div className='w-full max-w-xl mx-auto bg-neutral-50 p-8 rounded-md shadow'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor='title' className='font-medium text-sm'>
                Title
              </label>
              <input
                id='title'
                type='text'
                name='title'
                placeholder='My amazing note title'
                className='border px-2 py-1 rounded-md border-neutral-500'
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
                placeholder="What's on your mind?"
                className='border px-2 py-1 rounded-md border-neutral-500'
                rows={10}
                required
              ></textarea>
            </div>

            <button type='submit' className='btn w-full'>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

type DeleteConfirmDialogProps = {
  handleDelete: () => void
  handleCancel: () => void
}

export function DeleteConfirmDialog({
  handleDelete,
  handleCancel,
}: DeleteConfirmDialogProps) {
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full m-4'>
        <h2 className='text-2xl font-bold'>Are you sure?</h2>
        <p className='text-neutral-500 mb-4'>This action cannot be undone.</p>
        <div className='flex items-center justify-end gap-3'>
          <button
            onClick={handleCancel}
            className='btn-outline text-neutral-500'
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className='btn bg-red-500 hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

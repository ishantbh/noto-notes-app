import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Trash2 } from 'lucide-react'
import { useNotesStore } from '@/store'
import { DeleteConfirmDialog } from '@/components'

type DeleteButtonProps = {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote)
  const navigate = useNavigate()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleDelete() {
    deleteNote(id)
    setIsDialogOpen(false)
    navigate('/', {
      replace: true,
    })
  }

  function handleCancel() {
    setIsDialogOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className='btn bg-destructive hover:bg-destructive/80'
      >
        <Trash2 className='size-5' aria-hidden />
        <span className='sr-only'>Delete</span>
      </button>

      {isDialogOpen && (
        <DeleteConfirmDialog
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}

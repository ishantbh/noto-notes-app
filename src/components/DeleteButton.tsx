import { Trash2 } from 'lucide-react'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'
import { useState } from 'react'
import { useNotes } from '../hooks/useNotes'
import { useNavigate } from 'react-router'

type DeleteButtonProps = {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const { deleteNote } = useNotes()
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

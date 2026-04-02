import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Trash2 } from 'lucide-react'
import { useNotesStore } from '@/store'
import { DeleteConfirmDialog } from '@/components'
import { Button } from '@/components/ui/button'

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
      <Button
        variant='destructive'
        size='icon'
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash2 aria-hidden />
        <span className='sr-only'>Delete</span>
      </Button>

      {isDialogOpen && (
        <DeleteConfirmDialog
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}

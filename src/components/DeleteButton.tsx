import { useNavigate } from 'react-router'
import { Trash2 } from 'lucide-react'
import { useNotesStore } from '@/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

type DeleteButtonProps = {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote)
  const navigate = useNavigate()

  function handleDelete() {
    deleteNote(id)
    toast.success('Note deleted successfully')
    navigate('/', { replace: true })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='destructive' size='icon'>
          <Trash2 aria-hidden />
          <span className='sr-only'>Delete</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button onClick={handleDelete} variant='destructive'>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

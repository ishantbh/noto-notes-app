import { useTransition } from 'react'
import { useNavigate } from 'react-router'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { deleteNoteInDB } from '@/lib/firestore'
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
import { Spinner } from '@/components/ui/spinner'

type DeleteButtonProps = {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const navigate = useNavigate()

  const [isDeletePending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteNoteInDB(id)
        toast.success('Note deleted successfully')
        navigate('/', { replace: true })
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Error deleting note',
        )
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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

          <Button
            onClick={handleDelete}
            variant='destructive'
            disabled={isDeletePending}
          >
            {isDeletePending && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

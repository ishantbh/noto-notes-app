import { Spinner } from '@/components/ui/spinner'

export default function Splash() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mt-24 flex flex-col gap-4 items-center justify-center'>
        <Spinner className='size-16 text-muted-foreground' />
        <span className='sr-only'>Loading</span>
      </div>
    </div>
  )
}

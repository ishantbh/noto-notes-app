import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import type { Note } from '@/types'
import { AddEditFormSchema } from '@/schema'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type AddEditFormProps = {
  onSubmit: (data: Omit<Note, 'id' | 'createdAt' | 'userId'>) => Promise<void>
  note?: Note
}

export function AddEditForm({ onSubmit, note }: AddEditFormProps) {
  const form = useForm({
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
      tags: note?.tags || '',
    },
    validators: {
      onSubmit: AddEditFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name='title'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='My amazing note title'
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='tags'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='react, typescript, firebase'
                />
                <FieldDescription>
                  Enter comma-separated list of tags
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name='content'
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={6}
                  className='min-h-24 resize-none'
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  You can include markdown syntax to format your content.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isPristine,
            ]}
            children={([canSubmit, isSubmitting, isPristine]) => (
              <Button type='submit' disabled={!canSubmit || isPristine}>
                {isSubmitting && <Loader2 className='size-4 animate-spin' />}
                <span>Save</span>
              </Button>
            )}
          />
        </Field>
      </FieldGroup>
    </form>
  )
}

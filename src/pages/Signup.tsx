import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from 'react-router'
import { FirebaseError } from 'firebase/app'
import { toast } from 'sonner'
import { SignupSchema } from '@/schema'
import { signupWithEmail } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export default function Signup() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: SignupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, email, password } = value

        if (!name || !email || !password) {
          throw new Error('All fields are required')
        }

        await signupWithEmail({ name, email, password })

        toast.success('Successfully created account!')

        form.reset()

        navigate('/')
      } catch (error) {
        let message = 'Signup failed, try again!'

        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              message = 'User already exists'
              break
          }
        } else if (error instanceof Error) {
          message = error.message
        }

        toast.error(message)
      }
    },
  })

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>
            <h2>Create a new account</h2>
          </CardTitle>
          <CardDescription>
            <p>Enter your details below to create a new account</p>
          </CardDescription>
          <CardAction>
            <Button variant='ghost' asChild>
              <Link to='/login'>Login</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            id='signup-form'
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name='name'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='John Doe'
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name='email'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='john.doe@mail.com'
                        type='email'
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name='password'
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='••••••••'
                        type='password'
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation='horizontal'>
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
                state.isPristine,
              ]}
              children={([canSubmit, isSubmitting, isPristine]) => (
                <Button
                  type='submit'
                  form='signup-form'
                  disabled={!canSubmit || isPristine}
                >
                  {isSubmitting && <Spinner />}
                  <span>Sign Up</span>
                </Button>
              )}
            />
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

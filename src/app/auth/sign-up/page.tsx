'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import s from './page.module.css'
import { register } from '@/features/auth/actions/actions'

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await register(formData)

      if (result.success) {
        const signInResult = await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        })

        if (signInResult?.ok) {
          router.push('/')
          router.refresh()
        } else {
          router.push('/auth/signin?message=Account created, please sign in')
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>Create Account</h1>
        <p className={s.subtitle}>Sign up to get started</p>

        {error && <div className={s.error}>{error}</div>}

        <form action={handleSubmit} className={s.form}>
          <div className={s.formGroup}>
            <label htmlFor="name" className={s.label}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className={s.input}
              required
            />
          </div>

          <div className={s.formGroup}>
            <label htmlFor="email" className={s.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className={s.input}
              required
            />
          </div>

          <div className={s.formGroup}>
            <label htmlFor="password" className={s.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className={s.input}
              required
              minLength={6}
            />
            <p className={s.hint}>Minimum 6 characters</p>
          </div>

          <button type="submit" disabled={isLoading} className={s.submitButton}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={s.divider}>
          <span>Or</span>
        </div>

        <button
          onClick={() => signIn('google')}
          className={s.googleButton}
          type="button"
        >
          <svg className={s.googleIcon} viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>

        <p className={s.loginLink}>
          Already have an account?{' '}
          <Link href="/auth/signin" className={s.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

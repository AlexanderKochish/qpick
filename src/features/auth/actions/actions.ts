'use server'

import prisma from '@/shared/lib/prisma'
import bcrypt from 'bcryptjs'
import { auth, signIn } from '../../../../auth'
import { signInSchema, signUpSchema } from '../lib/zod/auth.schema'
import { z } from 'zod'
import { AuthError } from 'next-auth'

type LoginFormState = {
  errors: {
    email?: { _errors: string[] }
    password?: { _errors: string[] }
    name?: { _errors: string[] }
    _errors?: string[]
  }
  success: boolean
}

export async function register(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error)
    const formatted = {
      email: { _errors: treeified.properties?.email?.errors ?? [] },
      password: { _errors: treeified.properties?.password?.errors ?? [] },
      name: { _errors: treeified.properties?.name?.errors ?? [] },
      _errors: treeified.errors ?? [],
    }
    return { errors: formatted, success: false }
  }

  const { email, password, name } = validatedFields.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        errors: {
          _errors: ['User with this email already exists'],
        },
        success: false,
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: hashedPassword,
        role: 'USER',
      },
    })

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        redirectTo: '/',
      })

      if (result?.error) {
        return {
          errors: { _errors: [result.error] },
          success: false,
        }
      }

      return {
        errors: {},
        success: true,
      }
    } catch (error) {
      console.error('Sign in error after registration:', error)

      return {
        errors: {},
        success: true,
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      errors:
        error instanceof Error
          ? { _errors: [error.message] }
          : { _errors: ['Something went wrong during registration'] },
    }
  }
}

export async function login(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    const treeified = z.treeifyError(validatedFields.error)
    const formatted = {
      email: { _errors: treeified.properties?.email?.errors ?? [] },
      password: { _errors: treeified.properties?.password?.errors ?? [] },
      _errors: treeified.errors ?? [],
    }
    return { errors: formatted, success: false }
  }

  const { email, password } = validatedFields.data

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: '/',
    })

    if (result?.error) {
      let errorMessage = 'Invalid email or password'
      if (result.error === 'CredentialsSignin') {
        errorMessage = 'Invalid email or password'
      }

      return {
        success: false,
        errors: { _errors: [errorMessage] },
      }
    }

    return {
      errors: {},
      success: true,
    }
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            errors: { _errors: ['Invalid email or password'] },
          }
        default:
          return {
            success: false,
            errors: { _errors: ['Something went wrong'] },
          }
      }
    }

    return {
      success: false,
      errors: { _errors: ['Something went wrong'] },
    }
  }
}

export async function getCurrentSession() {
  return await auth()
}

'use server'

import prisma from '@/shared/lib/prisma'
import bcrypt from 'bcryptjs'
import { auth, signIn } from '../../../../auth'
import { signInSchema, signUpSchema } from '../lib/zod/auth.schema'
import { z } from 'zod'

type LoginFormState = {
  errors: {
    email?: { _errors: string[] }
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
      _errors: treeified.errors ?? [],
    }
    return { errors: formatted, success: false }
  }

  const { email, password, name } = validatedFields.data

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        errors: {
          _errors: ['User already exists'],
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

    await signIn('credentials', {
      email: user.email,
      password: user.password!,
      redirect: false,
    })

    const session = await auth()

    if (session?.user) {
      return {
        errors: {
          _errors: [],
        },
        success: true,
      }
    } else {
      return {
        success: false,
        errors: { _errors: ['Failed to sign in after registration'] },
      }
    }
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error
          ? { _errors: [error.message] }
          : { _errors: ['Something went wrong'] },
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
      _errors: treeified.errors ?? [],
    }
    return { errors: formatted, success: false }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        errors: { _errors: ['Failed to sign in'] },
      }
    } else {
      return {
        errors: {
          _errors: [],
        },
        success: true,
      }
    }
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error
          ? { _errors: [error.message] }
          : { _errors: ['Something went wrong'] },
    }
  }
}

export async function getCurrentSession() {
  return await auth()
}

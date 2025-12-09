'use server'

import prisma from '@/shared/lib/prisma'
import bcrypt from 'bcryptjs'
import { auth } from '../../../../auth'

type RegisterResult = {
  success: boolean
  userId?: string
}

type RegisterError = {
  success: false
  error: string
}

export async function register(formData: FormData): Promise<RegisterResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error('User already exists')
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

    return { success: true, userId: user.id }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

export async function getCurrentSession() {
  return await auth()
}

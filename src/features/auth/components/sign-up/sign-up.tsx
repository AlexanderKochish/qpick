'use client'
import React, { useState } from 'react'
import s from './sign-up.module.css'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import {
  Email,
  Lock,
  Person,
  Smartphone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import Link from 'next/link'
import { signIn } from '../../../../../auth'
import { register } from '../../actions/actions'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    <Box className={s.container}>
      <Box className={s.backgroundAnimation} />

      <Container component="main" maxWidth="sm">
        <Paper className={s.paper} elevation={24}>
          <Box className={`${s.textCenter} ${s.mb4}`}>
            <Box className={s.logoContainer}>
              <Smartphone className={s.logoIcon} />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              className={`${s.title} ${s.mb1}`}
            >
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join us today and get started
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                alignItems: 'center',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" action={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              margin="normal"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              margin="normal"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Create a password"
              margin="normal"
              required
              inputProps={{ minLength: 6 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                    },
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#667eea',
                      borderWidth: 2,
                    },
                  },
                },
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              className={s.mt1}
              style={{ display: 'block' }}
            >
              Minimum 6 characters
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              className={s.submitButton}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Creating Account...
                </Box>
              ) : (
                'Create Account'
              )}
            </Button>
          </Box>

          {/* Divider */}
          <Divider className={s.my3} style={{ color: 'text.secondary' }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          {/* Google Sign In */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => signIn('google')}
            className={s.googleButton}
            startIcon={
              <svg width="20" height="20" viewBox="0 0 24 24">
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
            }
          >
            Sign up with Google
          </Button>

          {/* Login Link */}
          <Box className={`${s.textCenter} ${s.mt3}`}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                href="/auth/sign-in"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignUp

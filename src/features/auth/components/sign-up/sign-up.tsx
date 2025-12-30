'use client'
import { useActionState, useEffect, useState } from 'react'
import s from './sign-up.module.css'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import Link from 'next/link'
import { register } from '../../actions/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthTitle from '../auth-title/auth-title'
import AuthLayout from '../auth-layout/auth-layout'
import GoogleIcon from '@/shared/components/google-icon/google-icon'
import { useGoogleAuth } from '../../hooks/useGoogleAuth'

const SignUp = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [{ errors, success }, formAction, isPending] = useActionState(
    register,
    {
      errors: {},
      success: false,
    }
  )
  const googleAuth = useGoogleAuth()
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = isPending || googleAuth.isPending
  const isSuccess = success || googleAuth.isSuccess
  useEffect(() => {
    if (success) {
      router.push(callbackUrl)
      router.refresh()
    }
  }, [success, router, callbackUrl])

  return (
    <AuthLayout>
      <AuthTitle
        title="TechDevices"
        subtitle="Create Account"
        description="Join us today and get started"
      />

      {errors._errors && errors._errors?.length > 0 && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            alignItems: 'center',
          }}
        >
          {errors._errors.join(', ')}
        </Alert>
      )}

      <Box component="form" action={formAction}>
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
          disabled={isLoading || isSuccess}
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

      <Divider sx={{ my: 1 }} style={{ color: 'text.secondary' }}>
        <Typography variant="body2" color="text.secondary">
          Or continue with
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={() => googleAuth.mutate()}
        disabled={isLoading || isSuccess}
        className={s.googleButton}
        startIcon={<GoogleIcon />}
      >
        Sign up with Google
      </Button>

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
    </AuthLayout>
  )
}

export default SignUp

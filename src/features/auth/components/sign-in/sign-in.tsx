'use client'

import { startTransition, useActionState, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material'
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import s from './sign-in.module.css'
import AuthTitle from '@/features/auth/components/auth-title/auth-title'
import AuthLayout from '@/features/auth/components/auth-layout/auth-layout'
import { handleGoogleSignIn, login } from '@/features/auth/actions/actions'
import GoogleIcon from '@/shared/components/google-icon/google-icon'

export default function SignIn() {
  const router = useRouter()
  const [{ errors, success }, formAction, isPending] = useActionState(login, {
    errors: {},
    success: false,
  })
  const [state, googleSignInAction, isGoogleSignInPending] = useActionState(
    handleGoogleSignIn,
    {
      errors: {},
      success: false,
    }
  )
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = isPending || isGoogleSignInPending
  if (success || state.success) {
    router.push('/')
    router.refresh()
  }

  return (
    <AuthLayout>
      <AuthTitle
        title="TechDevices"
        subtitle="Welcome Back"
        description="Sign in to your account to continue"
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

      <form action={formAction}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          margin="normal"
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email className={s.inputIcon} />
                </InputAdornment>
              ),
            },
          }}
          className={s.textField}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          margin="normal"
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={s.inputIcon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    className={s.passwordToggle}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          className={s.textField}
        />

        <Box className={s.forgotPassword}>
          <Link href="/auth/forgot-password" className={s.forgotLink}>
            Forgot your password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          className={s.submitButton}
        >
          {isLoading ? (
            <Box className={s.loadingContent}>
              <CircularProgress size={20} className={s.spinner} />
              Signing In...
            </Box>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <Divider sx={{ my: 1 }} style={{ color: 'text.secondary' }}>
        <Typography variant="body2" color="text.secondary">
          Or continue with
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={() => startTransition(googleSignInAction)}
        disabled={isLoading}
        className={s.googleButton}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>

      <Box className={s.signupLink}>
        <Typography variant="body2" className={s.signupText}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/sign-up" className={s.link}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}

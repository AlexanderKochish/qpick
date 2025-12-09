'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Container,
  CircularProgress,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Smartphone,
  Google,
} from '@mui/icons-material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import s from './page.module.css'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      setError('Failed to sign in with Google')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail('demo@techdevices.com')
    setPassword('demo123')
  }

  return (
    <Box className={s.container}>
      <Box className={s.background} />

      <Container component="main" maxWidth="sm" className={s.content}>
        <Paper elevation={24} className={s.paper}>
          <Box className={s.header}>
            <Box className={s.logo}>
              <Smartphone className={s.logoIcon} />
            </Box>
            <Typography variant="h3" component="h1" className={s.title}>
              TechDevices
            </Typography>
            <Typography variant="h6" className={s.subtitle}>
              Welcome Back
            </Typography>
            <Typography variant="body2" className={s.description}>
              Sign in to your account to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className={s.alert}>
              {error}
            </Alert>
          )}

          <Alert severity="info" className={s.demoAlert}>
            <Box className={s.demoContent}>
              <Typography variant="body2">
                Demo: demo@techdevices.com / demo123
              </Typography>
              <Button
                size="small"
                onClick={handleDemoLogin}
                className={s.demoButton}
              >
                Use Demo
              </Button>
            </Box>
          </Alert>

          <Box
            component="form"
            onSubmit={handleCredentialsSignIn}
            className={s.form}
          >
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </Box>

          <Divider className={s.divider}>
            <Typography variant="body2" className={s.dividerText}>
              Or continue with
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={s.googleButton}
            startIcon={<Google />}
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
        </Paper>
      </Container>
    </Box>
  )
}

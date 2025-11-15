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
import styles from './page.module.css'

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
    <Box className={styles.container}>
      <Box className={styles.background} />

      <Container component="main" maxWidth="sm" className={styles.content}>
        <Paper elevation={24} className={styles.paper}>
          <Box className={styles.header}>
            <Box className={styles.logo}>
              <Smartphone className={styles.logoIcon} />
            </Box>
            <Typography variant="h3" component="h1" className={styles.title}>
              TechDevices
            </Typography>
            <Typography variant="h6" className={styles.subtitle}>
              Welcome Back
            </Typography>
            <Typography variant="body2" className={styles.description}>
              Sign in to your account to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className={styles.alert}>
              {error}
            </Alert>
          )}

          <Alert severity="info" className={styles.demoAlert}>
            <Box className={styles.demoContent}>
              <Typography variant="body2">
                Demo: demo@techdevices.com / demo123
              </Typography>
              <Button
                size="small"
                onClick={handleDemoLogin}
                className={styles.demoButton}
              >
                Use Demo
              </Button>
            </Box>
          </Alert>

          <Box
            component="form"
            onSubmit={handleCredentialsSignIn}
            className={styles.form}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className={styles.inputIcon} />
                  </InputAdornment>
                ),
              }}
              className={styles.textField}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className={styles.inputIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className={styles.passwordToggle}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={styles.textField}
            />

            <Box className={styles.forgotPassword}>
              <Link href="/auth/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <Box className={styles.loadingContent}>
                  <CircularProgress size={20} className={styles.spinner} />
                  Signing In...
                </Box>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          <Divider className={styles.divider}>
            <Typography variant="body2" className={styles.dividerText}>
              Or continue with
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={styles.googleButton}
            startIcon={<Google />}
          >
            Sign in with Google
          </Button>

          <Box className={styles.signupLink}>
            <Typography variant="body2" className={styles.signupText}>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className={styles.link}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,

    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/e2e/**',
      '**/*.config.*',
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        '**/node_modules/**',
        '**/.next/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/tests/**',
        'app/**/*.layout.tsx',
        'app/**/*.loading.tsx',
        'app/**/*.error.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },

    typecheck: {
      enabled: true,
      include: ['**/*.{test,spec}.{ts,tsx}'],
    },

    mockReset: true,
    restoreMocks: true,

    ui: false,
  },
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, './*'),
      '@': path.resolve(__dirname, './src'),

      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/features': path.resolve(__dirname, './src/features'),
    },
  },
})

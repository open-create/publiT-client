// src/theme.ts  (Chakra v3)
import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      // 1) COLORS
      colors: {
        brand: {
          50: { value: '#f5f7ff' },
          100: { value: '#dce4ff' },
          200: { value: '#b3c6ff' },
          300: { value: '#809fff' },
          400: { value: '#4d79ff' },
          500: { value: '#264dff' }, // primary
          600: { value: '#1f3fcc' },
          700: { value: '#172f99' },
          800: { value: '#0f2066' },
          900: { value: '#071033' },
        },
        neutral: {
          100: { value: '#f7f7f7' },
          200: { value: '#eeeeee' },
          300: { value: '#dddddd' },
          400: { value: '#cccccc' },
          500: { value: '#999999' },
          600: { value: '#666666' },
          700: { value: '#333333' },
        },
      },

      // 2) FONTS
      fonts: {
        heading: { value: `'Pretendard', sans-serif` },
        body: { value: `'Inter', sans-serif` },
      },

      // 3) FONT SIZES
      fontSizes: {
        xs: { value: '0.75rem' }, // 12 px
        sm: { value: '0.875rem' }, // 14 px
        md: { value: '1rem' }, // 16 px
        lg: { value: '1.125rem' }, // 18 px
        xl: { value: '1.25rem' }, // 20 px
        '2xl': { value: '1.5rem' }, // 24 px
        '3xl': { value: '1.875rem' }, // 30 px
      },

      // 4) FONT WEIGHTS
      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        bold: { value: '700' },
      },
    },
  },
});

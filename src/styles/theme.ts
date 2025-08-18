import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const system = createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      body: { color: { base: 'gray.800' }, bg: { base: 'white' }, fontFamily: { base: 'body' } },
      a: { color: 'var(--colors-blue-600)', textDecoration: 'none' },
      'a:hover': { color: 'var(--colors-blue-700)' },
    },
    theme: {
      tokens: {
        /*────────────────────────  COLORS  ────────────────────────*/
        colors: {
          blue: {
            50: { value: '#C9DAED' }, // light color
            // 100: { value: '#dce4ff' },
            // 200: { value: '#b3c6ff' },
            // 300: { value: '#809fff' },
            // 400: { value: '#4d79ff' },
            500: { value: '#48A2E2' }, // logo color
            // 600: { value: '#1f3fcc' },
            // 700: { value: '#172f99' },
            // 800: { value: '#0f2066' },
            // 900: { value: '#071033' },
          },
          gray: {
            50: { value: '#D9D9D9' }, // light color
            // 100: { value: '#f7f7f7' },
            // 200: { value: '#eeeeee' },
            // 300: { value: '#dddddd' },
            // 400: { value: '#cccccc' },
            500: { value: '#A2A2A2' }, // text color
            // 600: { value: '#666666' },
            // 700: { value: '#333333' },
            // 800: { value: '#1f1f1f' },
            // 900: { value: '#111111' },
          },
        },

        /*────────────────────────  TYPOGRAPHY  ────────────────────*/
        fonts: {
          heading: { value: `'Pretendard', sans-serif` },
          body: { value: `'Inter', sans-serif` },
        },

        fontSizes: {
          xs: { value: '0.75rem' }, // 12 px
          s: { value: '1rem' }, // 16 px
          sm: { value: '1.25rem' }, // 20px
          md: { value: '1.5rem' }, // 24 px
          // lg: { value: '1.125rem' }, // 18 px
          // xl: { value: '1.25rem' }, // 20 px
          // '2xl': { value: '1.5rem' }, // 24 px
          // '3xl': { value: '1.875rem' }, // 30 px
        },

        fontWeights: {
          normal: { value: '400' },
          medium: { value: '600' },
          bold: { value: '800' },
        },
      },
      // Link 기본 variant 정의 (전역 a 스타일 대체용)
      semanticTokens: {},
      keyframes: {},
      recipes: {},
      slotRecipes: {},
      // components: {
      //   Link: {
      //     baseStyle: {
      //       color: 'blue.600',
      //       _hover: { color: 'blue.700' },
      //       textDecoration: 'none',
      //     },
      //   },
      // },
    },
  })
);

export default system;

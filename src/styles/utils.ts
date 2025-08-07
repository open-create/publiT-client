import { Theme } from './theme';

// 색상 토큰 접근 함수
export const getColor = (theme: Theme, colorPath: string) => {
  const path = colorPath.split('.');
  let value: any = theme.colors;

  for (const key of path) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color token "${colorPath}" not found`);
      return theme.colors.gray[500];
    }
  }

  return value;
};

// 간격 토큰 접근 함수
export const getSpacing = (theme: Theme, spacingToken: keyof Theme['spacing']) => {
  return theme.spacing[spacingToken];
};

// 테두리 반경 토큰 접근 함수
export const getBorderRadius = (theme: Theme, radiusToken: keyof Theme['borderRadius']) => {
  return theme.borderRadius[radiusToken];
};

// 그림자 토큰 접근 함수
export const getShadow = (theme: Theme, shadowToken: keyof Theme['shadows']) => {
  return theme.shadows[shadowToken];
};

// 트랜지션 토큰 접근 함수
export const getTransition = (theme: Theme, transitionToken: keyof Theme['transitions']) => {
  return theme.transitions[transitionToken];
};

// 브레이크포인트 토큰 접근 함수
export const getBreakpoint = (theme: Theme, breakpointToken: keyof Theme['breakpoints']) => {
  return theme.breakpoints[breakpointToken];
};

// 타이포그래피 토큰 접근 함수
export const getTypography = (theme: Theme, typographyPath: string) => {
  const path = typographyPath.split('.');
  let value: any = theme.typography;

  for (const key of path) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Typography token "${typographyPath}" not found`);
      return theme.typography.fontSize.base;
    }
  }

  return value;
};

// 이메일 주소 유효성 검증
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 비밀번호 강도 검증
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호는 최소 하나의 대문자를 포함해야 합니다.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호는 최소 하나의 소문자를 포함해야 합니다.');
  }

  if (!/\d/.test(password)) {
    errors.push('비밀번호는 최소 하나의 숫자를 포함해야 합니다.');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('비밀번호는 최소 하나의 특수문자를 포함해야 합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// 사용자명 유효성 검증
export function validateUsername(username: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push('사용자명은 최소 3자 이상이어야 합니다.');
  }

  if (username.length > 20) {
    errors.push('사용자명은 최대 20자까지 가능합니다.');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// 필수 입력 필드 검증
export function validateRequired(
  value: string,
  fieldName: string
): {
  isValid: boolean;
  error?: string;
} {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName}은(는) 필수 입력 항목입니다.`,
    };
  }

  return { isValid: true };
}

// 최소 길이 검증
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): {
  isValid: boolean;
  error?: string;
} {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName}은(는) 최소 ${minLength}자 이상이어야 합니다.`,
    };
  }

  return { isValid: true };
}

// 최대 길이 검증
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): {
  isValid: boolean;
  error?: string;
} {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName}은(는) 최대 ${maxLength}자까지 가능합니다.`,
    };
  }

  return { isValid: true };
}

// URL 형식 검증
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

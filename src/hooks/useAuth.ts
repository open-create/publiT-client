import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 토큰을 확인하고 사용자 정보를 가져오는 로직
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 사용자 정보 가져오기
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      // 실제 API 호출
      // const response = await fetch('/api/auth/me', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const userData = await response.json();

      // 임시 사용자 데이터
      const userData = {
        id: '1',
        email: 'user@example.com',
        username: '사용자',
        avatar: null,
      };

      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // 실제 로그인 API 호출
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const { token, user } = await response.json();

      // 임시 데이터
      const token = 'temp-token';
      const userData = {
        id: '1',
        email,
        username: '사용자',
        avatar: null,
      };

      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: '로그인에 실패했습니다.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      // 실제 회원가입 API 호출
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, username })
      // });
      // const { token, user } = await response.json();

      // 임시 데이터
      const token = 'temp-token';
      const userData = {
        id: '1',
        email,
        username,
        avatar: null,
      };

      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: '회원가입에 실패했습니다.' };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}

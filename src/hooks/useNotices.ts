import { useState, useEffect } from 'react';
import { Notice } from '@/graphql/schema';

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      // 실제 API 호출
      // const response = await fetch('/api/notices');
      // const data = await response.json();

      // 임시 데이터
      const data = [
        {
          id: '1',
          title: '서비스 이용 안내',
          content: '새로운 기능이 추가되었습니다.',
          status: 'published' as const,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
        },
        {
          id: '2',
          title: '개인정보 처리방침 변경',
          content: '개인정보 처리방침이 변경되었습니다.',
          status: 'published' as const,
          createdAt: '2024-01-14',
          updatedAt: '2024-01-14',
        },
      ];

      setNotices(data);
      setError(null);
    } catch (err) {
      setError('공지사항을 불러오는데 실패했습니다.');
      console.error('Failed to fetch notices:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNotice = async (notice: Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // 실제 API 호출
      // const response = await fetch('/api/notices', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(notice)
      // });
      // const newNotice = await response.json();

      // 임시 데이터
      const newNotice = {
        ...notice,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setNotices((prev) => [newNotice, ...prev]);
      return { success: true, notice: newNotice };
    } catch (err) {
      console.error('Failed to create notice:', err);
      return { success: false, error: '공지사항 생성에 실패했습니다.' };
    }
  };

  const updateNotice = async (id: string, updates: Partial<Notice>) => {
    try {
      // 실제 API 호출
      // const response = await fetch(`/api/notices/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // const updatedNotice = await response.json();

      // 임시 데이터
      const updatedNotice = {
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };

      setNotices((prev) =>
        prev.map((notice) => (notice.id === id ? { ...notice, ...updatedNotice } : notice))
      );
      return { success: true, notice: updatedNotice };
    } catch (err) {
      console.error('Failed to update notice:', err);
      return { success: false, error: '공지사항 수정에 실패했습니다.' };
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      // 실제 API 호출
      // await fetch(`/api/notices/${id}`, { method: 'DELETE' });

      setNotices((prev) => prev.filter((notice) => notice.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete notice:', err);
      return { success: false, error: '공지사항 삭제에 실패했습니다.' };
    }
  };

  return {
    notices,
    loading,
    error,
    fetchNotices,
    createNotice,
    updateNotice,
    deleteNotice,
  };
}

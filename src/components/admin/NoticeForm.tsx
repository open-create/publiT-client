import React, { useState } from 'react';

interface NoticeFormProps {
  noticeId?: string;
}

export default function NoticeForm({ noticeId }: NoticeFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
    console.log({ title, content, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="공지사항 제목을 입력하세요"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="공지사항 내용을 입력하세요"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">상태</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">임시저장</option>
          <option value="published">발행</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          취소
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {noticeId ? '수정' : '등록'}
        </button>
      </div>
    </form>
  );
}

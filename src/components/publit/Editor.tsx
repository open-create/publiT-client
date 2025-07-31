import React, { useState } from 'react';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시글 등록 로직
    console.log({ title, content });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="게시글 제목을 입력하세요"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
          <div className="border border-gray-300 rounded-lg">
            <div className="border-b border-gray-300 p-3 bg-gray-50">
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="굵게"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="기울임"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="밑줄"
                >
                  <u>U</u>
                </button>
                <div className="border-l border-gray-300 mx-2"></div>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="링크"
                >
                  🔗
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="이미지"
                >
                  🖼️
                </button>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full p-4 border-0 focus:outline-none focus:ring-0 resize-none"
              placeholder="게시글 내용을 입력하세요..."
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              임시저장
            </button>
            <button
              type="button"
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              미리보기
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            게시하기
          </button>
        </div>
      </form>
    </div>
  );
}

import React from 'react';

interface InquiryDetailPageProps {
  params: {
    id: string;
  };
}

export default function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">문의 상세</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">문의 내용</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">제목</label>
            <p className="mt-1 text-gray-900">로그인 문제 문의</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">내용</label>
            <p className="mt-1 text-gray-900">로그인이 안 되는 문제가 있습니다.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">답변</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={5}
          placeholder="답변을 입력하세요..."
        />
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          답변 등록
        </button>
      </div>
    </div>
  );
}

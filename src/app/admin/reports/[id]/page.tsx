import React from 'react';

interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">신고 상세</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">신고 내용</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">신고 유형</label>
            <p className="mt-1 text-gray-900">부적절한 게시글</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">신고 사유</label>
            <p className="mt-1 text-gray-900">욕설 및 비방 내용이 포함되어 있습니다.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">신고된 게시글</label>
            <div className="mt-1 p-3 bg-gray-50 rounded border">
              <p className="text-gray-900">신고된 게시글 내용...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">처리</h2>
        <div className="space-y-4">
          <select className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">처리 상태 선택</option>
            <option value="pending">검토 중</option>
            <option value="resolved">처리 완료</option>
            <option value="dismissed">기각</option>
          </select>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={3}
            placeholder="처리 내용을 입력하세요..."
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            처리 완료
          </button>
        </div>
      </div>
    </div>
  );
}

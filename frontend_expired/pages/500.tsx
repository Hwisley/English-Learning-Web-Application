import React from 'react';
import Link from 'next/link';

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-6">서버 오류가 발생했습니다</h2>
        <p className="text-lg text-gray-500 mb-8">
          일시적인 서버 문제로 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요.
        </p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 
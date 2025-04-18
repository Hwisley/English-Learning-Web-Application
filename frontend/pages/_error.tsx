import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          {statusCode
            ? `서버에서 오류가 발생했습니다 (${statusCode})`
            : '클라이언트에서 오류가 발생했습니다'}
        </h1>
        <p className="text-lg text-gray-600">
          문제가 지속되면 관리자에게 문의해주세요.
        </p>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 
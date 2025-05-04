const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: isDev
              ? "default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self' http://222.108.148.221:8080 http://localhost:3000 http://localhost:8080; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;"
              : "default-src 'self'; script-src 'self'; connect-src 'self' http://222.108.148.221:8080 http://localhost:3000 http://localhost:8080; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

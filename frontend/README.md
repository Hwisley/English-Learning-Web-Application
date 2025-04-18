This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## API 연동 설정

이 프로젝트는 백엔드 API와 연동되어 있습니다. 올바른 연동을 위해 다음 단계를 따르세요:

1. `.env.local` 파일에 백엔드 API URL을 설정합니다:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

2. 백엔드 서버가 실행 중인지 확인합니다.

3. API 응답 형식은 다음과 같이 정의되어 있습니다:
   - 모든 비디오 목록: `/api/videos`
   - 카테고리별 비디오 목록: `/api/videos/category/{category}`
   - 비디오 상세 정보: `/api/videos/{id}`
   - 비디오 문장 목록: `/api/videos/{id}/sentences`

자세한 API 문서는 백엔드 프로젝트의 README 파일을 참조하세요.

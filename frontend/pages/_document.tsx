import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Content Security Policy */}
          <meta
            httpEquiv="Content-Security-Policy"
            content={`
              default-src 'self';
              img-src 'self' https://* data:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              font-src 'self';
              connect-src 'self' ${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'};
            `}
          />
          {/* Prevent clickjacking */}
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          {/* Prevent MIME type sniffing */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

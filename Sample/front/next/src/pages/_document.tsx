import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class KmemoDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* IE 대응 스크립트 */}
          <script src="/openEdge.js" type="text/javascript"></script>
          {/* 폰트 */}
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Lato:wght@700&display=swap"
            rel="stylesheet"
          />
          <meta charSet="UTF-8" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="" />
          <meta property="og:title" content="김반장-일정관리" />
          <meta property="og:description" content="김반장-일정관리" />
          <meta name="description" content="케이메모, 일정관리, 4대보험, 사무대행, 건설업, 건설" />
          <meta name="keywords" content="케이메모, 일정관리, 4대보험, 사무대행, 건설업, 건설" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="naver-site-verification" content="81f8600d50a484bd1553a22a3df0b0b29effd5c0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default KmemoDocument;

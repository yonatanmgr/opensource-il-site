import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='overflow-x-hidden text-white w-screen bg-gradient-to-b from-gradientfrom to-gradientto font-["Rubik"]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

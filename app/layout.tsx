import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: '오나요? - 실시간 교통 정보',
  description: '실시간 내 주변 교통 정보를 확인하세요',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster position="top-center" richColors />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}

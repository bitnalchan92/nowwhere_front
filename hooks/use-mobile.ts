"use client"

import { useState, useEffect } from "react"

/**
 * 모바일 디바이스 감지를 담당하는 커스텀 훅
 * - 화면 크기에 따라 모바일/데스크톱을 구분
 * - 반응형 디자인을 위한 핵심 로직
 * - 화면 크기 변경 시 실시간으로 감지
 */
export function useMobile() {
  // 모바일 여부를 저장하는 상태 (기본값: false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 화면 크기를 체크하는 함수
    const checkMobile = () => {
      // 768px 미만이면 모바일로 판단 (Tailwind CSS의 md 브레이크포인트)
      setIsMobile(window.innerWidth < 768)
    }

    // 컴포넌트 마운트 시 초기 체크
    checkMobile()

    // 화면 크기 변경 시 실시간으로 체크하기 위한 이벤트 리스너 등록
    window.addEventListener("resize", checkMobile)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, []) // 빈 의존성 배열로 마운트 시에만 실행

  return isMobile // 모바일 여부 반환
}

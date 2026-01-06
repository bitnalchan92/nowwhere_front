"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  disabled?: boolean
}

/**
 * Pull to Refresh 컴포넌트
 * - 모바일에서 위에서 아래로 당기면 새로고침
 * - 시각적 피드백 제공
 */
export function PullToRefresh({ onRefresh, children, disabled = false }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canPull, setCanPull] = useState(false)

  const touchStartY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const PULL_THRESHOLD = 80 // 새로고침 트리거 거리
  const MAX_PULL_DISTANCE = 120 // 최대 당김 거리

  useEffect(() => {
    // 컴포넌트 마운트 해제 시 상태 초기화
    return () => {
      setPullDistance(0)
      setIsRefreshing(false)
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return

    const scrollTop = containerRef.current?.scrollTop || 0
    // 스크롤이 맨 위에 있을 때만 pull 가능
    if (scrollTop === 0) {
      setCanPull(true)
      touchStartY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || !canPull) return

    const scrollTop = containerRef.current?.scrollTop || 0
    const touchY = e.touches[0].clientY
    const distance = touchY - touchStartY.current

    // 아래로 당기는 동작이고 스크롤이 맨 위에 있을 때만
    if (distance > 0 && scrollTop === 0) {
      // 최대 거리 제한 및 감쇠 효과
      const dampedDistance = Math.min(
        distance * 0.5, // 감쇠 계수 (부드러운 느낌)
        MAX_PULL_DISTANCE
      )
      setPullDistance(dampedDistance)

      // 스크롤 방지
      if (distance > 10) {
        e.preventDefault()
      }
    }
  }

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing || !canPull) return

    setCanPull(false)

    // 임계값을 넘으면 새로고침 실행
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true)
      setPullDistance(PULL_THRESHOLD) // 새로고침 중 위치 고정

      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh error:", error)
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
      }
    } else {
      // 임계값 미만이면 원위치
      setPullDistance(0)
    }
  }

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const shouldTrigger = pullDistance >= PULL_THRESHOLD

  return (
    <div className="relative h-full overflow-hidden">
      {/* Pull to Refresh 인디케이터 */}
      <div
        className="absolute left-0 right-0 top-0 z-10 flex items-center justify-center transition-opacity"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        <div
          className={`flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 shadow-md transition-all ${
            shouldTrigger ? "scale-110" : "scale-100"
          }`}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-gray-700">새로고침 중...</span>
            </>
          ) : (
            <>
              <div
                className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-blue-600 transition-transform"
                style={{
                  transform: `rotate(${pullProgress * 360}deg)`,
                }}
              />
              <span className="text-sm font-medium text-gray-700">
                {shouldTrigger ? "놓아서 새로고침" : "아래로 당기기"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: canPull ? "none" : "transform 0.2s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RefreshButtonProps {
  onRefresh: () => Promise<void>
  disabled?: boolean
  className?: string
}

/**
 * 플로팅 새로고침 버튼 컴포넌트
 * - 화면 우측 하단에 고정
 * - 클릭 시 위치 및 정류장 정보 새로고침
 * - 로딩 중 애니메이션 표시
 */
export function RefreshButton({ onRefresh, disabled = false, className }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    if (isRefreshing || disabled) return

    setIsRefreshing(true)
    try {
      await onRefresh()
    } catch (error) {
      console.error("Refresh error:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button
      onClick={handleRefresh}
      disabled={disabled || isRefreshing}
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full shadow-md transition-all hover:shadow-lg",
        "bg-gray-800/70 hover:bg-gray-800/90 backdrop-blur-sm text-white",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        isRefreshing && "animate-pulse",
        className
      )}
      aria-label="새로고침"
    >
      <RefreshCw
        className={cn(
          "h-5 w-5 transition-transform",
          isRefreshing && "animate-spin"
        )}
      />
    </Button>
  )
}

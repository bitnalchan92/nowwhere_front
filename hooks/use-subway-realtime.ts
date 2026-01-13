'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SubwayTrainPosition } from '@/types/subway'
import { getSubwayRealtimePosition, getAllSubwayRealtimePosition } from '@/lib/subwayApi'

interface UseSubwayRealtimeOptions {
  selectedLines: string[]
  refreshInterval?: number  // ms, 기본값 5000
  autoRefresh?: boolean
}

interface UseSubwayRealtimeReturn {
  trainPositions: Record<string, SubwayTrainPosition[]>
  isLoading: boolean
  lastUpdated: Date | null
  error: string | null
  refresh: () => Promise<void>
}

export function useSubwayRealtime({
  selectedLines,
  refreshInterval = 5000,
  autoRefresh = true,
}: UseSubwayRealtimeOptions): UseSubwayRealtimeReturn {
  const [trainPositions, setTrainPositions] = useState<Record<string, SubwayTrainPosition[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 데이터 새로고침 함수
  const refresh = useCallback(async () => {
    if (selectedLines.length === 0) {
      setTrainPositions({})
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 모든 호선 선택 시 전체 조회 API 사용
      const allLines = ['1호선', '2호선', '3호선', '4호선', '5호선', '6호선', '7호선', '8호선', '9호선']
      const isAllSelected = selectedLines.length === allLines.length

      if (isAllSelected) {
        const data = await getAllSubwayRealtimePosition()
        setTrainPositions(data)
      } else {
        // 선택된 호선만 개별 조회
        const results: Record<string, SubwayTrainPosition[]> = {}

        await Promise.all(
          selectedLines.map(async line => {
            const positions = await getSubwayRealtimePosition(line)
            results[line] = positions
          })
        )

        setTrainPositions(results)
      }

      setLastUpdated(new Date())
    } catch (err) {
      console.error('실시간 열차 위치 조회 실패:', err)
      setError('열차 위치 정보를 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedLines])

  // 자동 새로고침 설정
  useEffect(() => {
    // 초기 로드
    refresh()

    // 자동 새로고침
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(refresh, refreshInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [refresh, autoRefresh, refreshInterval])

  // 선택된 호선이 변경되면 즉시 새로고침
  useEffect(() => {
    refresh()
  }, [selectedLines.join(',')])

  return {
    trainPositions,
    isLoading,
    lastUpdated,
    error,
    refresh,
  }
}

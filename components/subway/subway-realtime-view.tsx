'use client'

import { useState } from 'react'
import { RefreshCw, Clock, AlertCircle } from 'lucide-react'
import { SubwayLineSelector } from './subway-line-selector'
import { SubwayLineMap } from './subway-line-map'
import { useSubwayRealtime } from '@/hooks/use-subway-realtime'
import { SUBWAY_LINE_COLORS } from '@/types/subway'

const ALL_LINES = ['1호선', '2호선', '3호선', '4호선', '5호선', '6호선', '7호선', '8호선', '9호선']

export function SubwayRealtimeView() {
  const [selectedLines, setSelectedLines] = useState<string[]>([...ALL_LINES])

  const { trainPositions, isLoading, lastUpdated, error, refresh } = useSubwayRealtime({
    selectedLines,
    refreshInterval: 5000,
    autoRefresh: true,
  })

  // 총 열차 수 계산
  const totalTrains = Object.values(trainPositions).reduce(
    (sum, trains) => sum + trains.length,
    0
  )

  // 선택된 호선의 열차 수
  const selectedTrainCount = selectedLines.reduce((sum, line) => {
    return sum + (trainPositions[line]?.length || 0)
  }, 0)

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* 상단: 헤더 + 호선 선택 */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b shadow-sm">
        {/* 타이틀 */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                실시간 열차 운행 정보
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                서울시 지하철 1~9호선 실시간 위치 정보
              </p>
            </div>

            {/* 상태 정보 */}
            <div className="flex items-center gap-4 text-sm">
              {lastUpdated && (
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">
                    {lastUpdated.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    {selectedTrainCount}대 운행 중
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 호선 선택 */}
        <div className="px-4 py-2">
          <SubwayLineSelector
            selectedLines={selectedLines}
            onSelectionChange={setSelectedLines}
            mode="single"
          />
        </div>
      </div>

      {/* 중앙: 노선도 */}
      <div className="flex-1 min-h-0 relative">
        <SubwayLineMap
          selectedLines={selectedLines}
          trainPositions={trainPositions}
        />

        {/* 로딩 오버레이 */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">데이터 로딩 중...</span>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg shadow-lg border border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* 우측 하단: 리프레시 버튼 */}
        <button
          onClick={refresh}
          disabled={isLoading}
          className="absolute bottom-20 right-4 z-10 w-14 h-14 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="새로고침"
        >
          <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* 하단: 안내 메시지 */}
      <div className="flex-shrink-0 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t text-xs text-gray-500 dark:text-gray-400 text-center">
        실시간 데이터는 서울교통공사에서 제공하며, 실제 운행 상황과 다를 수 있습니다. (5초마다 자동 갱신)
      </div>
    </div>
  )
}

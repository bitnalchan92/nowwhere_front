'use client'

import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react'
import { subwayLines } from '@/data/subway-lines'
import { SubwayTrainPosition, SUBWAY_LINE_COLORS } from '@/types/subway'
import { TrainMarker } from './train-marker'

interface SubwayLineMapProps {
  selectedLines: string[]
  trainPositions: Record<string, SubwayTrainPosition[]>
}

// SVG 뷰박스 크기
const VIEW_BOX = { width: 1500, height: 1000 }
const MIN_SCALE = 0.5
const MAX_SCALE = 3

export function SubwayLineMap({ selectedLines, trainPositions }: SubwayLineMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 전체 선택 여부
  const isAllSelected = selectedLines.length === 9

  // 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // 좌클릭만
    setIsDragging(true)
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
  }, [transform])

  // 터치 드래그 시작
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX - transform.x, y: touch.clientY - transform.y })
  }, [transform])

  // 드래그 중
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }))
  }, [isDragging, dragStart])

  // 터치 드래그 중
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]
    setTransform(prev => ({
      ...prev,
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    }))
  }, [isDragging, dragStart])

  // 드래그 종료
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 줌
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale * delta, MIN_SCALE), MAX_SCALE),
    }))
  }, [])

  // 줌 컨트롤
  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, MAX_SCALE) }))
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale * 0.8, MIN_SCALE) }))
  const resetZoom = () => setTransform({ x: 0, y: 0, scale: 1 })

  // 역명으로 열차 위치 찾기
  const getTrainPosition = useCallback((lineName: string, stationName: string) => {
    const trains = trainPositions[lineName] || []
    return trains.filter(t => t.statnNm === stationName)
  }, [trainPositions])

  // 호선별 열차 수 계산
  const trainCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.entries(trainPositions).forEach(([line, trains]) => {
      counts[line] = trains.length
    })
    return counts
  }, [trainPositions])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* 줌 컨트롤 */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
        <button
          onClick={zoomIn}
          className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="확대"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="축소"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="w-8 h-px bg-gray-200 dark:bg-gray-600 mx-auto" />
        <button
          onClick={resetZoom}
          className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="초기화"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* 드래그 안내 */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-gray-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-lg">
        <Move className="w-4 h-4" />
        <span>드래그하여 이동</span>
      </div>

      {/* SVG 노선도 */}
      <svg
        viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        className="w-full h-full"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onWheel={handleWheel}
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* 모든 노선 렌더링 */}
          {subwayLines.map(line => {
            const isSelected = selectedLines.includes(line.name)
            const opacity = isAllSelected ? 1 : (isSelected ? 1 : 0.15)
            const strokeWidth = isSelected && !isAllSelected ? 6 : 4

            return (
              <g
                key={line.id}
                style={{
                  opacity,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                {/* 노선 라인 */}
                <polyline
                  points={line.stations.map(s => `${s.x},${s.y}`).join(' ')}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 역 마커 */}
                {line.stations.map((station, idx) => {
                  const isTransfer = station.transferLines && station.transferLines.length > 0
                  const trainsAtStation = isSelected ? getTrainPosition(line.name, station.name) : []

                  return (
                    <g key={`${line.id}-${station.id}`}>
                      {/* 역 원형 마커 */}
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r={isTransfer ? 7 : 5}
                        fill="white"
                        stroke={line.color}
                        strokeWidth={isTransfer ? 3 : 2}
                      />

                      {/* 역명 (선택된 호선일 때 모든 역명 표시) */}
                      {isSelected && (
                        <text
                          x={station.x}
                          y={station.y + 16}
                          textAnchor="middle"
                          fill="currentColor"
                          fontSize={isTransfer ? '9' : '8'}
                          fontWeight={isTransfer ? '600' : '400'}
                          className="select-none pointer-events-none dark:fill-gray-300"
                        >
                          {station.name}
                        </text>
                      )}

                      {/* 열차 마커 (선택된 호선일 때만 표시) */}
                      {trainsAtStation.map((train, trainIdx) => (
                        <TrainMarker
                          key={train.trainNo}
                          train={train}
                          x={station.x}
                          y={station.y}
                          lineColor={line.color}
                          offset={trainIdx * 20}
                        />
                      ))}
                    </g>
                  )
                })}
              </g>
            )
          })}
        </g>
      </svg>

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">범례</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <svg width="24" height="16" viewBox="0 0 24 16">
              <polygon points="12,2 8,8 16,8" fill="#3B82F6" />
              <rect x="6" y="6" width="12" height="8" rx="2" fill="#3B82F6" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400">상행</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="24" height="16" viewBox="0 0 24 16">
              <rect x="6" y="2" width="12" height="8" rx="2" fill="#3B82F6" />
              <polygon points="12,14 8,8 16,8" fill="#3B82F6" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400">하행</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-red-500 bg-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">급행</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400">막차</span>
          </div>
        </div>
      </div>

      {/* 선택된 호선 열차 현황 */}
      {!isAllSelected && selectedLines.length > 0 && (
        <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">운행 현황</div>
          {selectedLines.map(lineName => {
            const count = trainCounts[lineName] || 0
            const color = SUBWAY_LINE_COLORS[lineName]
            return (
              <div key={lineName} className="flex items-center justify-between gap-4 py-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{lineName}</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{count}대</span>
              </div>
            )
          })}
        </div>
      )}

      {/* 선택된 호선 없음 안내 */}
      {selectedLines.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
          <p className="text-gray-500 text-lg">호선을 선택해주세요</p>
        </div>
      )}
    </div>
  )
}

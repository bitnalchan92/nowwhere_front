'use client'

import { useState } from 'react'
import { SubwayTrainPosition, TRAIN_STATUS_LABELS } from '@/types/subway'

interface TrainMarkerProps {
  train: SubwayTrainPosition
  x: number
  y: number
  lineColor: string
  offset?: number
}

export function TrainMarker({ train, x, y, lineColor, offset = 0 }: TrainMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const isUpLine = train.updnLine === '0' // 상행
  const isExpress = train.directAt === '1' // 급행
  const isLastTrain = train.lstcarAt === '1' // 막차
  const status = TRAIN_STATUS_LABELS[train.trainSttus] || '운행'

  // 상행/하행에 따른 위치 오프셋
  const posX = x + (isUpLine ? -25 : 25) + offset
  const posY = y

  // 열차 색상 결정
  const trainColor = isExpress ? '#DC2626' : lineColor // 급행은 빨간색
  const bgColor = isLastTrain ? '#7C3AED' : trainColor // 막차는 보라색

  return (
    <g
      transform={`translate(${posX}, ${posY})`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="cursor-pointer"
    >
      {/* 그림자 */}
      <ellipse cx="0" cy="3" rx="16" ry="4" fill="rgba(0,0,0,0.15)" />

      {/* 열차 본체 */}
      <g className={isLastTrain ? 'animate-pulse' : ''}>
        {/* 방향에 따른 열차 모양 (상행: 위로, 하행: 아래로) */}
        {isUpLine ? (
          // 상행 열차 (위쪽 방향)
          <g>
            {/* 열차 헤드 (위쪽 둥근 부분) */}
            <path
              d={`M -10 0
                  Q -10 -12, 0 -16
                  Q 10 -12, 10 0
                  L 10 8
                  Q 10 12, 6 12
                  L -6 12
                  Q -10 12, -10 8
                  Z`}
              fill={bgColor}
              stroke="white"
              strokeWidth="1.5"
            />
            {/* 전면 창문 */}
            <path
              d="M -6 -10 Q 0 -14, 6 -10 L 6 -4 L -6 -4 Z"
              fill="rgba(255,255,255,0.9)"
              stroke={bgColor}
              strokeWidth="0.5"
            />
            {/* 측면 창문 */}
            <rect x="-7" y="0" width="5" height="4" rx="1" fill="rgba(255,255,255,0.7)" />
            <rect x="2" y="0" width="5" height="4" rx="1" fill="rgba(255,255,255,0.7)" />
            {/* 방향 화살표 */}
            <polygon points="0,-20 -5,-14 5,-14" fill={bgColor} />
            <polygon points="0,-20 -4,-15 4,-15" fill="white" />
          </g>
        ) : (
          // 하행 열차 (아래쪽 방향)
          <g>
            {/* 열차 헤드 (아래쪽 둥근 부분) */}
            <path
              d={`M -10 0
                  Q -10 12, 0 16
                  Q 10 12, 10 0
                  L 10 -8
                  Q 10 -12, 6 -12
                  L -6 -12
                  Q -10 -12, -10 -8
                  Z`}
              fill={bgColor}
              stroke="white"
              strokeWidth="1.5"
            />
            {/* 전면 창문 */}
            <path
              d="M -6 10 Q 0 14, 6 10 L 6 4 L -6 4 Z"
              fill="rgba(255,255,255,0.9)"
              stroke={bgColor}
              strokeWidth="0.5"
            />
            {/* 측면 창문 */}
            <rect x="-7" y="-4" width="5" height="4" rx="1" fill="rgba(255,255,255,0.7)" />
            <rect x="2" y="-4" width="5" height="4" rx="1" fill="rgba(255,255,255,0.7)" />
            {/* 방향 화살표 */}
            <polygon points="0,20 -5,14 5,14" fill={bgColor} />
            <polygon points="0,20 -4,15 4,15" fill="white" />
          </g>
        )}

        {/* 급행 표시 - 빨간 테두리 + 번개 아이콘 */}
        {isExpress && (
          <g>
            <circle cx="12" cy={isUpLine ? -8 : 8} r="7" fill="#FEF3C7" stroke="#DC2626" strokeWidth="2" />
            <text
              x="12"
              y={isUpLine ? -5 : 11}
              textAnchor="middle"
              fill="#DC2626"
              fontSize="8"
              fontWeight="bold"
            >
              급
            </text>
          </g>
        )}

        {/* 막차 표시 - 보라색 배지 */}
        {isLastTrain && (
          <g>
            <rect x="-12" y={isUpLine ? 14 : -22} width="24" height="12" rx="3" fill="#7C3AED" stroke="white" strokeWidth="1" />
            <text
              x="0"
              y={isUpLine ? 22 : -13}
              textAnchor="middle"
              fill="white"
              fontSize="7"
              fontWeight="bold"
            >
              막차
            </text>
          </g>
        )}
      </g>

      {/* 상행/하행 라벨 */}
      <g transform={`translate(0, ${isUpLine ? -28 : 28})`}>
        <rect
          x="-14"
          y="-6"
          width="28"
          height="12"
          rx="2"
          fill={isUpLine ? '#3B82F6' : '#EF4444'}
          opacity="0.9"
        />
        <text
          x="0"
          y="2"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
        >
          {isUpLine ? '▲ 상행' : '▼ 하행'}
        </text>
      </g>

      {/* 툴팁 */}
      {showTooltip && (
        <g transform={`translate(${isUpLine ? -70 : 70}, 0)`}>
          <rect
            x="-55"
            y="-40"
            width="110"
            height="80"
            rx="8"
            fill="rgba(0,0,0,0.9)"
            stroke="white"
            strokeWidth="1"
          />
          {/* 화살표 */}
          <polygon
            points={isUpLine ? "55,-5 55,5 65,0" : "-55,-5 -55,5 -65,0"}
            fill="rgba(0,0,0,0.9)"
          />

          {/* 열차 번호 */}
          <text x="0" y="-25" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            {train.trainNo}
          </text>

          {/* 태그들 */}
          <g transform="translate(0, -10)">
            {isExpress && (
              <g transform="translate(-20, 0)">
                <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#DC2626" />
                <text x="0" y="2" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">급행</text>
              </g>
            )}
            {isLastTrain && (
              <g transform={`translate(${isExpress ? 20 : 0}, 0)`}>
                <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#7C3AED" />
                <text x="0" y="2" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">막차</text>
              </g>
            )}
          </g>

          {/* 현재 역 */}
          <text x="0" y="8" textAnchor="middle" fill="#9CA3AF" fontSize="8">
            현재: {train.statnNm} ({status})
          </text>

          {/* 방향 및 종착역 */}
          <text x="0" y="22" textAnchor="middle" fill="#60A5FA" fontSize="9">
            {isUpLine ? '▲ 상행' : '▼ 하행'} → {train.statnTnm}
          </text>
        </g>
      )}
    </g>
  )
}

// 열차 마커 툴팁용 정보
export function getTrainTooltip(train: SubwayTrainPosition): string {
  const direction = train.updnLine === '0' ? '상행' : '하행'
  const status = TRAIN_STATUS_LABELS[train.trainSttus] || '운행'
  const express = train.directAt === '1' ? ' [급행]' : ''
  const lastTrain = train.lstcarAt === '1' ? ' [막차]' : ''

  return `${train.trainNo}${express}${lastTrain}\n${train.statnNm} ${status}\n${direction} → ${train.statnTnm}`
}

'use client'

import { SUBWAY_LINE_COLORS } from '@/types/subway'
import { cn } from '@/lib/utils'

interface SubwayLineSelectorProps {
  selectedLines: string[]
  onSelectionChange: (lines: string[]) => void
  mode?: 'single' | 'multi'  // single: 하나만 선택, multi: 복수 선택
}

const LINES = ['1호선', '2호선', '3호선', '4호선', '5호선', '6호선', '7호선', '8호선', '9호선']

export function SubwayLineSelector({
  selectedLines,
  onSelectionChange,
  mode = 'single'
}: SubwayLineSelectorProps) {
  const isAllSelected = selectedLines.length === LINES.length

  const handleToggleLine = (line: string) => {
    if (mode === 'single') {
      // 단일 선택 모드: 클릭한 호선만 선택
      if (selectedLines.includes(line) && selectedLines.length === 1) {
        // 이미 선택된 유일한 호선이면 전체 선택으로 전환
        onSelectionChange([...LINES])
      } else {
        onSelectionChange([line])
      }
    } else {
      // 복수 선택 모드
      if (selectedLines.includes(line)) {
        if (selectedLines.length > 1) {
          onSelectionChange(selectedLines.filter(l => l !== line))
        }
      } else {
        onSelectionChange([...selectedLines, line])
      }
    }
  }

  const handleToggleAll = () => {
    if (isAllSelected) {
      onSelectionChange([LINES[0]])
    } else {
      onSelectionChange([...LINES])
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
      {/* 전체 선택 버튼 */}
      <button
        onClick={handleToggleAll}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg transition-all border-2',
          isAllSelected
            ? 'bg-gray-800 text-white border-gray-800 dark:bg-white dark:text-gray-800 dark:border-white'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
        )}
      >
        전체
      </button>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

      {/* 개별 호선 버튼 */}
      <div className="flex gap-1.5 flex-wrap">
        {LINES.map(line => {
          const isSelected = selectedLines.includes(line)
          const lineColor = SUBWAY_LINE_COLORS[line]
          const lineNumber = line.replace('호선', '')

          return (
            <button
              key={line}
              onClick={() => handleToggleLine(line)}
              className={cn(
                'w-10 h-10 text-sm font-bold rounded-full transition-all flex items-center justify-center border-2',
                isSelected
                  ? 'text-white shadow-lg scale-110'
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:scale-105 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600 dark:hover:border-gray-500'
              )}
              style={isSelected ? {
                backgroundColor: lineColor,
                borderColor: lineColor,
                boxShadow: `0 4px 14px ${lineColor}50`
              } : undefined}
              title={line}
            >
              {lineNumber}
            </button>
          )
        })}
      </div>
    </div>
  )
}

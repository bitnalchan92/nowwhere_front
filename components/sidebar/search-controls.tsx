"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bus, Train } from "lucide-react"
import { useLocation } from "@/hooks/use-location"

interface SearchControlsProps {
  onBusSearch: () => void
  onSubwaySearch: () => void
  isMobile?: boolean
}

export function SearchControls({ onBusSearch, onSubwaySearch, isMobile = false }: SearchControlsProps) {
  const { location, isLocationReady, isLoading } = useLocation()

  return (
    <div className="space-y-3 p-4 border-b border-gray-200">
      {/* 현재 위치 표시 */}
      <div className="flex items-start gap-2">
        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className={`${isMobile ? "text-sm" : "text-xs"} text-gray-600 leading-relaxed`}>
            {isLoading ? "위치 정보를 가져오는 중..." : location.address || "위치 정보 없음"}
          </p>
        </div>
      </div>

      {/* 검색 버튼들 */}
      <div className="flex gap-2">
        <Button
          onClick={onBusSearch}
          disabled={!isLocationReady || isLoading}
          variant={isLocationReady ? "default" : "secondary"}
          size={isMobile ? "default" : "sm"}
          className="flex-1 gap-2"
        >
          <Bus className="w-4 h-4" />
          근처 버스정류장
        </Button>

        <Button
          onClick={onSubwaySearch}
          disabled={!isLocationReady || isLoading}
          variant={isLocationReady ? "default" : "secondary"}
          size={isMobile ? "default" : "sm"}
          className="flex-1 gap-2"
        >
          <Train className="w-4 h-4" />
          근처 지하철역
        </Button>
      </div>

      {!isLocationReady && !isLoading && (
        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
          위치 정보가 필요합니다. 브라우저에서 위치 접근을 허용해주세요.
        </p>
      )}
    </div>
  )
}

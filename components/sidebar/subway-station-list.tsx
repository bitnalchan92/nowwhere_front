"use client"

import { Badge } from "@/components/ui/badge"
import type { SubwayStation } from "@/types/transit"
import { formatDistance } from "@/utils/format"

interface SubwayStationListProps {
  stations: SubwayStation[]
  selectedStation: SubwayStation | null
  onSelect: (station: SubwayStation) => void
  isMobile?: boolean
}

export function SubwayStationList({ stations, selectedStation, onSelect, isMobile = false }: SubwayStationListProps) {
  if (stations.length === 0) {
    return <div className="p-4 text-center text-gray-500 text-sm">검색 버튼을 눌러 근처 지하철역을 찾아보세요</div>
  }

  return (
    <div className={isMobile ? "divide-y divide-gray-100" : "space-y-1"}>
      {stations.map((station) => (
        <div
          key={station.id}
          className={
            isMobile
              ? "p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
              : `p-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                  selectedStation?.id === station.id ? "border-green-500 bg-green-50" : "border-transparent"
                }`
          }
          onClick={() => onSelect(station)}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>{station.name}</h3>
            <span className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500`}>
              {formatDistance(station.distance)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${station.lineColor} text-white ${isMobile ? "" : "text-xs"}`}>{station.line}</Badge>
            <span className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500`}>
              {station.arrivals.length}개 방면
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

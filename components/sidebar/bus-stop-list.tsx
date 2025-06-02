"use client"

import { Badge } from "@/components/ui/badge"
import type { BusStop } from "@/types/transit"
import { formatDistance } from "@/utils/format"

interface BusStopListProps {
  busStops: BusStop[]
  selectedBusStop: BusStop | null
  onSelect: (stop: BusStop) => void
  isMobile?: boolean
}

export function BusStopList({ busStops, selectedBusStop, onSelect, isMobile = false }: BusStopListProps) {
  if (busStops.length === 0) {
    return <div className="p-4 text-center text-gray-500 text-sm">검색 버튼을 눌러 근처 버스정류장을 찾아보세요</div>
  }

  return (
    <div className={isMobile ? "divide-y divide-gray-100" : "space-y-1"}>
      {busStops.map((stop) => (
        <div
          key={stop.id}
          className={
            isMobile
              ? "p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
              : `p-3 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                  selectedBusStop?.id === stop.id ? "border-blue-500 bg-blue-50" : "border-transparent"
                }`
          }
          onClick={() => onSelect(stop)}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-medium ${isMobile ? "text-base" : "text-sm"}`}>{stop.name}</h3>
            <span className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500`}>{formatDistance(stop.distance)}</span>
          </div>
          <p className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500 mb-2`}>정류장 번호: {stop.number}</p>
          <div className="flex flex-wrap gap-1">
            {stop.routes.slice(0, isMobile ? 4 : 3).map((route) => (
              <Badge key={route.id} variant="outline" className={isMobile ? "text-sm" : "text-xs"}>
                {route.routeNumber}
              </Badge>
            ))}
            {stop.routes.length > (isMobile ? 4 : 3) && (
              <Badge variant="outline" className={isMobile ? "text-sm" : "text-xs"}>
                +{stop.routes.length - (isMobile ? 4 : 3)}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

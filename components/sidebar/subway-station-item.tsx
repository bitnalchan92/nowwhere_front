"use client"

import { Badge } from "@/components/ui/badge"
import type { SubwayStation } from "@/types/transit"
import { getListItemClass, getTextSizeClass } from "@/utils/list-styles"
import { ListItemHeader } from "@/components/common/list-item-header"

interface SubwayStationItemProps {
  station: SubwayStation
  isSelected: boolean
  isMobile: boolean
  onSelect: (station: SubwayStation) => void
}

export function SubwayStationItem({ station, isSelected, isMobile, onSelect }: SubwayStationItemProps) {
  return (
    <div className={getListItemClass(isMobile, isSelected, "green")} onClick={() => onSelect(station)}>
      <ListItemHeader name={station.name} distance={station.distance} isMobile={isMobile} />

      <div className="flex items-center gap-2">
        <Badge className={`${station.lineColor} text-white ${getTextSizeClass(isMobile, "xs")}`}>{station.line}</Badge>
        <span className={`${getTextSizeClass(isMobile, "sm")} text-gray-500`}>{station.arrivals.length}개 방면</span>
      </div>
    </div>
  )
}

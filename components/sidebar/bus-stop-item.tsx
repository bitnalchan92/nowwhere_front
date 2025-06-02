"use client"

import type { BusStop } from "@/types/transit"
import { getListItemClass, getTextSizeClass } from "@/utils/list-styles"
import { ListItemHeader } from "@/components/common/list-item-header"
import { RouteBadges } from "@/components/common/route-badges"

interface BusStopItemProps {
  stop: BusStop
  isSelected: boolean
  isMobile: boolean
  onSelect: (stop: BusStop) => void
}

export function BusStopItem({ stop, isSelected, isMobile, onSelect }: BusStopItemProps) {
  return (
    <div className={getListItemClass(isMobile, isSelected, "blue")} onClick={() => onSelect(stop)}>
      <ListItemHeader name={stop.name} distance={stop.distance} isMobile={isMobile} />

      <p className={`${getTextSizeClass(isMobile, "sm")} text-gray-500 mb-2`}>정류장 번호: {stop.number}</p>

      <RouteBadges routes={stop.routes} isMobile={isMobile} maxVisible={3} />
    </div>
  )
}

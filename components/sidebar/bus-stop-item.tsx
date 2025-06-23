"use client"

import type { NearBusStop } from "@/types/transit"
import { getListItemClass, getTextSizeClass } from "@/utils/list-styles"
import { ListItemHeader } from "@/components/common/list-item-header"
import { RouteBadges } from "@/components/common/route-badges"

interface BusStopItemProps {
  nearBusStop: NearBusStop
  isSelected: boolean
  isMobile: boolean
  onSelect: (stop: NearBusStop) => void
}

export function BusStopItem({ nearBusStop, isSelected, isMobile, onSelect }: BusStopItemProps) {
  return (
    <div className={getListItemClass(isMobile, isSelected, "blue")} onClick={() => onSelect(nearBusStop)}>
      <ListItemHeader name={nearBusStop.stationNm} distance={nearBusStop.dist} isMobile={isMobile} />

      <p className={`${getTextSizeClass(isMobile, "sm")} text-gray-500 mb-2`}>정류장 번호: {nearBusStop.arsId}</p>

      {/* TODO */}
      {/*<RouteBadges routes={stop.routes} isMobile={isMobile} maxVisible={3} />*/}
    </div>
  )
}

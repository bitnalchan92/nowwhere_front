"use client"

import type { NearBusStop } from "@/types/transit"
import { ListItemHeader } from "@/components/common/list-item-header"

interface BusStopItemProps {
  nearBusStop: NearBusStop
  isSelected: boolean
  isMobile: boolean
  onSelect: (stop: NearBusStop) => void
}

export function BusStopItem({ nearBusStop, isSelected, isMobile, onSelect }: BusStopItemProps) {
  const baseClasses = "cursor-pointer transition-all duration-200 ease-in-out"

  const mobileClasses = isMobile ? "p-4 border-b border-gray-100 hover:bg-blue-50 active:bg-blue-100" : ""

  const desktopClasses = !isMobile
    ? `p-3 rounded-lg border-l-4 hover:bg-gray-50 hover:shadow-sm ${
      isSelected ? "border-blue-500 bg-blue-50 shadow-sm" : "border-transparent hover:border-blue-200"
    }`
    : ""

  const selectedMobileClasses = isMobile && isSelected ? "bg-blue-50 border-blue-500" : ""

  return (
    <div
      className={`${baseClasses} ${mobileClasses} ${desktopClasses} ${selectedMobileClasses}`}
      onClick={() => onSelect(nearBusStop)}
    >
      <ListItemHeader name={nearBusStop.stationNm} distance={nearBusStop.dist} isMobile={isMobile} />

      <p className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500 font-medium`}>
        정류장 번호: {nearBusStop.arsId}
      </p>

      {/* TODO: 노선 정보 추가 예정 */}
      {/*<RouteBadges routes={stop.routes} isMobile={isMobile} maxVisible={3} />*/}
    </div>
  )
}

"use client"

import type { NearBusStop } from "@/types/transit"
import { ListItemHeader } from "@/components/common/list-item-header"

interface BusStopItemProps {
  nearBusStop: NearBusStop
  isSelected: boolean
  isMobile: boolean
  index: number
  onSelect: (stop: NearBusStop) => void
}

export function BusStopItem({ nearBusStop, isSelected, isMobile, index, onSelect }: BusStopItemProps) {

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
      className={`${baseClasses} ${mobileClasses} ${desktopClasses} ${selectedMobileClasses} flex gap-3 items-start`}
      onClick={() => onSelect(nearBusStop)}
    >
      {/* 번호 배지 */}
      <div className="flex-shrink-0">
        <div className={`${isMobile ? "w-6 h-6" : "w-6 h-6"} rounded-full bg-red-500 text-white flex items-center justify-center font-bold ${isMobile ? "text-sm" : "text-xs"} shadow-md`}>
          {index + 1}
        </div>
      </div>

      {/* 정류장 정보 */}
      <div className="flex-1 min-w-0">
        <ListItemHeader name={nearBusStop.stationNm} distance={nearBusStop.dist} isMobile={isMobile} />

        <p className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500 font-medium mb-1`}>
          정류장 번호: {nearBusStop.arsId}
        </p>

        {/* 노선 정보 */}
        {nearBusStop.routes && nearBusStop.routes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {nearBusStop.routes.slice(0, isMobile ? 5 : 8).map((route, idx) => (
              <span
                key={idx}
                className={`${isMobile ? "text-xs" : "text-[10px]"} px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium`}
              >
                {route.busRouteNm}
              </span>
            ))}
            {nearBusStop.routes.length > (isMobile ? 5 : 8) && (
              <span className={`${isMobile ? "text-xs" : "text-[10px]"} px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium`}>
                +{nearBusStop.routes.length - (isMobile ? 5 : 8)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

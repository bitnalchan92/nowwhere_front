"use client"

import type {NearBusStop} from "@/types/transit"
import {getListContainerClass} from "@/utils/list-styles"
import {EmptyList} from "@/components/common/empty-list"
import {BusStopItem} from "@/components/sidebar/bus-stop-item"

interface BusStopListProps {
  nearBusStops: NearBusStop[]
  selectedNearBusStop: NearBusStop | null
  onSelect: (stop: NearBusStop) => void
  isMobile?: boolean
}

export function BusStopList({nearBusStops, selectedNearBusStop, onSelect, isMobile = false}: BusStopListProps) {
  if (nearBusStops.length === 0) {
    return <EmptyList type="bus"/>
  }

  return (
    <div className={getListContainerClass(isMobile)}>
      {nearBusStops.map((nearBusStop: NearBusStop) => (
        <BusStopItem
          key={nearBusStop.stationId}
          nearBusStop={nearBusStop}
          isSelected={selectedNearBusStop?.stationId === nearBusStop.stationId}
          isMobile={isMobile}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

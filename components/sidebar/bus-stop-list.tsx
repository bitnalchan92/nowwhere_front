"use client"

import type { NearBusStop } from "@/types/transit"
import { EmptyList } from "@/components/common/empty-list"
import { BusStopItem } from "@/components/sidebar/bus-stop-item"

interface BusStopListProps {
  nearBusStops: NearBusStop[] | undefined | null
  selectedNearBusStop: NearBusStop | null
  onSelect: (stop: NearBusStop) => void
  isMobile?: boolean
}

export function BusStopList({ nearBusStops, selectedNearBusStop, onSelect, isMobile = false }: BusStopListProps) {
  // Ensure we always have an array to work with
  const stops = Array.isArray(nearBusStops) ? nearBusStops : []

  if (stops.length === 0) {
    return <EmptyList type="bus" />
  }

  return (
    <div className={isMobile ? "divide-y divide-gray-100" : "space-y-2 p-2"}>
      {stops.map((nearBusStop) => (
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

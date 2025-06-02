"use client"

import type { BusStop } from "@/types/transit"
import { getListContainerClass } from "@/utils/list-styles"
import { EmptyList } from "@/components/common/empty-list"
import { BusStopItem } from "@/components/sidebar/bus-stop-item"

interface BusStopListProps {
  busStops: BusStop[]
  selectedBusStop: BusStop | null
  onSelect: (stop: BusStop) => void
  isMobile?: boolean
}

export function BusStopList({ busStops, selectedBusStop, onSelect, isMobile = false }: BusStopListProps) {
  if (busStops.length === 0) {
    return <EmptyList type="bus" />
  }

  return (
    <div className={getListContainerClass(isMobile)}>
      {busStops.map((stop) => (
        <BusStopItem
          key={stop.id}
          stop={stop}
          isSelected={selectedBusStop?.id === stop.id}
          isMobile={isMobile}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

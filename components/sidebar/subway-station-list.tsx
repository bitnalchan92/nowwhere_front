"use client"

import type { SubwayStation } from "@/types/transit"
import { getListContainerClass } from "@/utils/list-styles"
import { EmptyList } from "@/components/common/empty-list"
import { SubwayStationItem } from "@/components/sidebar/subway-station-item"

interface SubwayStationListProps {
  stations: SubwayStation[]
  selectedStation: SubwayStation | null
  onSelect: (station: SubwayStation) => void
  isMobile?: boolean
}

export function SubwayStationList({ stations, selectedStation, onSelect, isMobile = false }: SubwayStationListProps) {
  if (stations.length === 0) {
    return <EmptyList type="subway" />
  }

  return (
    <div className={getListContainerClass(isMobile)}>
      {stations.map((station) => (
        <SubwayStationItem
          key={station.id}
          station={station}
          isSelected={selectedStation?.id === station.id}
          isMobile={isMobile}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

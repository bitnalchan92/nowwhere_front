import type { NearBusStop, SubwayStation, TransitTab } from "@/types/transit"
import { BusStopDetail } from "@/components/detail/bus-stop-detail"
import { SubwayStationDetail } from "@/components/detail/subway-station-detail"
import { EmptyDetail } from "@/components/detail/empty-detail"

interface DetailContentProps {
  activeTab: TransitTab
  selectedNearBusStop: NearBusStop | null
  selectedSubwayStation: SubwayStation | null
}

export function DetailContent({ activeTab, selectedNearBusStop, selectedSubwayStation }: DetailContentProps) {
  if (activeTab === "bus" && selectedNearBusStop) {
    return <BusStopDetail busStop={selectedNearBusStop} />
  }

  if (activeTab === "subway" && selectedSubwayStation) {
    return <SubwayStationDetail station={selectedSubwayStation} />
  }

  return <EmptyDetail activeTab={activeTab} />
}

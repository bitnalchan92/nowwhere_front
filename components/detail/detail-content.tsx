import type { BusStop, SubwayStation, TransitTab } from "@/types/transit"
import { BusStopDetail } from "@/components/detail/bus-stop-detail"
import { SubwayStationDetail } from "@/components/detail/subway-station-detail"
import { EmptyDetail } from "@/components/detail/empty-detail"

interface DetailContentProps {
  activeTab: TransitTab
  selectedBusStop: BusStop | null
  selectedSubwayStation: SubwayStation | null
}

export function DetailContent({ activeTab, selectedBusStop, selectedSubwayStation }: DetailContentProps) {
  if (activeTab === "bus" && selectedBusStop) {
    return <BusStopDetail busStop={selectedBusStop} />
  }

  if (activeTab === "subway" && selectedSubwayStation) {
    return <SubwayStationDetail station={selectedSubwayStation} />
  }

  return <EmptyDetail activeTab={activeTab} />
}

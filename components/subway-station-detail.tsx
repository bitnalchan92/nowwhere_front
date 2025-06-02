import { Train, Clock, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SubwayStation } from "@/types/transit"
import { formatArrivalTime, formatDistance } from "@/utils/format"

interface SubwayStationDetailProps {
  station: SubwayStation
}

export function SubwayStationDetail({ station }: SubwayStationDetailProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Train className="h-6 w-6 text-green-600" />
        <h2 className="text-xl md:text-2xl font-bold">{station.name}</h2>
      </div>

      <div className="grid gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {formatDistance(station.distance)}
              </div>
              <Badge className={`${station.lineColor} text-white`}>{station.line}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mb-4">실시간 도착 정보</h3>
      <div className="space-y-3">
        {station.arrivals.map((arrival) => (
          <Card key={arrival.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-base">{arrival.direction}</span>
                    <Badge variant="secondary" className="text-xs">
                      {arrival.trainType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{arrival.destination} 행</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                    <Clock className="h-5 w-5" />
                    {formatArrivalTime(arrival.arrivalTime)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

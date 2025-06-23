import { Bus, Clock, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { NearBusStop } from "@/types/transit"
import { formatArrivalTime, formatDistance } from "@/utils/format"

interface BusStopDetailProps {
  busStop: NearBusStop
}

export function BusStopDetail({ busStop }: BusStopDetailProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bus className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl md:text-2xl font-bold">{busStop.stationNm}</h2>
      </div>

      <div className="grid gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {formatDistance(busStop.dist)}
              </div>
              <div>정류장 번호: {busStop.arsId}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mb-4">실시간 도착 정보</h3>
      <div className="space-y-3">
        {/*{busStop.routes.map((route) => (*/}
        {/*  <Card key={route.id}>*/}
        {/*    <CardContent className="pt-4">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <div className="flex-1">*/}
        {/*          <div className="flex items-center gap-3 mb-2">*/}
        {/*            <Badge variant="outline" className="font-semibold text-base px-3 py-1">*/}
        {/*              {route.routeNumber}*/}
        {/*            </Badge>*/}
        {/*            <span className="font-medium">{route.destination}</span>*/}
        {/*            <Badge variant="secondary" className="text-xs">*/}
        {/*              {route.vehicleType}*/}
        {/*            </Badge>*/}
        {/*          </div>*/}
        {/*          <p className="text-sm text-gray-500">{route.remainingStops}정거장 전</p>*/}
        {/*        </div>*/}
        {/*        <div className="text-right">*/}
        {/*          <div className="flex items-center gap-1 text-lg font-bold text-blue-600">*/}
        {/*            <Clock className="h-5 w-5" />*/}
        {/*            {formatArrivalTime(route.arrivalTime)}*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*))}*/}
      </div>
    </div>
  )
}

"use client"

import { Bus, Clock, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BusArrival, NearBusStop } from "@/types/transit"
import { formatDistance } from "@/utils/format"
import { useEffect, useState } from "react"
import { getBusArrivalInfo } from "@/lib/busApi"

interface BusStopDetailProps {
  busStop: NearBusStop
}

export function BusStopDetail({ busStop }: BusStopDetailProps) {
  const [arrivals, setArrivals] = useState<BusArrival[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchArrivalInfo = async () => {
      setLoading(true)
      const data = await getBusArrivalInfo(busStop.arsId)
      setArrivals(data)
      setLoading(false)
    }

    fetchArrivalInfo()
  }, [busStop.arsId])

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
              <div className="flex items-center gap-1 ">
                <MapPinIcon className="h-4 w-4" />
                {formatDistance(busStop.dist)}
              </div>
              <div>정류장 번호 : {busStop.arsId}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mb-4">실시간 도착 정보</h3>
      <div className="space-y-3">
        {loading ? (
          <Card>
            <CardContent className="pt-4 text-center text-gray-500">
              도착 정보를 불러오는 중...
            </CardContent>
          </Card>
        ) : arrivals.length === 0 ? (
          <Card>
            <CardContent className="pt-4 text-center text-gray-500">
              현재 도착 예정인 버스가 없습니다.
            </CardContent>
          </Card>
        ) : (
          arrivals.map((arrival) => (
            <Card key={arrival.busRouteId}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant="outline"
                        className="font-semibold text-base px-3 py-1"
                      >
                        {arrival.busRouteNm}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {arrival.arrmsg1 && (
                        <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {arrival.arrmsg1}
                          {arrival.sectOrd1 && (
                            <span className="text-gray-500">
                              ({arrival.sectOrd1}번째 전)
                            </span>
                          )}
                        </p>
                      )}
                      {arrival.arrmsg2 && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {arrival.arrmsg2}
                          {arrival.sectOrd2 && (
                            <span>({arrival.sectOrd2}번째 전)</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

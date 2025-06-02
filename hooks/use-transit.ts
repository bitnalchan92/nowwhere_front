"use client"

import { useState, useEffect } from "react"
import type { BusStop, LocationInfo, SubwayStation, TransitTab } from "@/types/transit"
import { sampleBusStops, sampleSubwayStations } from "@/data/sample-data"

export function useTransit() {
  const [activeTab, setActiveTab] = useState<TransitTab>("bus")
  const [location, setLocation] = useState<LocationInfo>({
    latitude: 37.4979,
    longitude: 127.0276,
    address: "서울특별시 강남구 역삼동 123-45",
  })
  const [busStops, setBusStops] = useState<BusStop[]>([])
  const [subwayStations, setSubwayStations] = useState<SubwayStation[]>([])
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null)
  const [selectedSubwayStation, setSelectedSubwayStation] = useState<SubwayStation | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const searchNearbyStops = () => {
    setLoading(true)

    // 실제 API 호출 대신 샘플 데이터 사용
    setTimeout(() => {
      setBusStops(sampleBusStops)
      setSubwayStations(sampleSubwayStations)
      setLoading(false)

      // 첫 번째 항목을 기본 선택 (데스크톱에서만)
      if (window.innerWidth >= 768) {
        if (activeTab === "bus" && sampleBusStops.length > 0) {
          setSelectedBusStop(sampleBusStops[0])
        } else if (activeTab === "subway" && sampleSubwayStations.length > 0) {
          setSelectedSubwayStation(sampleSubwayStations[0])
        }
      }
    }, 1000)
  }

  const handleStopSelect = (stop: BusStop | SubwayStation) => {
    if (activeTab === "bus") {
      setSelectedBusStop(stop as BusStop)
      setSelectedSubwayStation(null)
    } else {
      setSelectedSubwayStation(stop as SubwayStation)
      setSelectedBusStop(null)
    }

    // 모바일에서는 상세 화면으로 전환
    if (window.innerWidth < 768) {
      setShowDetail(true)
    }
  }

  const handleBackToList = () => {
    setShowDetail(false)
  }

  useEffect(() => {
    if (activeTab === "bus") {
      setSelectedSubwayStation(null)
      if (busStops.length > 0 && window.innerWidth >= 768) {
        setSelectedBusStop(busStops[0])
      }
    } else {
      setSelectedBusStop(null)
      if (subwayStations.length > 0 && window.innerWidth >= 768) {
        setSelectedSubwayStation(subwayStations[0])
      }
    }
  }, [activeTab, busStops, subwayStations])

  return {
    activeTab,
    setActiveTab,
    location,
    busStops,
    subwayStations,
    selectedBusStop,
    selectedSubwayStation,
    loading,
    showDetail,
    searchNearbyStops,
    handleStopSelect,
    handleBackToList,
  }
}

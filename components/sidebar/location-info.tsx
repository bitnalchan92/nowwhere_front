"use client"

import {MapPin, Search} from "lucide-react"
import {Button} from "@/components/ui/button"
import type {LocationInfo} from "@/types/transit"

interface LocationInfoProps {
  location: LocationInfo
  loading: boolean
  onSearch: () => void
  activeTab: "bus" | "subway"
}

export function LocationInfoCard({location, loading, onSearch, activeTab}: LocationInfoProps) {
  // TODO 백엔드 API 호출



  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-blue-600"/>
        <span className="font-medium text-sm">현재 위치</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
      <div className="text-xs text-gray-500 mb-3">
        위도: {location.latitude.toFixed(6)}, 경도: {location.longitude.toFixed(6)}
      </div>
      <Button onClick={onSearch} disabled={loading} className="w-full">
        <Search className="h-4 w-4 mr-2"/>
        {loading ? "검색 중..." : `근처 ${activeTab === "bus" ? "버스정류장" : "지하철역"} 검색`}
      </Button>
    </div>
  )
}

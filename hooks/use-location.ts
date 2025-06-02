"use client"

import { useState } from "react"
import type { LocationInfo } from "@/types/transit"

export function useLocation() {
  const [location, setLocation] = useState<LocationInfo>({
    latitude: 37.4979,
    longitude: 127.0276,
    address: "서울특별시 강남구 역삼동 123-45",
  })

  const updateLocation = (newLocation: LocationInfo) => {
    setLocation(newLocation)
  }

  return {
    location,
    updateLocation,
  }
}

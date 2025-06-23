"use client"

import {useEffect, useState} from "react"
import type {LocationInfo} from "@/types/transit"
import {getAddressFormCoords} from "@/lib/locationApi";

export function useLocation() {
  const [location, setLocation] = useState<LocationInfo>({
    latitude: 0,
    longitude: 0,
    address: "",
  })

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;

        const res = await getAddressFormCoords(latitude, longitude);

        const result: LocationInfo = {
          latitude,
          longitude,
          address: res
            ? (res.roadAddressName !== "" && res.zoneNo !== ""
              ? `${res.roadAddressName} (${res.zoneNo})`
              : res.addressName)
            : "주소 정보를 불러오지 못했습니다."
        }

        updateLocation(result)
      },
      (error) => console.log("Geolocation Error:", error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }, [])

  const updateLocation = (newLocation: LocationInfo) => {
    setLocation(newLocation)
  }

  return {
    location,
    updateLocation,
  }
}

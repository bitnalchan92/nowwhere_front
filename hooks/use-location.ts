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
  const [isLocationReady, setIsLocationReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!navigator.geolocation) return;

    setIsLoading(true); // 로딩중 상태! 위치 정보가 셋팅되고 나서 다른 처리를 할수있도록 추가!
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
        setIsLocationReady(true);
        setIsLoading(false);
      },
      (error) => {
        console.log("Geolocation Error:", error)
        setIsLoading(false);
      },
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
    isLocationReady,
    isLoading,
  }
}

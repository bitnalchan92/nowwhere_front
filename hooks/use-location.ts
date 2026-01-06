"use client"

import { useEffect, useState } from "react"
import type { LocationInfo } from "@/types/transit"
import { getAddressFormCoords } from "@/lib/locationApi"
import { toast } from "sonner"

export function useLocation() {
  const [location, setLocation] = useState<LocationInfo>({
    latitude: 0,
    longitude: 0,
    address: "",
  })
  const [isLocationReady, setIsLocationReady] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      const errorMessage = "위치 서비스를 지원하지 않는 브라우저입니다."
      setError(errorMessage)
      toast.error(errorMessage)
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          const res = await getAddressFormCoords(latitude, longitude)

          const result: LocationInfo = {
            latitude,
            longitude,
            address: res
              ? res.roadAddressName !== "" && res.zoneNo !== ""
                ? `${res.roadAddressName} (${res.zoneNo})`
                : res.addressName
              : "주소 정보를 불러오지 못했습니다.",
          }

          updateLocation(result)
          setIsLocationReady(true)
          setError(null)
        } catch (err) {
          const errorMessage = "주소 정보를 불러오는 중 오류가 발생했습니다."
          setError(errorMessage)
          toast.error(errorMessage)
          console.error("Address fetch error:", err)
        } finally {
          setIsLoading(false)
        }
      },
      (error) => {
        let errorMessage = "위치 정보를 가져올 수 없습니다."
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요."
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "위치 정보를 가져오는 시간이 초과되었습니다."
        }
        setError(errorMessage)
        toast.error(errorMessage)
        console.error("Geolocation Error:", error)
        setIsLoading(false)
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

  // 위치 정보를 다시 가져오는 함수 (새로운 위치 정보 반환)
  const refreshLocation = async (): Promise<LocationInfo | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        const errorMessage = "위치 서비스를 지원하지 않는 브라우저입니다."
        setError(errorMessage)
        toast.error(errorMessage)
        resolve(null)
        return
      }

      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords

            const res = await getAddressFormCoords(latitude, longitude)

            const result: LocationInfo = {
              latitude,
              longitude,
              address: res
                ? res.roadAddressName !== "" && res.zoneNo !== ""
                  ? `${res.roadAddressName} (${res.zoneNo})`
                  : res.addressName
                : "주소 정보를 불러오지 못했습니다.",
            }

            updateLocation(result)
            setIsLocationReady(true)
            setError(null)
            toast.success("위치 정보를 업데이트했습니다.")
            resolve(result)
          } catch (err) {
            const errorMessage = "주소 정보를 불러오는 중 오류가 발생했습니다."
            setError(errorMessage)
            toast.error(errorMessage)
            console.error("Address fetch error:", err)
            resolve(null)
          } finally {
            setIsLoading(false)
          }
        },
        (error) => {
          let errorMessage = "위치 정보를 가져올 수 없습니다."
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요."
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "위치 정보를 가져오는 시간이 초과되었습니다."
          }
          setError(errorMessage)
          toast.error(errorMessage)
          console.error("Geolocation Error:", error)
          setIsLoading(false)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    })
  }

  return {
    location,
    updateLocation,
    refreshLocation,
    isLocationReady,
    isLoading,
    error,
  }
}

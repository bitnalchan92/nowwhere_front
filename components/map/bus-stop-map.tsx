"use client"

import { useEffect, useRef } from "react"
import type { NearBusStop } from "@/types/transit"

declare global {
  interface Window {
    kakao: any
  }
}

interface BusStopMapProps {
  busStops: NearBusStop[]
  userLocation: { latitude: number; longitude: number } | null
  selectedStop: NearBusStop | null
  onMarkerClick?: (stop: NearBusStop) => void
}

export function BusStopMap({ busStops, userLocation, selectedStop, onMarkerClick }: BusStopMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Kakao Maps SDK 로드
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps SDK not loaded")
        return
      }

      window.kakao.maps.load(() => {
        const mapOptions = {
          center: userLocation
            ? new window.kakao.maps.LatLng(userLocation.latitude, userLocation.longitude)
            : new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 기본값
          level: 2, // 지도 확대 레벨 (레벨 2 = 약 250m 반경)
        }

        // 지도 생성
        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions)
        mapRef.current = map

        // 사용자 위치 마커 표시
        if (userLocation) {
          const userMarkerPosition = new window.kakao.maps.LatLng(
            userLocation.latitude,
            userLocation.longitude
          )

          // 사용자 위치 원형 마커
          const userMarker = new window.kakao.maps.CustomOverlay({
            position: userMarkerPosition,
            content: `
              <div style="
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #3b82f6;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              "></div>
            `,
            yAnchor: 0.5,
          })
          userMarker.setMap(map)

          // 250m 반경 원 표시
          const circle = new window.kakao.maps.Circle({
            center: userMarkerPosition,
            radius: 250,
            strokeWeight: 2,
            strokeColor: "#3b82f6",
            strokeOpacity: 0.5,
            strokeStyle: "dashed",
            fillColor: "#3b82f6",
            fillOpacity: 0.1,
          })
          circle.setMap(map)
        }
      })
    }

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadKakaoMap)
    } else {
      loadKakaoMap()
    }
  }, [userLocation])

  // 버스 정류장 마커 업데이트
  useEffect(() => {
    if (!mapRef.current || !window.kakao) return

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // 새 마커 추가
    busStops.forEach((stop, index) => {
      const position = new window.kakao.maps.LatLng(stop.gpsY, stop.gpsX)

      const isSelected = selectedStop?.stationId === stop.stationId

      // DOM 요소로 직접 생성
      const markerDiv = document.createElement('div')
      markerDiv.style.cssText = 'display: flex; flex-direction: column; align-items: center; cursor: pointer;'

      markerDiv.innerHTML = `
        <div style="
          width: ${isSelected ? "40px" : "24px"};
          height: ${isSelected ? "40px" : "24px"};
          border-radius: 50%;
          background: ${isSelected ? "#dc2626" : "#ef4444"};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: ${isSelected ? "16px" : "11px"};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: ${isSelected ? "3px" : "2px"} solid white;
        ">
          ${index + 1}
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: ${isSelected ? "7px" : "5px"} solid transparent;
          border-right: ${isSelected ? "7px" : "5px"} solid transparent;
          border-top: ${isSelected ? "9px" : "6px"} solid ${isSelected ? "#dc2626" : "#ef4444"};
          margin-top: -2px;
        "></div>
      `

      // 마커 클릭 이벤트 추가
      if (onMarkerClick) {
        markerDiv.addEventListener("click", () => {
          onMarkerClick(stop)
        })
      }

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: markerDiv,
        yAnchor: 1,
      })

      customOverlay.setMap(mapRef.current)
      markersRef.current.push(customOverlay)
    })
  }, [busStops, selectedStop, onMarkerClick])

  // 선택된 정류장으로 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current || !selectedStop || !window.kakao) return

    const moveLatLon = new window.kakao.maps.LatLng(selectedStop.gpsY, selectedStop.gpsX)
    mapRef.current.panTo(moveLatLon)
  }, [selectedStop])

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
    />
  )
}

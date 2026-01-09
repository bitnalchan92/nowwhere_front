"use client"

import { useEffect, useState, useCallback } from "react"

interface DeviceHeadingState {
  heading: number | null // 0-360도, 북쪽 기준 시계방향
  isSupported: boolean
  permissionState: "prompt" | "granted" | "denied" | "unknown"
  error: string | null
}

export function useDeviceHeading() {
  const [state, setState] = useState<DeviceHeadingState>({
    heading: null,
    isSupported: false,
    permissionState: "unknown",
    error: null,
  })

  // iOS에서 권한 요청이 필요한 경우
  const requestPermission = useCallback(async (): Promise<boolean> => {
    // iOS 13+ 에서 DeviceOrientationEvent.requestPermission 필요
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        setState((prev) => ({
          ...prev,
          permissionState: permission as "granted" | "denied",
        }))
        return permission === "granted"
      } catch (error) {
        console.error("DeviceOrientation permission error:", error)
        setState((prev) => ({
          ...prev,
          permissionState: "denied",
          error: "방향 센서 권한 요청 중 오류가 발생했습니다.",
        }))
        return false
      }
    }
    // 권한 요청이 필요 없는 경우 (Android, 데스크톱 등)
    return true
  }, [])

  useEffect(() => {
    // DeviceOrientationEvent 지원 여부 확인
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setState((prev) => ({
        ...prev,
        isSupported: false,
        error: "이 기기는 방향 센서를 지원하지 않습니다.",
      }))
      return
    }

    setState((prev) => ({ ...prev, isSupported: true }))

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // webkitCompassHeading은 iOS에서 사용 (북쪽 기준 절대 방향)
      // alpha는 안드로이드에서 사용 (초기 방향 기준 상대 방향)
      let heading: number | null = null

      if ((event as any).webkitCompassHeading !== undefined) {
        // iOS: webkitCompassHeading은 이미 북쪽 기준 절대 방향 (0-360)
        heading = (event as any).webkitCompassHeading
      } else if (event.alpha !== null && event.absolute) {
        // Android (absolute mode): alpha는 북쪽 기준 반시계방향이므로 변환 필요
        heading = (360 - event.alpha) % 360
      } else if (event.alpha !== null) {
        // 일부 기기에서는 absolute가 false여도 alpha 값 사용 가능
        // 이 경우 정확도가 떨어질 수 있음
        heading = (360 - event.alpha) % 360
      }

      if (heading !== null) {
        setState((prev) => ({
          ...prev,
          heading: Math.round(heading as number),
          permissionState: "granted",
          error: null,
        }))
      }
    }

    // iOS 권한 확인
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      // iOS에서는 사용자 제스처로 권한을 요청해야 하므로
      // 여기서는 permissionState만 prompt로 설정
      setState((prev) => ({ ...prev, permissionState: "prompt" }))
    } else {
      // Android/데스크톱: 바로 리스너 등록
      window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener)
      window.addEventListener("deviceorientation", handleOrientation)
      setState((prev) => ({ ...prev, permissionState: "granted" }))
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation as EventListener)
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [])

  // iOS에서 권한 요청 후 리스너 등록
  const startWatching = useCallback(async () => {
    const hasPermission = await requestPermission()
    if (!hasPermission) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading: number | null = null

      if ((event as any).webkitCompassHeading !== undefined) {
        heading = (event as any).webkitCompassHeading
      } else if (event.alpha !== null) {
        heading = (360 - event.alpha) % 360
      }

      if (heading !== null) {
        setState((prev) => ({
          ...prev,
          heading: Math.round(heading as number),
          error: null,
        }))
      }
    }

    window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener)
    window.addEventListener("deviceorientation", handleOrientation)
  }, [requestPermission])

  return {
    ...state,
    requestPermission,
    startWatching,
  }
}

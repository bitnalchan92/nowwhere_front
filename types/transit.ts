export interface BusStop {
  id: string
  name: string
  number: string
  distance: number
  routes: BusRoute[]
}

export interface BusRoute {
  id: string
  routeNumber: string
  destination: string
  arrivalTime: number
  remainingStops: number
  vehicleType: "일반" | "저상" | "굴절"
}

export interface SubwayStation {
  id: string
  name: string
  line: string
  distance: number
  arrivals: SubwayArrival[]
  lineColor: string
}

export interface SubwayArrival {
  id: string
  direction: string
  arrivalTime: number
  destination: string
  trainType: "일반" | "급행"
}

export interface LocationInfo {
  latitude: number
  longitude: number
  address: string
}

export type TransitTab = "bus" | "subway"

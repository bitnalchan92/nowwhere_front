import type { BusStop, SubwayStation } from "@/types/transit"

// export const sampleBusStops: BusStop[] = [
//   {
//     id: "1",
//     name: "역삼역",
//     number: "23-456",
//     distance: 120,
//     routes: [
//       {
//         id: "1",
//         routeNumber: "143",
//         destination: "강남역",
//         arrivalTime: 3,
//         remainingStops: 2,
//         vehicleType: "일반",
//       },
//       {
//         id: "2",
//         routeNumber: "146",
//         destination: "잠실역",
//         arrivalTime: 7,
//         remainingStops: 4,
//         vehicleType: "저상",
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "테헤란로",
//     number: "23-457",
//     distance: 250,
//     routes: [
//       {
//         id: "3",
//         routeNumber: "401",
//         destination: "수서역",
//         arrivalTime: 5,
//         remainingStops: 3,
//         vehicleType: "일반",
//       },
//       {
//         id: "4",
//         routeNumber: "402",
//         destination: "잠실역",
//         arrivalTime: 12,
//         remainingStops: 8,
//         vehicleType: "굴절",
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "강남역사거리",
//     number: "23-458",
//     distance: 380,
//     routes: [
//       {
//         id: "5",
//         routeNumber: "143",
//         destination: "청량리역",
//         arrivalTime: 8,
//         remainingStops: 5,
//         vehicleType: "일반",
//       },
//     ],
//   },
// ]

export const sampleSubwayStations: SubwayStation[] = [
  {
    id: "1",
    name: "역삼역",
    line: "2호선",
    distance: 150,
    lineColor: "bg-green-500",
    arrivals: [
      {
        id: "1",
        direction: "강남 방면",
        arrivalTime: 2,
        destination: "잠실역",
        trainType: "일반",
      },
      {
        id: "2",
        direction: "홍대입구 방면",
        arrivalTime: 5,
        destination: "신도림역",
        trainType: "일반",
      },
    ],
  },
  {
    id: "2",
    name: "선정릉역",
    line: "9호선",
    distance: 420,
    lineColor: "bg-amber-500",
    arrivals: [
      {
        id: "3",
        direction: "김포공항 방면",
        arrivalTime: 4,
        destination: "김포공항역",
        trainType: "급행",
      },
      {
        id: "4",
        direction: "중앙보훈병원 방면",
        arrivalTime: 8,
        destination: "중앙보훈병원역",
        trainType: "일반",
      },
    ],
  },
  {
    id: "3",
    name: "강남역",
    line: "2호선",
    distance: 520,
    lineColor: "bg-green-500",
    arrivals: [
      {
        id: "5",
        direction: "잠실 방면",
        arrivalTime: 3,
        destination: "잠실역",
        trainType: "일반",
      },
    ],
  },
]

import axiosInstance from "@/lib/axiosInstance";
import { BusArrival, NearBusStop } from "@/types/transit";

export const getNearBusStops = async (
  latitude?: number,
  longitude?: number
): Promise<NearBusStop[]> => {
  try {
    const params: Record<string, string> = {};
    if (latitude !== undefined && longitude !== undefined) {
      params.latitude = latitude.toString();
      params.longitude = longitude.toString();
    }

    const response = await axiosInstance.get(`/api/bus/nearBusStops`, {
      params,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("근접 버스 정류장 조회 실패 : ", error);
    return [];
  }
};

export const getBusArrivalInfo = async (
  arsId: string
): Promise<BusArrival[]> => {
  try {
    const response = await axiosInstance.get(`/api/bus/arrivalInfo`, {
      params: { arsId },
    });
    console.log("버스 도착 정보:", response.data);

    return response.data;
  } catch (error) {
    console.error("버스 도착 정보 조회 실패 : ", error);
    return [];
  }
};

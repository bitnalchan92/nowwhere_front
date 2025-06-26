import axiosInstance from "@/lib/axiosInstance";
import { NearBusStop } from "@/types/transit";

export const getNearBusStops = async (): Promise<NearBusStop[]> => {
  try {
    const response = await axiosInstance.get(`/api/bus/nearBusStops`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("근접 버스 정류장 조회 실패 : ", error);
    return [];
  }
};

import axiosInstance from "@/lib/axiosInstance";

export type KakaoAddressInfo = {
  addressName: string;
  roadAddressName: string;
  zoneNo: string;
}

export const getAddressFormCoords = async (
  latitude: number,
  longitude: number,
): Promise<KakaoAddressInfo | null> => {
  try {
    const response = await axiosInstance.get(
      `/api/location/addressInfo`,
      {
        params: {longitude, latitude},
      }
    )

    return response.data;
  } catch (error) {
    console.error("좌표 정보로 주소 조회 실패 : ", error);
    return null;
  }
}


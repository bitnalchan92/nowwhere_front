"use client"

import axios from 'axios';
import {useEffect, useState} from "react"
import type {LocationInfo} from "@/types/transit"

type KakaoAddressInfo = {
  addressName: string;
  roadAddressName: string;
  zoneNo: string;
}
const fetchAddress = async (latitude: number, longitude: number): Promise<KakaoAddressInfo | null> => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/kakao/addressInfo`,
      {
        params: {longitude, latitude},
      }
    )

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
});


export function useLocation() {
  const [location, setLocation] = useState<LocationInfo>({
    latitude: 0,
    longitude: 0,
    address: "",
  })
  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        fetchAddress(latitude, longitude).then((res) => {
          const result = {
            latitude,
            longitude,
            address: "주소 정보를 불러오지 못했습니다."
          }
          if (res) {
            result.address =
              res.roadAddressName != "" && res.zoneNo != "" ?
                res.roadAddressName + "(" + res.zoneNo + ")"
                :
                res.addressName;
          }

          updateLocation(result);
        });

      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );


  }, []);

  const updateLocation = (newLocation: LocationInfo) => {
    setLocation(newLocation)
  }

  return {
    location,
    updateLocation,
  }
}

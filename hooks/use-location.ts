"use client"

import {useEffect, useState} from "react"
import type {LocationInfo} from "@/types/transit"

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

        const fetchAddress = async () => {
          const res = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
            {
              headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`
              }
            }
          );

          const data = await res.json();
          const region = data.documents?.[0];
          if (region) {
            return `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
          }
        };

        fetchAddress().then((res) => {
          updateLocation({
            latitude,
            longitude,
            address: res || "",
          })
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

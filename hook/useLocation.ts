'use client'

import { useState, useEffect, SetStateAction } from "react";
import apiLocation from '@/api/geo-location'
import { GetAllLocation } from '@/interfaces/location'

export const useLocation = () => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [location, setLocation] = useState<GetAllLocation>()

  const onSuccess = (location: any) => {
    setLat(location.coords.latitude)
    setLng(location.coords.longitude)
  }

  const onError = (error: { code: number, message: string }) => {
    console.log('err', error)
  }

  const getLocation = async () => {
    const coordinates = {
      lat: lat,
      lng: lng
    };
    await apiLocation.getLocation(coordinates)
      .then((res) => {
        setLocation(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'GeoLocation not supported'
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)

    if (lat && lng) {
      getLocation()
    }
  }, [lat, lng])

  return { ...location }
}
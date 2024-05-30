import { LatLng } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useAppState } from '@/hooks/useAppState';

/**
 * @title 사용자 위치 정보
 * */
export const useUserLocation = () => {
  // 앱 상태 파악하는 hook
  const { isComeBack } = useAppState();
  const [userLocationS, setUserLocationS] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationErrorS, setIsUserLocationErrorS] =
    useState(false);

  // 1 나의 위치를 구하고,
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        setUserLocationS({ latitude, longitude });
        setIsUserLocationErrorS(false);
      },
      () => {
        setIsUserLocationErrorS(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeBack]);

  return {
    userLocationS,
    isUserLocationErrorS,
  };
};

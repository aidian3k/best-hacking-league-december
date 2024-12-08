import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const DEFAULT_LOCATION: Location.LocationObject = {
  coords: {
    latitude: 52.2297,
    longitude: 21.0122,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: Date.now()
};

export const useGetLocationAccess = () => {
  const [location, setLocation] = useState<Location.LocationObject>(DEFAULT_LOCATION);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return { location, error };
};

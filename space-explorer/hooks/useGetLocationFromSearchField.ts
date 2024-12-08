import useDebounce from '@/hooks/common/useDebounce';
import { useEffect, useState } from 'react';
import { useGetLocationOfSearchedPlace } from '@/app/query/google-geocoder/GoogleGeocoderQueries';
import {useDispatch} from "react-redux";
import {setLocation} from "@/redux/location/location.slice";

export const useGetLocationFromSearchField = (searchText: string) => {
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, isError, refetch } = useGetLocationOfSearchedPlace(debouncedSearchText);

  useEffect(() => {
    if(!!debouncedSearchText) {
      refetch();
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });

    if (!!data && !isLoading && !isError) {
      if(data.results.length === 0) {
        dispatch(
            setLocation({
              timestamp: Date.now(),
              coords: {
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng,
                altitude: null,
                accuracy: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
            }),
        );
      }
    }
  };

  return {
    data,
    isLoading,
    isError,
    onRefresh,
    refreshing,
    refetch
  };
};

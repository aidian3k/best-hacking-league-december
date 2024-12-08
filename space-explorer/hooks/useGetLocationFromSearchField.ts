import useDebounce from '@/hooks/common/useDebounce';
import { useEffect, useState } from 'react';
import { useGetLocationOfSearchedPlace } from '@/app/query/google-geocoder/GoogleGeocoderQueries';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/redux/location/location.slice';

export const useGetLocationFromSearchField = (searchText: string) => {
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, isError, refetch } = useGetLocationOfSearchedPlace(debouncedSearchText);

  useEffect(() => {
    // const search = async () => {
    //   if (!!debouncedSearchText) {
    //     const response = await refetch();
    //     console.log(response);
    //   }
    // }

    console.log(debouncedSearchText);
    // search();
  }, [debouncedSearchText]);

  useEffect(() => {
    console.log("chuj")
    // console.log(data);
    if (!data) {
      console.log("nie ma data")
      return
    }
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
            speed: null
          }
        })
    );
  }, [data])

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
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

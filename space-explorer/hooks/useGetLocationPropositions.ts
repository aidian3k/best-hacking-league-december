import useDebounce from '@/hooks/common/useDebounce';
import { useEffect, useState } from 'react';
import {setLocation} from "@/redux/location/location.slice";
import {
    useGetLocationPropositionsRequest
} from "@/app/query/google-geocoder/GoogleGeocoderQueries";

export const useGetLocationPropositions = (searchText: string) => {
    const debouncedSearchText = useDebounce<string>(searchText, 2000);
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, isError, refetch } = useGetLocationPropositionsRequest(debouncedSearchText);

    useEffect(() => {
        if(!!debouncedSearchText) {
            refetch();
        }
    }, [debouncedSearchText]);

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

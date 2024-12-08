import {useQuery} from "react-query";
import {Endpoints} from "@/app/query/endpoints";
import {axiosInstance} from "@/app/query/apiService";

export function useGetLocationOfSearchedPlace(addressLocation: string) {
    return useQuery({
        queryKey: ["getLocationOfSearchedPlace"],
        queryFn: async () => {
            console.log("JEstem")
            console.log(addressLocation);
            if(!addressLocation) {
                return;
            }

            const response = await axiosInstance.get(
                Endpoints.GOOGLE_GEOCODER_API_BASE_URL,
                {
                    params: {
                        address:  addressLocation,
                        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    },
                }
            )
            console.log(response.data.results[0].geometry);
            return response.data;
        },
    });
}

export function useGetLocationPropositionsRequest(addressLocation: string) {
    return useQuery({
        queryKey: ["getGeoLocationPropositions"],
        queryFn: async () => {
            if(!addressLocation) {
                return;
            }

            const response = await axiosInstance.get(
                Endpoints.GOOGLE_AUTOCOMPLETE_API_BASE_URL,
                {
                    params: {
                        input: addressLocation,
                        types: '(cities)',
                        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    },
                }
            )
            return response.data;
        },
    });
}
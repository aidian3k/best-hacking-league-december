import axios from "axios";
import {Endpoints} from "@/api/endpoints.types";
import {useQuery} from "react-query";

const astronomyApiService = axios.create({
    baseURL: process.env.EXPO_PUBLIC_ASTRONOMY_API_URL,
    headers:{
        Authorization: `Basic ${btoa(`${process.env.EXPO_PUBLIC_ASTRONOMY_API_USER}:${process.env.EXPO_PUBLIC_ASTRONOMY_API_PASSWORD}`)}`
    }
});

export const useGetBodiesPositions = (latitude: number, longitude: number) => {
    return useQuery({
        queryKey: ["bodiesPositions", latitude, longitude],
        queryFn: async () => {
            const currentDateTime: string = new Date().toISOString();
            const currentDate = currentDateTime.substring(0, currentDateTime.indexOf("T"));
            const currentTime = currentDateTime.substring(currentDateTime.indexOf("T") + 1, currentDateTime.indexOf("."));
            const response = await astronomyApiService.get(
                `${Endpoints.BODIES_POSITIONS}?longitude=${longitude}&latitude=${latitude}&elevation=50&from_date=${currentDate}&to_date=${currentDate}&time=${currentTime}`);
            return response.data;
        }
    })
}

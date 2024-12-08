import axios, { AxiosInstance } from "axios";
import {QueryClient} from "react-query";
import {Endpoints} from "@/app/query/endpoints";

export const axiosInstance: AxiosInstance = axios.create();

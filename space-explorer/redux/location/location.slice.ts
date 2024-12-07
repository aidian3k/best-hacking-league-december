import * as Location from 'expo-location';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LocationStateProps = { location: Location.LocationObject, error: string | null };

const DEFAULT_LOCATION: Location.LocationObject = {
    coords: {
        latitude: 52.2297, longitude: 21.0122,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    }, timestamp: Date.now()
};

const initialState: LocationStateProps = {
    location: DEFAULT_LOCATION,
    error: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Location.LocationObject>) => {
            state.location = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLocationState: (state, action: PayloadAction<LocationStateProps>) => {
            state.location = action.payload.location;
            state.error = action.payload.error;
        },
    },
});

export const { setLocation, setError, setLocationState } = locationSlice.actions;
export default locationSlice.reducer;

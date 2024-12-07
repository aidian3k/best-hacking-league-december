import {Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {useGetLocationAccess} from "@/hooks/useGetLocationAccess";
import {useEffect} from "react";
import {setLocationState} from "@/redux/location/location.slice";

export default function Index() {
    const dispatch = useDispatch();
    const locationAccess = useGetLocationAccess();

    useEffect(() => {
        if (locationAccess) {
            dispatch(setLocationState(locationAccess));
        }
    }, [locationAccess]);

    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

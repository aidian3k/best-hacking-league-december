import {SearchPlanetField} from "@/app/components/search-planet-field/SearchPlanetField";
import {useEffect, useState} from "react";
import {View} from "react-native";
import {useDispatch} from "react-redux";
import {useGetLocationAccess} from "@/hooks/useGetLocationAccess";
import {setLocationState} from "@/redux/location/location.slice";

export default function Index() {
    const [searchText, setSearchText] = useState("");
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
     <SearchPlanetField setSearchText={setSearchText} onSearch={() => console.log('Pressed data')}/>
    </View>
  );
}

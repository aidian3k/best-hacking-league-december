import { SearchPlanetField } from "@/app/components/search-planet-field/SearchPlanetField";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useGetLocationAccess } from "@/hooks/useGetLocationAccess";
import { setLocationState } from "@/redux/location/location.slice";
import { useGetLocationFromSearchField } from "@/hooks/useGetLocationFromSearchField";
import { useGetBodiesPositions } from "@/api/query/bodies/bodiesQueries";
import { Link, useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  const dispatch = useDispatch();
  const locationAccess = useGetLocationAccess();

  const { data, isLoading, isError, onRefresh, refreshing, refetch } =
    useGetLocationFromSearchField(searchText);
  const { data: bodiesPositions } = useGetBodiesPositions(
    locationAccess.location.coords.latitude,
    locationAccess.location.coords.latitude,
  );

  useEffect(() => {
    if (locationAccess) {
      dispatch(setLocationState(locationAccess));
    }
  }, [locationAccess, data]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchPlanetField
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={refetch}
      />
      <View>
        <Link href={"/celestial-body"} relativeToDirectory={true}>
          Go to CelestialBody
        </Link>
      </View>
    </View>
  );
}

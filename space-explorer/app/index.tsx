import {SearchPlanetField} from "@/app/components/search-planet-field/SearchPlanetField";
import {useEffect, useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import {useDispatch} from "react-redux";
import {useGetLocationAccess} from "@/hooks/useGetLocationAccess";
import {setLocationState} from "@/redux/location/location.slice";
import { useGetLocationFromSearchField } from "@/hooks/useGetLocationFromSearchField";
import {useGetBodiesPositions} from "@/api/query/bodies/bodiesQueries";
import {Button, ButtonText} from "@/components/ui/button";
import {CosmosDrawer} from "@/app/components/cosmos-drawer/CosmosDrawer.component";

const elements = [
    { id: 1, name: "Planet A", distance: "20000000km", visibility: 90, avatar: "https://via.placeholder.com/50" },
    { id: 2, name: "Planet B", distance: "45000000km", visibility: 75, avatar: "https://via.placeholder.com/50" },
    { id: 3, name: "Planet C", distance: "100000000km", visibility: 60, avatar: "https://via.placeholder.com/50" },
    { id: 4, name: "Planet A", distance: "200000000km", visibility: 90, avatar: "https://via.placeholder.com/50" },
    { id: 5, name: "Planet B", distance: "4000000005km", visibility: 75, avatar: "https://via.placeholder.com/50" },
    { id: 6, name: "Planet C", distance: "1000000000km", visibility: 60, avatar: "https://via.placeholder.com/50" },
    { id: 7, name: "Planet A", distance: "2000000000km", visibility: 90, avatar: "https://via.placeholder.com/50" },
    { id: 8, name: "Planet B", distance: "450000000km", visibility: 75, avatar: "https://via.placeholder.com/50" },
    { id: 9, name: "Planet C", distance: "100000000000km", visibility: 60, avatar: "https://via.placeholder.com/50" },
];
import SkyMap from "@/app/SkyMap.component";

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const locationAccess = useGetLocationAccess();

    const { data, isLoading, isError, onRefresh, refreshing, refetch } =
        useGetLocationFromSearchField(searchText);
    const {data: bodiesPositions} = useGetBodiesPositions(
        locationAccess.location.coords.latitude,
        locationAccess.location.coords.latitude
    );

    useEffect(() => {
        if (locationAccess) {
            dispatch(setLocationState(locationAccess));
        }
    }, [locationAccess, data]);
    const [showDrawer, setShowDrawer] = useState(false);


    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        // position: "relative"
      }}
    >
        <View style={{ position: "absolute", top: 10, zIndex: 1000 }}>
            <SearchPlanetField searchText={searchText} setSearchText={setSearchText} onSearch={refetch} />
        </View>
        <SkyMap />
        <View style={styles.bottomButtonContainer}>
            <Button onPress={() => setShowDrawer(true)}>
                <ButtonText>Visible elements</ButtonText>
            </Button>
        </View>
        <CosmosDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} elements={elements}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomButtonContainer: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
});
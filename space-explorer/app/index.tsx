import {SearchPlanetField} from "@/app/components/search-planet-field/SearchPlanetField";
import {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useGetLocationAccess} from "@/hooks/useGetLocationAccess";
import { useGetLocationFromSearchField } from "@/hooks/useGetLocationFromSearchField";
import {useGetBodiesPositions} from "@/api/query/bodies/bodiesQueries";
import {Button, ButtonText} from "@/components/ui/button";
import {CosmosDrawer} from "@/app/components/cosmos-drawer/CosmosDrawer.component";

import SkyMap from "@/app/SkyMap.component";
import {BodiesPositionsResponse} from "@/api/query/bodies/bodiesQueries.types";
import {RootState} from "@/redux/store";

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const locationAccess = useGetLocationAccess();
    const location = useSelector((state: RootState) => state.location);
    const [locationToSearch, setLocationToSearch] = useState(locationAccess.location);

    const { refetch } =
        useGetLocationFromSearchField(searchText);
    const {data: bodiesPositions} = useGetBodiesPositions(
        locationToSearch.coords.latitude,
        locationToSearch.coords.longitude,
    );

    useEffect(() => {
        if (location) {
            setLocationToSearch(location.location);
        }
    }, [location])

    const [showDrawer, setShowDrawer] = useState(false);

    const visibleObjects = bodiesPositions ?
        bodiesPositions.data.table.rows.map((row, index) => {
            return {
                id: index,
                name: row.entry.name,
                distance: row.cells[0].distance.fromEarth.km,
                visibility: 75,
                avatar: "https://via.placeholder.com/50"
            }
        }) : []


    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
      }}
    >
        <View style={{ position: "absolute", top: 10, zIndex: 1000 }}>
            <SearchPlanetField searchText={searchText} setSearchText={setSearchText} onSearch={refetch} />
        </View>
        <SkyMap bodiesPositions={bodiesPositions as BodiesPositionsResponse}/>
        <View style={styles.bottomButtonContainer}>
            <Button onPress={() => setShowDrawer(true)}>
                <ButtonText>Visible elements</ButtonText>
            </Button>
        </View>
        <CosmosDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} elements={visibleObjects}/>
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
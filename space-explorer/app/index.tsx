import { View } from "react-native";
import {
    SearchPlanetField
} from "@/app/components/search-planet-field/SearchPlanetField";
import {useState} from "react";

export default function Index() {
    const [searchText, setSearchText] = useState("");

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

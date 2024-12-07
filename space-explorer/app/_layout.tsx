import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
    return <GluestackUIProvider mode="light"><Provider store={store}><Stack /></Provider></GluestackUIProvider>;
}

import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "@/redux/store";

import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/api/queryClient";

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <Provider store={store}>
                    <Stack />
                </Provider>
            </GluestackUIProvider>
        </QueryClientProvider>
    );
}

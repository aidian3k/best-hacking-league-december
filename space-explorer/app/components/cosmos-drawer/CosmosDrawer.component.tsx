import React, { useState } from "react";
import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View, Image } from "react-native";
import {styles} from "@/app/components/cosmos-drawer/CosmosDrawerStyles";

interface DrawerComponentProps {
    isOpen: boolean;
    onClose: () => void;
    elements: { id: number; name: string; distance: string; visibility: number; avatar: string }[];
}

export const CosmosDrawer: React.FC<DrawerComponentProps> = ({ isOpen, onClose, elements }) => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} size="lg" anchor="bottom">
            <DrawerBackdrop />
            <DrawerContent>
                <DrawerHeader>
                    <Heading size="xl" className="text-typography-800">
                        Visible elements
                    </Heading>
                </DrawerHeader>
                <DrawerBody style={{ flex: 1 }}>
                    <DrawerBody style={{ flex: 1 }}>
                        <View >
                            {elements.map((item) => (
                                <View key={item.id} style={styles.elementRow}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    <View style={styles.elementInfo}>
                                        <Text size="lg" className="font-bold">{item.name}</Text>
                                        <Text size="sm" className="text-typography-600">Distance: {item.distance}</Text>
                                        <Text size="sm" className="text-typography-600">Visibility: {item.visibility}%</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </DrawerBody>

                </DrawerBody>
                <DrawerFooter>
                    <Button onPress={onClose} className="flex-1">
                        <ButtonText>Close</ButtonText>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

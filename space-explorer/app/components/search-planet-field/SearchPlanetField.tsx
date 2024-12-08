import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { HStack } from "@/components/ui/hstack";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import {Button, ButtonSpinner, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Pressable, Text, TouchableOpacity, View} from "react-native";
import {useGetLocationPropositions} from "@/hooks/useGetLocationPropositions";
import {Divider} from "@/components/ui/divider";

export type SearchSpaceObjectProps = {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
};

export const SearchPlanetField = ({ searchText, setSearchText, onSearch }: SearchSpaceObjectProps) => {
    const [propositionCities, setPropositionCities] = React.useState<string[]>([]);
    const {data, isLoading, isError, onRefresh, refreshing} = useGetLocationPropositions(searchText);

    useEffect(() => {
        if(!!data) {
            setPropositionCities(data?.predictions.map((prediction: any) => prediction.description));
        }
    }, [data]);

    return (
        <HStack className={'w-full flex px-2 align-middle gap-1 justify-center'}>
                <VStack className={'w-3/4'}>
                    <Input>
                        <InputSlot className="pl-3">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField placeholder="Search..." value={searchText} onChangeText={text => setSearchText(text)}/>
                    </Input>
                    {propositionCities.length > 0 && (
                        <VStack className="py-2 w-full bg-white border rounded-lg shadow-lg">
                            {propositionCities.map((suggestion, index) => (
                                <VStack className={'w-full flex flex-col gap-1'} key={index}>
                                    <TouchableOpacity className={'w-full'} onPress={() => console.log('chiuj')}>
                                        <View>
                                            <Text className="px-4 py-2 text-sm text-black hover:bg-gray-100">{suggestion}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Divider/>
                                </VStack>
                            ))}
                        </VStack>
                    )}
                </VStack>

            <View className={'w-1/4 flex'}>
                <View>
                    <Button onPress={onSearch}>
                        <ButtonText className="font-medium text-sm">Search</ButtonText>
                    </Button>
                </View>
            </View>
        </HStack>
    );
};
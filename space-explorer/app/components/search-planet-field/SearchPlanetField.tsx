import React, {Dispatch, SetStateAction, useEffect} from "react";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import {SearchIcon} from "@/components/ui/icon";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Pressable, Text, View} from "react-native";
import {useGetLocationPropositions} from "@/hooks/useGetLocationPropositions";
import {Divider} from "@/components/ui/divider";
import {Spinner} from "@/components/ui/spinner";

export type SearchSpaceObjectProps = {
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    onSearch: () => void;
};

export const SearchPlanetField = ({ searchText, setSearchText, onSearch }: SearchSpaceObjectProps) => {
    const [propositionCities, setPropositionCities] = React.useState<string[]>([]);
    const [autocompleteShown, setAutocompleteShown] = React.useState<boolean>(false);
    const {data, isFetching, isError, onRefresh, refreshing} = useGetLocationPropositions(searchText);

    const handleAutocompleteSelected = (suggestion: string) => {
        setSearchText(suggestion)
        setAutocompleteShown(false);
    }

    useEffect(() => {
        if(!!data) {
            setPropositionCities(data?.predictions.map((prediction: any) => prediction.description));
            setAutocompleteShown(true);
        }
    }, [data]);

    return (
        <HStack className={'w-full flex px-2 pt-2 align-middle gap-1 justify-center'}>
                <VStack className={'w-3/4'}>
                    <Input>
                        <InputSlot className="pl-3">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField
                            placeholder="Search..."
                            value={searchText}
                            onChangeText={text => setSearchText(text)}
                            style={{
                                color: 'white',
                                textAlignVertical: 'center',  // Ustawienie wyrównania tekstu w pionie
                                paddingVertical: 10,          // Możesz dostosować, aby uzyskać idealne wyrównanie
                            }}
                        />
                    </Input>

                    {autocompleteShown &&<VStack className="w-full bg-white border rounded-lg shadow-lg">
                        {isFetching && <Spinner />}
                        {propositionCities.length > 0 && propositionCities.map((suggestion, index) => (
                            <VStack className={'w-full flex flex-col gap-1'} key={index}>
                                <Pressable className={'w-full'} onPress={() => handleAutocompleteSelected(suggestion)}>
                                    <View>
                                        <Text className="px-4 py-2 text-sm text-black">{suggestion}</Text>
                                    </View>
                                </Pressable>
                                <Divider />
                            </VStack>
                        ))}
                    </VStack>}
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
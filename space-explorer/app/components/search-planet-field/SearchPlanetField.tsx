import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import {Button} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";

export type SearchSpaceObjectProps = {
    setSearchText: (text: string) => void;
    onSearch: () => void;
};

export const SearchPlanetField = ({ setSearchText, onSearch }: SearchSpaceObjectProps) => {
    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    };

    return (
        <VStack>
            <HStack className="gap-4 px-4 h-12 border-b border-light-400">
                <Input
                    className="flex-9"
                    variant="outline"
                    size="sm"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField
                        className="py-3"
                        autoFocus={true}
                        placeholder="Search..."
                        onChangeText={handleSearchTextChange}
                    />
                    <InputIcon
                        as={SearchIcon}
                        className="text-darkBlue-500"
                    />
                </Input>
            </HStack>
            <Button
                className="flex-1 bg-darkBlue-500 text-white px-4 py-2"
                onPress={onSearch}
            >
                Search
            </Button>
        </VStack>
    );
};
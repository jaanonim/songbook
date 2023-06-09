import { Center, Spinner } from "@chakra-ui/react";

export function SongEditLoading() {
    return (
        <Center w="100%" h="100%">
            <Spinner size="xl" />
        </Center>
    );
}

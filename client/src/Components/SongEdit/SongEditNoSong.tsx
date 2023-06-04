import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

export function SongEditNoSong({}) {
    return (
        <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            flexDirection="row"
        >
            <Alert
                status="info"
                m={2}
                borderRadius={5}
                ml="auto"
                mr="auto"
                w="sm"
            >
                <AlertIcon />
                Select a song.
            </Alert>
        </Box>
    );
}

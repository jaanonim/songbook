import { Alert, AlertIcon, Box } from "@chakra-ui/react";

interface SongEditErrorProps {
    error: Error;
}

export function SongEditError(props: SongEditErrorProps) {
    return (
        <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            flexDirection="row"
        >
            <Alert
                status="error"
                m={2}
                borderRadius={5}
                ml="auto"
                mr="auto"
                w="sm"
            >
                <AlertIcon />
                {(props.error as Error).message}
            </Alert>
        </Box>
    );
}

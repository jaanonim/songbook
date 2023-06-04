import { ScreenListCopyInput } from "./ScreenListCopyInput";
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Spacer,
} from "@chakra-ui/react";
import "./ScreenList.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface ScreenListProps {
    w?: string;
    h?: string;
}

function ScreenList(props: ScreenListProps) {
    const CODE = "A23AGH";

    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2}>
            <Flex alignContent="center" justifyContent="center">
                <Center>
                    <Heading as="h4" size="md">
                        Screens
                    </Heading>
                </Center>
                <Spacer />
                <ScreenListCopyInput value={CODE} />
                <IconButton
                    ml="2"
                    aria-label="OpenScreen"
                    icon={<ExternalLinkIcon></ExternalLinkIcon>}
                    onClick={() => {
                        window.open(`/screen?code=${CODE}`, "_blank");
                    }}
                ></IconButton>
            </Flex>
        </Box>
    );
}

export default ScreenList;

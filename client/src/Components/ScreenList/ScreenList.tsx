import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Table,
    Tbody,
} from "@chakra-ui/react";
import "./ScreenList.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CopyInput from "../CopyInput";

interface ScreenListProps {
    w?: string;
    h?: string;
}

function ScreenList(props: ScreenListProps) {
    const [screens, setScreens] = useState([]);
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
                <CopyInput value={CODE} />
                <IconButton
                    ml="2"
                    aria-label="OpenScreen"
                    icon={<ExternalLinkIcon></ExternalLinkIcon>}
                    onClick={() => {
                        window.open(`/screen/${CODE}`, "_blank");
                    }}
                ></IconButton>
            </Flex>
            <Box
                h={`calc(100% - 2rem)`}
                border="1px"
                borderColor="rgba(255,255,255,0.1)"
                borderRadius={5}
                mt="1rem"
            >
                <Box h="100%" w="100%" overflowY="scroll">
                    {screens.length == 0 ? (
                        <Center w="100%" h="100%">
                            <Alert
                                status="info"
                                m={2}
                                borderRadius={5}
                                ml="auto"
                                mr="auto"
                                w="70%"
                            >
                                <AlertIcon />
                                Connect a screen using code.
                            </Alert>
                        </Center>
                    ) : (
                        <Table>
                            <Tbody></Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default ScreenList;

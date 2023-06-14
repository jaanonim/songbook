import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Spinner,
    Table,
    Tbody,
    Td,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScreenSettings from "../../Models/ScreenSettings";
import { socket } from "../../Services/socket";
import CopyInput from "../CopyInput";
import "./ScreenList.css";
import { ScreenListElement } from "./ScreenListElement";
import ScreenData, { ScreenDataNotNull } from "../../Models/ScreenData";

interface ScreenListProps {
    w?: string;
    h?: string;
    onScreenChange?: (isConnected: boolean) => void;
}

function ScreenList(props: ScreenListProps) {
    const [screens, setScreens] = useState([] as ScreenData[]);
    const [code, setCode] = useState(undefined);

    useEffect(() => {
        socket.connect();

        function onCode(data: any) {
            setCode(data.code);
        }

        function onScreen(data: { screens: ScreenData[] }) {
            if (props.onScreenChange)
                props.onScreenChange(data.screens.length > 0);
            data.screens.forEach((screen: ScreenData) => {
                if (!screen.settings) {
                    socket.emit(
                        "screenSettings",
                        new ScreenSettings(screen.socket)
                    );
                }
            });
            setScreens(data.screens);
        }

        function onDisconnect() {
            setCode(undefined);
        }

        socket.on("code", onCode);
        socket.on("screen", onScreen);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("code", onCode);
            socket.off("screen", onScreen);
            socket.off("disconnect", onDisconnect);
            socket.disconnect();
        };
    }, []);

    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2}>
            <Flex alignContent="center" justifyContent="center">
                <Center>
                    <Heading as="h4" size="md">
                        Screens
                    </Heading>
                </Center>
                <Spacer />
                {code ? (
                    <>
                        <CopyInput value={code} />
                        <IconButton
                            ml="2"
                            aria-label="OpenScreen"
                            icon={<ExternalLinkIcon></ExternalLinkIcon>}
                            onClick={() => {
                                window.open(`/screen/${code}`, "_blank");
                            }}
                        ></IconButton>
                    </>
                ) : (
                    <Center mx="2rem" mt="1">
                        <Spinner></Spinner>
                    </Center>
                )}
            </Flex>
            <Box
                h={`calc(100% - 2rem)`}
                border="1px"
                borderColor="rgba(255,255,255,0.1)"
                borderRadius={5}
                mt="1rem"
            >
                <Box h="100%" w="100%" overflowY="scroll" overflowX="hidden">
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
                            <Tbody>
                                {screens.map((s: ScreenData) =>
                                    s.settings === null ? (
                                        <Tr key={s.socket}>
                                            <Td>
                                                <Center>
                                                    <Spinner></Spinner>
                                                </Center>
                                            </Td>
                                        </Tr>
                                    ) : (
                                        <ScreenListElement
                                            data={s as ScreenDataNotNull}
                                        />
                                    )
                                )}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default ScreenList;

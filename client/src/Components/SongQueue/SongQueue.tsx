import { useState } from "react";
import { SongQueueControls } from "./SongQueueControls";
import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Heading,
    Table,
    Tbody,
} from "@chakra-ui/react";

interface SongQueueProps {
    w?: string;
    h?: string;
}

function SongQueue(props: SongQueueProps) {
    const [queue, setQueue] = useState([]);
    const [selected, setSelected] = useState(null);

    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2}>
            <Heading as="h4" size="md">
                Queue
            </Heading>
            <Box
                h={`calc(100% - 5rem)`}
                border="1px"
                borderColor="rgba(255,255,255,0.1)"
                borderRadius={5}
                mt="1rem"
            >
                <Box h="100%" w="100%" overflowY="scroll">
                    {queue.length == 0 ? (
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
                                Add song to queue
                            </Alert>
                        </Center>
                    ) : (
                        <Table>
                            <Tbody></Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
            <SongQueueControls isDisabled={selected == null} />
        </Box>
    );
}

export default SongQueue;

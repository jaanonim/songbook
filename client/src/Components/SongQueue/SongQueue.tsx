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
import { useDrop } from "react-dnd";
import Song from "../../Models/Song";
import SongTableElementSmall from "../SongTableElementSmall";

interface SongQueueProps {
    w?: string;
    h?: string;
}

interface QueueElement {
    id: number;
    song: Song;
}

function SongQueue(props: SongQueueProps) {
    const [queue, setQueue] = useState<QueueElement[]>([]);
    const [selected, setSelected] = useState<null | number>(null);
    const [highlight, drop] = useDrop<Song, void, boolean>({
        accept: "Song",
        drop: (song: Song) => {
            setQueue((q) => [
                ...q,
                {
                    id: q.reduce((p, c) => (p < c.id ? c.id : p), 0) + 1,
                    song,
                },
            ]);
        },
        collect: (monitor) => monitor.isOver() && monitor.canDrop(),
    });

    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2} ref={drop}>
            <Heading as="h4" size="md">
                Queue
            </Heading>
            <Box
                h={`calc(100% - 5rem)`}
                borderWidth={highlight ? "3px" : "1px"}
                padding={highlight ? "0" : "2px"}
                borderStyle={highlight ? "dashed" : "solid"}
                borderColor={highlight ? "blue.300" : "rgba(255,255,255,0.1)"}
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
                            <Tbody>
                                {queue.map((ele) => (
                                    <SongTableElementSmall
                                        song={ele.song}
                                        selected={ele.id == selected}
                                        onSelect={() => {
                                            setSelected((s) =>
                                                ele.id == s ? null : ele.id
                                            );
                                        }}
                                    ></SongTableElementSmall>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
            <SongQueueControls
                isDisabled={selected == null}
                onDelete={() => {
                    setSelected(null);
                    setQueue((q) => q.filter((e) => e.id !== selected));
                }}
            />
        </Box>
    );
}

export default SongQueue;

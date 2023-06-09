import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Flex,
    Heading,
    Spacer,
    Table,
    Tbody,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import Song from "../../Models/Song";
import { SongQueueControls } from "./SongQueueControls";
import SongQueueElement from "./SongQueueElement";
import update from "immutability-helper";

interface SongQueueProps {
    w?: string;
    h?: string;
}

export interface QueueElement {
    id: number;
    song: Song;
}

function SongQueue(props: SongQueueProps) {
    const [queue, setQueue] = useState<QueueElement[]>([]);
    const [selected, setSelected] = useState<null | number>(null);
    const [highlighted, setHighlighted] = useState<null | number>(null);
    const [highlight, drop] = useDrop<Song, void, boolean>({
        accept: "Song",
        drop: (song: Song) => {
            setQueue((q) => {
                const id = q.reduce((p, c) => (p < c.id ? c.id : p), 0) + 1;
                return [
                    ...q,
                    {
                        id,
                        song,
                    },
                ];
            });
        },
        collect: (monitor) => monitor.isOver() && monitor.canDrop(),
    });
    const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
        setQueue((p: QueueElement[]) =>
            update(p, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, p[dragIndex] as QueueElement],
                ],
            })
        );
    }, []);

    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2} ref={drop}>
            <Flex>
                <Center>
                    <Heading as="h4" size="md">
                        Queue
                    </Heading>
                </Center>
                <Spacer></Spacer>
                <SongQueueControls
                    isDisabled={selected === null}
                    onDelete={() => {
                        setSelected(null);
                        setQueue((q) => q.filter((e) => e.id !== selected));
                        return false;
                    }}
                    onSelect={() => {
                        setHighlighted(selected);
                    }}
                />
            </Flex>
            <Box
                h={`calc(100% - 2.5rem)`}
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
                                {queue.map((ele, i) => (
                                    <SongQueueElement
                                        key={ele.id}
                                        element={ele}
                                        index={i}
                                        selected={ele.id === selected}
                                        highlighted={ele.id === highlighted}
                                        onClick={() => {
                                            setSelected((s) =>
                                                ele.id == s ? null : ele.id
                                            );
                                        }}
                                        onDoubleClick={() => {
                                            setHighlighted((s) =>
                                                ele.id == s ? null : ele.id
                                            );
                                        }}
                                        moveElement={moveElement}
                                    ></SongQueueElement>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default SongQueue;

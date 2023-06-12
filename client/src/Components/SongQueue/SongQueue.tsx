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
import {
    Ref,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { useDrop } from "react-dnd";
import Song from "../../Models/Song";
import { SongQueueControls } from "./SongQueueControls";
import SongQueueElement from "./SongQueueElement";
import update from "immutability-helper";

interface SongQueueProps {
    w?: string;
    h?: string;
    onSongHighlighted?: (s: Song | null) => void;
}

export interface QueueElement {
    id: number;
    song: Song;
}

export interface SongQueueRef {
    deleteElement: (id: number | null) => void;
    setHighlighted: (id: number | null) => void;
    addSong: (song: Song, callback?: (id: number) => void) => void;
}

function SongQueue(props: SongQueueProps, ref: Ref<unknown> | undefined) {
    const [queue, setQueue] = useState<QueueElement[]>([]);
    const [selected, setSelected] = useState<null | number>(null);
    const [highlighted, setHighlighted] = useState<null | number>(null);

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

    const deleteElement = useCallback((id: number | null) => {
        setSelected((c) => (c === id ? null : c));
        setHighlighted((c) => (c === id ? null : c));
        setQueue((q) => q.filter((e) => e.id !== id));
    }, []);

    const addSong = useCallback((song: Song, callback?: (id: number) => {}) => {
        setQueue((q) => {
            const id = q.reduce((p, c) => (p < c.id ? c.id : p), 0) + 1;
            if (callback) callback(id);
            return [
                ...q,
                {
                    id,
                    song,
                },
            ];
        });
    }, []);

    useEffect(() => {
        const song = queue.find((ele) => ele.id === highlighted)?.song;
        if (props.onSongHighlighted)
            props.onSongHighlighted(song ? song : null);
    }, [highlighted]);

    const [{ canDrop, isOver }, drop] = useDrop<
        Song,
        void,
        { [key: string]: boolean }
    >({
        accept: "Song",
        drop: (song: Song) => {
            addSong(song);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    useImperativeHandle(
        ref,
        () => ({
            deleteElement,
            setHighlighted,
            addSong,
        }),
        []
    );

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
                        deleteElement(selected);
                        return false;
                    }}
                    onSelect={() => {
                        setHighlighted(selected);
                    }}
                />
            </Flex>
            <Box
                h={`calc(100% - 2.5rem)`}
                borderWidth={canDrop ? "3px" : "1px"}
                padding={canDrop ? "0" : "2px"}
                borderStyle={canDrop ? "dashed" : "solid"}
                borderColor={canDrop ? "blue.300" : "rgba(255,255,255,0.1)"}
                borderRadius={5}
                backgroundColor={
                    canDrop && isOver ? "rgba(99, 179, 237,0.1)" : undefined
                }
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

export default forwardRef<SongQueueRef, SongQueueProps>(SongQueue);

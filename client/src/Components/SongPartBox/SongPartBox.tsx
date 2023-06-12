import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    Spacer,
    Text,
} from "@chakra-ui/react";
import type { Identifier, XYCoord } from "dnd-core";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { parseCP } from "simplechordpro";
import useUpdateSong from "../../Hooks/useUpdateSong";
import Song from "../../Models/Song";
import SongPart from "../../Models/SongPart";
import { firstUpper } from "../../Utilities/text";
import DeleteButton from "../DeleteButton";
import AddSongPart from "../UpdateSongPart";
import "./SongPartBox.css";

interface SongPartBoxProps {
    part: SongPart;
    song: Song;
    parts: SongPart[];
    preview?: boolean;
    selected: boolean;
    index: number;
    movePart: (dragIndex: number, hoverIndex: number) => void;
    onClick?: () => void;
}

interface Item {
    id: number;
    index: number;
}

function SongPartBox(props: SongPartBoxProps) {
    const update = useUpdateSong(props.song.title);
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        Item,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "SongPartBox",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: Item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            props.movePart(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        drop: (_item, _monitor) => {
            update.mutate({
                id: props.song._id,
                song: {
                    parts: props.parts.map((ele, i) => ({ ...ele, id: i })),
                },
            });
        },
    });

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: "SongPartBox",
        item: () => {
            return { index: props.index, id: props.part.id };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    useEffect(() => {
        if (props.selected) {
            ref.current?.scrollIntoView();
        }
    }, [ref, props.selected]);

    const opacity = isDragging ? 0.4 : 1;

    drop(ref);
    dragPreview(ref);
    return (
        <Container
            ref={ref}
            border={props.selected ? "4px" : "1px"}
            padding={
                props.selected
                    ? "calc(var(--chakra-space-4) - 3px)"
                    : "var(--chakra-space-4)"
            }
            borderRadius={props.selected ? "8" : "5"}
            borderColor={props.selected ? "blue.300" : undefined}
            mt="4"
            mb="4"
            style={{ opacity }}
            data-handler-id={handlerId}
            className="draggable"
            onClick={props.onClick}
            cursor={props.onClick ? "pointer" : undefined}
        >
            <Flex justify="center" mt="2" mb="2">
                <Box p="2">
                    <Heading as="h3" size="sm">
                        {firstUpper(props.part.type)}
                    </Heading>
                </Box>
                <Spacer />
                {props.preview ? null : (
                    <Box>
                        <AddSongPart song={props.song} part={props.part}>
                            <EditIcon />
                        </AddSongPart>
                        <DeleteButton
                            onClick={() => {
                                update.mutate({
                                    id: props.song._id,
                                    song: {
                                        parts: props.song.parts.filter(
                                            (part) => part.id !== props.part.id
                                        ),
                                    },
                                });
                                return true;
                            }}
                        />
                        <span ref={drag}>
                            <DragHandleIcon
                                ml="4"
                                cursor="move"
                            ></DragHandleIcon>
                        </span>
                    </Box>
                )}
            </Flex>
            <Divider />
            <Text mt="2" mb="2" as="div">
                <pre>{parseCP(props.part.text)}</pre>
            </Text>
        </Container>
    );
}

export default SongPartBox;

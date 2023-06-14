import { Box } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import Song from "../../Models/Song";
import { QueueElementDraggable } from "../SongQueue/SongQueueElement";
import DragTypes from "../../Models/DragTypes";

interface CurrentSongDropProps {
    onSongDragged: (song: Song) => void;
    onQueueElement: (element: QueueElementDraggable) => void;
}

function CurrentSongDrop(props: CurrentSongDropProps) {
    const [{ canDrop, isOver }, drop] = useDrop<
        Song | QueueElementDraggable,
        void,
        { [key: string]: boolean }
    >({
        accept: [DragTypes.SongTableElement, DragTypes.QueueElement],
        drop: (item: Song | QueueElementDraggable) => {
            if (item instanceof Song) props.onSongDragged(item);
            else props.onQueueElement(item);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    return (
        <Box
            ref={drop}
            position="absolute"
            top={0}
            left={0}
            zIndex="100"
            width="100%"
            height="calc(100vh - 1rem)"
            marginY="0.5rem"
            borderWidth={canDrop ? "3px" : undefined}
            borderStyle={canDrop ? "dashed" : undefined}
            borderColor={canDrop ? "blue.300" : undefined}
            borderRadius={5}
            backgroundColor={
                canDrop && isOver ? "rgba(99, 179, 237,0.1)" : undefined
            }
            pointerEvents={canDrop ? "all" : "none"}
            display={canDrop ? "block" : "none"}
        ></Box>
    );
}

export default CurrentSongDrop;

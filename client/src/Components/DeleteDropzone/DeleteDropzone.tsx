import { Box } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { QueueElementDraggable } from "../SongQueue/SongQueueElement";
import DragTypes from "../../Models/DragTypes";

interface DeleteDropzoneProps {
    onQueueElement: (element: QueueElementDraggable) => void;
}

function DeleteDropzone(props: DeleteDropzoneProps) {
    const [{ canDrop, isOver }, drop] = useDrop<
        QueueElementDraggable,
        void,
        { [key: string]: boolean }
    >({
        accept: [DragTypes.QueueElement],
        drop: (item: QueueElementDraggable) => {
            props.onQueueElement(item);
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
            height="100%"
            borderWidth={canDrop ? "3px" : undefined}
            borderStyle={canDrop ? "dashed" : undefined}
            borderColor={canDrop ? "red.500" : undefined}
            borderRadius={5}
            backgroundColor={
                canDrop && isOver ? "rgba(229, 62, 62,0.1)" : undefined
            }
            pointerEvents={canDrop ? "all" : "none"}
            display={canDrop ? "block" : "none"}
        ></Box>
    );
}

export default DeleteDropzone;

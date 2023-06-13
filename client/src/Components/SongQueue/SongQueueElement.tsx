import { Td, Tr } from "@chakra-ui/react";
import TagList from "../TagList";
import Song from "../../Models/Song";
import { QueueElement } from "./SongQueue";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { useEffect, useRef } from "react";

interface SongQueueElementProps {
    element: QueueElement;
    selected: boolean;
    index: number;
    highlighted: boolean;
    onDelete?: (song: Song) => void;
    onClick?: () => void;
    onDoubleClick?: () => void;
    moveElement: (dragIndex: number, hoverIndex: number) => void;
}

export interface QueueElementDraggable {
    index: number;
    id: number;
}

function SongQueueElement(props: SongQueueElementProps) {
    const ref = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if (props.highlighted) {
            ref.current?.scrollIntoView();
        }
    }, [ref, props.highlighted]);

    const [{ handlerId }, drop] = useDrop<
        QueueElementDraggable,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "SongElement",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: QueueElementDraggable, monitor) {
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

            props.moveElement(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "SongElement",
        item: () => {
            return { index: props.index, id: props.element.id };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(ref);
    drop(ref);

    return (
        <Tr
            ref={ref}
            opacity={opacity}
            className="noselect"
            backgroundColor={
                props.selected ? "var(--chakra-colors-blue-800)" : "none"
            }
            key={props.element.song._id}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            _hover={
                props.selected
                    ? {}
                    : {
                          backgroundColor: "rgba(0,0,0,0.5)",
                      }
            }
            cursor="pointer"
            h="auto"
            data-handler-id={handlerId}
        >
            <Td
                textDecoration={props.highlighted ? "underline" : "none"}
                fontWeight={props.highlighted ? "bold" : "normal"}
            >
                {props.element.song.title} ({props.element.song.author})
            </Td>
            <Td w="35%">
                <TagList tags={props.element.song.tags} editable={false} />
            </Td>
        </Tr>
    );
}

export default SongQueueElement;

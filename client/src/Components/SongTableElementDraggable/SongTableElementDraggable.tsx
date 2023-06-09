import { Td, Tr } from "@chakra-ui/react";
import Song from "../../Models/Song";
import TagList from "../TagList";
import { useDrag } from "react-dnd";

interface SongTableElementDraggableProps {
    song: Song;
    selected: boolean;
    onDelete?: (song: Song) => void;
    onSelect?: (e: any) => void;
}

function SongTableElementDraggable(props: SongTableElementDraggableProps) {
    const [{ isDragging }, drag] = useDrag({
        type: "Song",
        item: () => {
            return props.song;
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Tr
            ref={drag}
            className="noselect"
            opacity={isDragging ? 0.4 : 1}
            backgroundColor={
                isDragging
                    ? "var(--chakra-colors-chakra-body-bg)"
                    : props.selected
                    ? "var(--chakra-colors-blue-800)"
                    : "none"
            }
            key={props.song._id}
            onClick={(e: any) => {
                if (props.onSelect) props.onSelect(e);
            }}
            _hover={
                props.selected
                    ? {}
                    : {
                          backgroundColor: "rgba(0,0,0,0.5)",
                      }
            }
            cursor="pointer"
            h="auto"
        >
            <Td>
                {props.song.title} ({props.song.author})
            </Td>
            <Td w="40%">
                <TagList tags={props.song.tags} editable={false} />
            </Td>
        </Tr>
    );
}

export default SongTableElementDraggable;

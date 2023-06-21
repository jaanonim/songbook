import { IconButton, Td, Tr, useToast } from "@chakra-ui/react";
import Song from "../../Models/Song";
import TagList from "../TagList";
import { useDrag } from "react-dnd";
import DragTypes from "../../Models/DragTypes";
import { AddIcon } from "@chakra-ui/icons";

interface SongTableElementDraggableProps {
    song: Song;
    selected: boolean;
    onDelete?: (song: Song) => void;
    onSelect?: (e: any) => void;
    onAdd?: (song: Song) => void;
}

function SongTableElementDraggable(props: SongTableElementDraggableProps) {
    const toast = useToast();
    const [{ isDragging }, drag] = useDrag({
        type: DragTypes.SongTableElement,
        item: () => {
            return props.song;
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <Tr
            width="100%"
            ref={drag}
            className="noselect"
            opacity={isDragging ? 0.4 : 1}
            backgroundColor={
                isDragging ? "var(--chakra-colors-chakra-body-bg)" : "none"
            }
            borderWidth={props.selected ? "2px" : 0}
            borderColor={"blue.300"}
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
            <Td px="2" py="3">
                {props.song.title} ({props.song.author})
            </Td>
            <Td w="40%" px="2" py="3">
                <TagList tags={props.song.tags} editable={false} />
            </Td>
            <Td px="2" py="3">
                <IconButton
                    onClick={(e) => {
                        if (props.onAdd) props.onAdd(props.song);
                        toast({
                            title: `${props.song.title} added to queue`,
                            status: "success",
                        });
                        e.stopPropagation();
                    }}
                    aria-label={"add to queue"}
                    size="sm"
                    icon={<AddIcon></AddIcon>}
                />
            </Td>
        </Tr>
    );
}

export default SongTableElementDraggable;

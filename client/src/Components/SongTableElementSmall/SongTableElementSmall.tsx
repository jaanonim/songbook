import { Td, Tr } from "@chakra-ui/react";
import Song from "../../Models/Song";
import TagList from "../TagList";

interface SongTableElementSmallProps {
    song: Song;
    selected: boolean;
    onDelete?: (song: Song) => void;
    onSelect?: (e: any) => void;
}

function SongTableElementSmall(props: SongTableElementSmallProps) {
    return (
        <Tr
            className="noselect"
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
        </Tr>
    );
}

export default SongTableElementSmall;

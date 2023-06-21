import { Td, Tr } from "@chakra-ui/react";
import Song from "../../Models/Song";
import DeleteSongButton from "../DeleteSongButton";
import TagList from "../SongTagList";

interface SongTableElementProps {
    song: Song;
    selected: boolean;
    onDelete?: (song: Song) => void;
    onSelect?: (e: any) => void;
}

function SongTableElement(props: SongTableElementProps) {
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
        >
            <Td px="2" py="3">
                {props.song.title} ({props.song.author})
            </Td>
            <Td px="2" py="3">
                <TagList song={props.song} />
            </Td>
            <Td px="2" py="3">
                <DeleteSongButton onDelete={props.onDelete} song={props.song} />
            </Td>
        </Tr>
    );
}

export default SongTableElement;

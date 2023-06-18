import { Box } from "@chakra-ui/react";
import DeleteDropzone from "../../Components/DeleteDropzone/DeleteDropzone";
import SongTable from "../../Components/SongTable";
import SongTableElementDraggable from "../../Components/SongTableElementDraggable";
import Song from "../../Models/Song";

interface PresentSongListProps {
    setPreview: (id: string | null) => void;
    deleteElement?: (id: number) => void;
    onAdd?: (song: Song) => void;
    w: string;
    h: string;
    visible: boolean;
}

export function PresentSongList(props: PresentSongListProps) {
    return (
        <Box
            w={props.w}
            position={"relative"}
            h={props.h}
            display={props.visible ? undefined : "none"}
        >
            <SongTable
                w="calc(100% - 2rem)"
                h="100%"
                disableAdd={true}
                multiple={false}
                onSongUpdate={(s) => {
                    props.setPreview(s !== null ? s[0] : null);
                }}
                element={SongTableElementDraggable}
                onAdd={props.onAdd}
            />
            <DeleteDropzone
                onQueueElement={(item) => {
                    if (props.deleteElement) props.deleteElement(item.id);
                }}
            ></DeleteDropzone>
        </Box>
    );
}

import { Box } from "@chakra-ui/react";
import DeleteDropzone from "../../Components/DeleteDropzone/DeleteDropzone";
import SongTable from "../../Components/SongTable";
import SongTableElementDraggable from "../../Components/SongTableElementDraggable";
import { SongQueueRef } from "../../Components/SongQueue/SongQueue";
import { Ref } from "react";

interface PresentSongListProps {
    setPreview: (id: string | null) => void;
    deleteElement?: (id: number) => void;
    songQueue: Ref<SongQueueRef>;
}

export function PresentSongList(props: PresentSongListProps) {
    return (
        <Box w="25%" position={"relative"}>
            <SongTable
                w="calc(100% - 2rem)"
                disableAdd={true}
                multiple={false}
                onSongUpdate={(s) => {
                    props.setPreview(s !== null ? s[0] : null);
                }}
                element={SongTableElementDraggable}
            />
            <DeleteDropzone
                onQueueElement={(item) => {
                    if (props.deleteElement) props.deleteElement(item.id);
                }}
            ></DeleteDropzone>
        </Box>
    );
}

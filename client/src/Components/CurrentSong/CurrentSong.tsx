import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Song from "../../Models/Song";
import { Controls } from "../Controls/Controls";
import SongEdit from "../SongEdit";
import { QueueElementDraggable } from "../SongQueue/SongQueueElement";
import CurrentSongDrop from "./CurrentSongDrop";

interface CurrentSongProps {
    song: Song | null;
    onSongDragged: (song: Song) => void;
    onQueueElement: (element: QueueElementDraggable) => void;
}

function CurrentSong(props: CurrentSongProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <Box
            width="30%"
            padding="1rem"
            height="calc(100vh - 2rem)"
            position="relative"
        >
            <CurrentSongDrop
                onQueueElement={props.onQueueElement}
                onSongDragged={props.onSongDragged}
            ></CurrentSongDrop>
            <Box
                className="preview_box"
                height="30%"
                marginTop="0.5rem"
                marginBottom="0.5rem"
                backgroundColor="black"
            >
                <Box className="preview_box_screen" border="1px solid #fff">
                    <p>Preview</p>
                </Box>
            </Box>
            <Box h="30%" height="calc(70% - 2rem)" padding="0.5rem">
                <Controls
                    onNextSlide={() => {
                        if (props.song == null) return;
                        let idx = props.song.parts.findIndex(
                            (part) => part.id === selected
                        );
                        if (idx + 1 >= props.song.parts.length) idx = -1;
                        setSelected(idx + 1);
                    }}
                    onPreviousSlide={() => {
                        if (props.song == null) return;
                        let idx = props.song.parts.findIndex(
                            (part) => part.id === selected
                        );
                        if (idx - 1 < 0) idx = props.song.parts.length;
                        setSelected(idx - 1);
                    }}
                    disabled={props.song === null}
                />
                <SongEdit
                    selected={selected}
                    onSelect={(id) => {
                        setSelected(id);
                    }}
                    headingSize="l"
                    w="calc(100% - 2rem)"
                    h="calc(70vh - 3rem)"
                    key={props.song?._id}
                    id={props.song?._id}
                    preview={true}
                ></SongEdit>
            </Box>
        </Box>
    );
}

export default CurrentSong;

import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Song from "../../Models/Song";
import { socket } from "../../Services/socket";
import { Controls } from "../Controls/Controls";
import SongEdit from "../SongEdit";
import { QueueElementDraggable } from "../SongQueue/SongQueueElement";
import CurrentSongDrop from "./CurrentSongDrop";
import { CurrentSongPreview } from "./CurrentSongPreview";

interface CurrentSongProps {
    song: Song | null;
    onSongDragged: (song: Song) => void;
    onQueueElement: (element: QueueElementDraggable) => void;
    onNextSong?: () => void;
    onPreviousSong?: () => void;
    isScreen: boolean;
}

function CurrentSong(props: CurrentSongProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [isHidden, setIsHidden] = useState(false);
    useEffect(() => {
        if (props.song) setSelected(props.song.parts[0].id);
        else setSelected(null);
    }, [props.song]);

    const getData = useCallback(() => {
        if (!props.song) return null;

        const part = props.song.parts.find((p) => p.id === selected);
        if (!part) return null;

        return { part, isHidden };
    }, [props.song, selected, isHidden]);

    useEffect(() => {
        if (socket.connected) {
            socket.emit("show", {
                data: getData(),
            });
        }
    }, [getData]);

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
            <CurrentSongPreview isScreen={props.isScreen} data={getData()} />
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
                    onNextSong={props.onNextSong}
                    onPreviousSong={props.onPreviousSong}
                    onHide={() => {
                        setIsHidden(true);
                    }}
                    onShow={() => {
                        setIsHidden(false);
                    }}
                    isHidden={isHidden}
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

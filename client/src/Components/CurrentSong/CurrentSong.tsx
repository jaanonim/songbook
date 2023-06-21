import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Song from "../../Models/Song";
import { socket } from "../../Services/socket";
import { SongEditNoApi } from "../SongEdit";
import { QueueElementDraggable } from "../SongQueue/SongQueueElement";
import CurrentSongDrop from "./CurrentSongDrop";
import { CurrentSongPreview } from "./CurrentSongPreview";
import useKey from "../../Hooks/useKey";
import ScreenData from "../../Models/ScreenData";
import Controls from "../Controls";
import PartType from "../../Models/PartTypes";

interface CurrentSongProps {
    song: Song | null;
    onSongDragged: (song: Song) => void;
    onQueueElement: (element: QueueElementDraggable) => void;
    onNextSong?: () => void;
    onPreviousSong?: () => void;
    screen: null | ScreenData;
    w: string;
    h: string;
    visible: boolean;
}

function CurrentSong(props: CurrentSongProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [isHidden, setIsHidden] = useState(false);
    const [isBlack, setIsBlack] = useState(false);
    useEffect(() => {
        if (props.song) setSelected(props.song.parts[0].id);
        else setSelected(null);
    }, [props.song]);

    const getData = useCallback(() => {
        if (!props.song) return null;

        const part = props.song.parts.find((p) => p.id === selected);
        if (!part) return null;

        return { part, isHidden, isBlack };
    }, [props.song, selected, isHidden, isBlack]);

    useEffect(() => {
        if (socket.connected) {
            socket.emit("show", {
                data: getData(),
            });
        }
    }, [getData]);

    const nextSlide = useCallback(() => {
        if (props.song == null) return;
        let idx = props.song.parts.findIndex((part) => part.id === selected);
        if (idx + 1 >= props.song.parts.length) idx = -1;
        setSelected(idx + 1);
    }, [props.song, selected]);

    const previousSlide = useCallback(() => {
        if (props.song == null) return;
        let idx = props.song.parts.findIndex((part) => part.id === selected);
        if (idx - 1 < 0) idx = props.song.parts.length;
        setSelected(idx - 1);
    }, [props.song, selected]);

    const nextType = useCallback(
        (type: PartType) => {
            if (props.song == null) return;
            let idx = props.song.parts.findIndex(
                (part) => part.id === selected
            );

            let i = idx;
            do {
                i += 1;
                if (i >= props.song.parts.length) i = 0;
                if (i === idx) {
                    return;
                }
            } while (props.song.parts[i].type !== type);
            setSelected(i);
        },
        [props.song, selected]
    );

    useKey(
        (e) => {
            if (props.song === null) return;
            if (e.key === "ArrowUp") {
                previousSlide();
                e.preventDefault();
            } else if (e.key === "ArrowDown") {
                nextSlide();
                e.preventDefault();
            } else if (e.key === ".") {
                setIsHidden((h) => !h);
            } else if (e.key === "/") {
                setIsBlack((b) => !b);
            } else if (e.key === "v") {
                nextType(PartType.VERSE);
            } else if (e.key === "c") {
                nextType(PartType.CHORUS);
            } else if (e.key === "b") {
                nextType(PartType.BRIDGE);
            }
        },
        [props.song, selected]
    );

    return (
        <Box
            width={props.w}
            padding="1rem"
            height={props.h}
            display={props.visible ? undefined : "none"}
            position="relative"
        >
            <CurrentSongDrop
                onQueueElement={props.onQueueElement}
                onSongDragged={props.onSongDragged}
            ></CurrentSongDrop>
            <CurrentSongPreview
                screen={props.screen}
                data={getData()}
                visible={props.visible}
            />
            <Box h="30%" height="calc(70%)" padding="0.5rem">
                <Controls
                    onNextSlide={nextSlide}
                    onPreviousSlide={previousSlide}
                    onNextSong={props.onNextSong}
                    onPreviousSong={props.onPreviousSong}
                    onHide={() => {
                        setIsHidden(true);
                    }}
                    onShow={() => {
                        setIsHidden(false);
                    }}
                    onBlackOn={() => {
                        setIsBlack(true);
                    }}
                    onBlackOff={() => {
                        setIsBlack(false);
                    }}
                    isHidden={isHidden}
                    isBlack={isBlack}
                    disabled={props.song === null}
                />
                <SongEditNoApi
                    selected={selected}
                    onSelect={(id) => {
                        setSelected(id);
                    }}
                    headingSize="l"
                    w="calc(100% - 2rem)"
                    h="calc(100% - 2.2rem)"
                    song={props.song}
                    preview={true}
                ></SongEditNoApi>
            </Box>
        </Box>
    );
}

export default CurrentSong;

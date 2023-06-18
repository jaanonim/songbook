import { Box, Divider } from "@chakra-ui/react";
import SongQueue from "../../Components/SongQueue";
import ScreenList from "../../Components/ScreenList";
import { Ref } from "react";
import { SongQueueRef } from "../../Components/SongQueue/SongQueue";
import Song from "../../Models/Song";
import ScreenData from "../../Models/ScreenData";

interface PresentQueueAndScreensProps {
    songQueue: Ref<SongQueueRef> | undefined;
    setSong: (song: Song | null) => void;
    setPreviewScreen: (data: ScreenData | null) => void;
    w: string;
    h: string;
    visible: boolean;
}

export function PresentQueueAndScreens(props: PresentQueueAndScreensProps) {
    return (
        <Box
            width={props.w}
            padding="1rem"
            height={props.h}
            display={props.visible ? undefined : "none"}
        >
            <SongQueue
                ref={props.songQueue}
                w="100%"
                h="calc(60% - 1.5rem)"
                onSongHighlighted={(s) => {
                    props.setSong(s);
                }}
            />
            <Divider padding="0.5rem" w="90%" margin="auto" />
            <ScreenList
                w="100%"
                h="calc(40% - 1.5rem)"
                onScreenChange={(screen) => {
                    props.setPreviewScreen(screen);
                }}
            />
        </Box>
    );
}

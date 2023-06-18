import { Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { SongQueueRef } from "../../Components/SongQueue/SongQueue";
import useKey from "../../Hooks/useKey";
import ScreenData from "../../Models/ScreenData";
import Song from "../../Models/Song";
import "./Present.css";
import { PresentQueueAndScreens } from "./PresentQueueAndScreens";
import { PresentScreenPreview } from "./PresentScreenPreview";
import { PresentSongList } from "./PresentSongList";
import { PresentSongPreview } from "./PresentSongPreview";

function Present() {
    const [preview, setPreview] = useState<string | null>(null);
    const [previewScreen, setPreviewScreen] = useState<null | ScreenData>(null);
    const [song, setSong] = useState<Song | null>(null);
    const songQueue = useRef<SongQueueRef>(null);
    useKey((e: any) => {
        if (e.key === "ArrowRight") {
            songQueue.current?.nextSong();
        } else if (e.key === "ArrowLeft") {
            songQueue.current?.previousSong();
        }
    });

    const [moreThen1440] = useMediaQuery("(min-width: 1440px)");

    return (
        <>
            <Flex>
                <PresentSongList
                    setPreview={setPreview}
                    songQueue={songQueue}
                    deleteElement={songQueue.current?.deleteElement}
                />
                <PresentSongPreview preview={preview} />

                <Divider h="95vh" margin="auto" orientation="vertical" />

                <PresentScreenPreview
                    song={song}
                    previewScreen={previewScreen}
                    previousSong={songQueue.current?.previousSong}
                    nextSong={songQueue.current?.nextSong}
                    addSong={songQueue.current?.addSong}
                    setHighlighted={songQueue.current?.setHighlighted}
                />

                <PresentQueueAndScreens
                    songQueue={songQueue}
                    setSong={setSong}
                    setPreviewScreen={setPreviewScreen}
                />
            </Flex>
        </>
    );
}

export default Present;

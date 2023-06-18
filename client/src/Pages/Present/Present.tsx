import { Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SongQueueRef } from "../../Components/SongQueue/SongQueue";
import useKey from "../../Hooks/useKey";
import ScreenData from "../../Models/ScreenData";
import Song from "../../Models/Song";
import "./Present.css";
import { PresentQueueAndScreens } from "./PresentQueueAndScreens";
import { PresentScreenPreview } from "./PresentScreenPreview";
import { PresentSongList } from "./PresentSongList";
import { PresentSongPreview } from "./PresentSongPreview";
import BottomNavBar from "../../Components/BottomNavBar/BottomNavBar";
import {
    MdAddToQueue,
    MdList,
    MdOutlineSlideshow,
    MdPreview,
} from "react-icons/md";

function Present() {
    const [preview, setPreview] = useState<string | null>(null);
    const [previewScreen, setPreviewScreen] = useState<null | ScreenData>(null);
    const [song, setSong] = useState<Song | null>(null);
    const songQueue = useRef<SongQueueRef>(null);
    const [tab, setTab] = useState(0);
    useKey((e: any) => {
        if (e.key === "ArrowRight") {
            songQueue.current?.nextSong();
        } else if (e.key === "ArrowLeft") {
            songQueue.current?.previousSong();
        }
    });

    const [moreThen1440, moreThen780] = useMediaQuery([
        "(min-width: 1440px)",
        "(min-width: 780px)",
    ]);

    useEffect(() => {
        if (moreThen780) {
            if (tab > 1) {
                setTab(1);
            }
        }
    }, [moreThen1440, moreThen780]);

    const h = useMemo(
        () => (moreThen1440 ? "100vh" : "calc(100vh - 4rem)"),
        [moreThen1440]
    );
    const bottomNavElements = useMemo(() => {
        if (moreThen780)
            return [
                {
                    icon: MdPreview,
                    name: "Preview",
                },
                {
                    icon: MdOutlineSlideshow,
                    name: "Show",
                },
            ];
        else
            return [
                {
                    icon: MdList,
                    name: "Songs",
                },
                {
                    icon: MdPreview,
                    name: "Preview",
                },
                {
                    icon: MdOutlineSlideshow,
                    name: "Show",
                },
                {
                    icon: MdAddToQueue,
                    name: "Queue",
                },
            ];
    }, [moreThen780]);

    return (
        <>
            <Flex>
                <PresentSongList
                    h={h}
                    w={moreThen1440 ? "25%" : moreThen780 ? "50%" : "100%"}
                    visible={moreThen1440 || tab === 0}
                    setPreview={setPreview}
                    deleteElement={songQueue.current?.deleteElement}
                    onAdd={(s) => {
                        songQueue.current?.addSong(s);
                    }}
                />
                <PresentSongPreview
                    preview={preview}
                    visible={
                        moreThen1440 ||
                        (tab === 0 && moreThen780) ||
                        (!moreThen780 && tab === 1)
                    }
                    h={h}
                    w={moreThen1440 ? "25%" : moreThen780 ? "50%" : "100%"}
                />
                {moreThen1440 ? (
                    <Divider h="95vh" margin="auto" orientation="vertical" />
                ) : null}
                <PresentScreenPreview
                    visible={
                        moreThen1440 ||
                        (tab === 1 && moreThen780) ||
                        (!moreThen780 && tab === 2)
                    }
                    h={h}
                    w={moreThen1440 ? "30%" : moreThen780 ? "60%" : "100%"}
                    song={song}
                    previewScreen={previewScreen}
                    previousSong={songQueue.current?.previousSong}
                    nextSong={songQueue.current?.nextSong}
                    addSong={songQueue.current?.addSong}
                    setHighlighted={songQueue.current?.setHighlighted}
                />

                <PresentQueueAndScreens
                    visible={
                        moreThen1440 ||
                        (tab === 1 && moreThen780) ||
                        (!moreThen780 && tab === 3)
                    }
                    h={h}
                    w={moreThen1440 ? "20%" : moreThen780 ? "40%" : "100%"}
                    songQueue={songQueue}
                    setSong={setSong}
                    setPreviewScreen={setPreviewScreen}
                />
            </Flex>
            {moreThen1440 ? null : (
                <BottomNavBar
                    onChange={(value) => {
                        if (typeof value === "string")
                            throw Error("Bottom bar invalid value");
                        setTab(value);
                    }}
                    value={tab}
                    elements={bottomNavElements}
                ></BottomNavBar>
            )}
        </>
    );
}

export default Present;

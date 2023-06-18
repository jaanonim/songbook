import {
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import CurrentSong from "../../Components/CurrentSong";
import DeleteDropzone from "../../Components/DeleteDropzone/DeleteDropzone";
import ScreenList from "../../Components/ScreenList";
import { SongEdit } from "../../Components/SongEdit";
import SongQueue, { SongQueueRef } from "../../Components/SongQueue/SongQueue";
import SongTable from "../../Components/SongTable";
import SongTableElementDraggable from "../../Components/SongTableElementDraggable/SongTableElementDraggable";
import Song from "../../Models/Song";
import "./Present.css";
import useKey from "../../Hooks/useKey";
import ScreenData from "../../Models/ScreenData";
import { EditIcon } from "@chakra-ui/icons";

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

    return (
        <>
            <Flex>
                <Box w="25%" position={"relative"}>
                    <SongTable
                        w="calc(100% - 2rem)"
                        disableAdd={true}
                        multiple={false}
                        onSongUpdate={(s) => {
                            setPreview(s !== null ? s[0] : null);
                        }}
                        element={SongTableElementDraggable}
                    />
                    <DeleteDropzone
                        onQueueElement={(item) => {
                            songQueue.current?.deleteElement(item.id);
                        }}
                    ></DeleteDropzone>
                </Box>
                <Box w="25%" h="100vh">
                    <Stack position="relative">
                        <Heading as="h3" textAlign="center" margin="1.5rem">
                            Preview
                        </Heading>
                        {preview ? (
                            <IconButton
                                position="absolute"
                                top="1.75rem"
                                right="1rem"
                                size={"sm"}
                                aria-label="edit"
                                icon={<EditIcon></EditIcon>}
                                onClick={() => {
                                    window.open(
                                        `/manage/?id=${preview}`,
                                        "_blank"
                                    );
                                }}
                            ></IconButton>
                        ) : null}
                    </Stack>
                    <SongEdit
                        headingSize="l"
                        w="calc(100% - 2rem)"
                        h="calc(100vh - 4rem)"
                        id={preview ? preview : undefined}
                        preview={true}
                    ></SongEdit>
                </Box>

                <Divider h="95vh" margin="auto" orientation="vertical" />

                <CurrentSong
                    song={song}
                    screen={previewScreen}
                    onQueueElement={(item) => {
                        songQueue.current?.setHighlighted(item.id);
                    }}
                    onSongDragged={(song) => {
                        songQueue.current?.addSong(song, (id) => {
                            songQueue.current?.setHighlighted(id);
                        });
                    }}
                    onNextSong={() => {
                        songQueue.current?.nextSong();
                    }}
                    onPreviousSong={() => {
                        songQueue.current?.previousSong();
                    }}
                />

                <Box width="20%" padding="1rem" height="100vh">
                    <SongQueue
                        ref={songQueue}
                        w="100%"
                        h="calc(60% - 1.5rem)"
                        onSongHighlighted={(s) => {
                            setSong(s);
                        }}
                    />
                    <Divider padding="0.5rem" w="90%" margin="auto" />
                    <ScreenList
                        w="100%"
                        h="calc(40% - 1.5rem)"
                        onScreenChange={(screen) => {
                            setPreviewScreen(screen);
                        }}
                    />
                </Box>
            </Flex>
        </>
    );
}

export default Present;

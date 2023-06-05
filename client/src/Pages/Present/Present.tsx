import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ScreenList from "../../Components/ScreenList";
import SongEdit from "../../Components/SongEdit";
import SongQueue from "../../Components/SongQueue/SongQueue";
import SongTable from "../../Components/SongTable";
import SongTableElementSmall from "../../Components/SongTableElementSmall";
import Song from "../../Models/Song";
import { Controls } from "./../../Components/Controls/Controls";
import "./Present.css";

function Present() {
    const [song, setSong] = useState<Song[] | null>(null);

    return (
        <>
            <Flex>
                <SongTable
                    w="25%"
                    disableAdd={true}
                    multiple={true}
                    onSongUpdate={(s) => {
                        setSong(s !== null ? s : null);
                    }}
                    element={SongTableElementSmall}
                />
                <Box w="25%" h="100vh">
                    <Heading as="h3" textAlign="center" margin="1.5rem">
                        Preview
                    </Heading>
                    <SongEdit
                        headingSize="l"
                        w="calc(100% - 2rem)"
                        h="calc(100vh - 4rem)"
                        key={song?.at(-1)?._id}
                        id={song?.at(-1)?._id}
                        preview={true}
                    ></SongEdit>
                </Box>
                <Box width="30%" padding="1rem" height="calc(100vh - 2rem)">
                    <Box
                        className="preview_box"
                        height="30%"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                        backgroundColor="black"
                    >
                        <Box
                            className="preview_box_screen"
                            border="1px solid #fff"
                        >
                            <p>Preview</p>
                        </Box>
                    </Box>
                    <Box h="30%" height="calc(70% - 2rem)" padding="0.5rem">
                        <Controls />
                        <SongEdit
                            headingSize="l"
                            w="calc(100% - 2rem)"
                            h="calc(70vh - 3rem)"
                            key={song?.at(-1)?._id}
                            id={song?.at(-1)?._id}
                            preview={true}
                        ></SongEdit>
                    </Box>
                </Box>
                <Box width="20%" padding="1rem">
                    <SongQueue w="100%" h="calc(60% - 1.5rem)" />
                    <Divider padding={2} w="90%" margin="auto" />
                    <ScreenList w="100%" h="calc(40% - 1.5rem)" />
                </Box>
            </Flex>
        </>
    );
}

export default Present;

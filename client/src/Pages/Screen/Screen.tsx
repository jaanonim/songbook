import { Center, Container, Heading, IconButton, Text } from "@chakra-ui/react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useParams } from "react-router-dom";
import TopRightCorner from "../../Components/TopRightCorner/TopRightCorner";
import "./Screen.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useWindowFocus from "../../Hooks/useWindowFocus";
import CopyInput from "../../Components/CopyInput/CopyInput";
import TopLeftCorner from "../../Components/TopLeftCorner/TopLeftCorner";

function Screen() {
    const { code } = useParams();
    const fullscreenHandle = useFullScreenHandle();

    const isFocused = useWindowFocus();

    return (
        <FullScreen handle={fullscreenHandle}>
            <div id="container-screen">
                {isFocused ? (
                    <>
                        <TopLeftCorner>
                            <Heading as="h2" size="md" margin={1}>
                                Screen Name
                            </Heading>
                        </TopLeftCorner>
                        <TopRightCorner>
                            <CopyInput value={code as string}></CopyInput>
                            {fullscreenHandle.active ? (
                                <IconButton
                                    fontSize={25}
                                    aria-label="fullscreen"
                                    icon={<MdFullscreenExit />}
                                    onClick={fullscreenHandle.exit}
                                ></IconButton>
                            ) : (
                                <IconButton
                                    fontSize={25}
                                    aria-label="fullscreen"
                                    icon={<MdFullscreen />}
                                    onClick={fullscreenHandle.enter}
                                ></IconButton>
                            )}
                        </TopRightCorner>
                    </>
                ) : null}

                <Container as="main">
                    <Center></Center>
                </Container>
            </div>
        </FullScreen>
    );
}

export default Screen;

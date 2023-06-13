import { Box, Heading, IconButton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import CopyInput from "../../Components/CopyInput/CopyInput";
import ScreenView from "../../Components/ScreenView/ScreenView";
import TopLeftCorner from "../../Components/TopLeftCorner/TopLeftCorner";
import TopRightCorner from "../../Components/TopRightCorner/TopRightCorner";
import useWindowFocus from "../../Hooks/useWindowFocus";
import SongPart from "../../Models/SongPart";
import { getSocket } from "../../Services/socket";
import "./Screen.css";

function Screen() {
    const { code } = useParams();
    const fullscreenHandle = useFullScreenHandle();
    const isFocused = useWindowFocus();
    const toast = useToast();
    const navigate = useNavigate();
    const [data, setData] = useState<null | SongPart>(null);

    useEffect(() => {
        const socket = getSocket({
            code: code as string,
        });
        socket.connect();

        function onKick(data: any) {
            toast({
                title: data.message,
                status: "error",
            });
            navigate("/screen", { replace: true });
        }

        function onConnect() {
            toast({
                title: "Connected",
                status: "success",
            });
        }

        function onShow(obj: any) {
            setData(obj.data);
        }

        socket.on("kick", onKick);
        socket.on("connect", onConnect);
        socket.on("show", onShow);

        return () => {
            socket.off("kick", onKick);
            socket.off("connect", onConnect);
            socket.off("show", onShow);
            socket.disconnect();
        };
    }, []);

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

                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    w="100vw"
                    h="100vh"
                    fontSize="100vh"
                    pointerEvents={"none"}
                >
                    <ScreenView data={data} />
                </Box>
            </div>
        </FullScreen>
    );
}

export default Screen;

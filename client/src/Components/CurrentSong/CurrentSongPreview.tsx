import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../Services/socket";
import ScreenView from "../ScreenView";
import ShowData from "../../Models/ShowData";
import { useElementSize } from "usehooks-ts";
import ScreenData from "../../Models/ScreenData";
import ScreenSettings from "../../Models/ScreenSettings";

interface CurrentSongPreviewProps {
    data: null | ShowData;
    screen: null | ScreenData;
    visible: boolean;
}

export function CurrentSongPreview(props: CurrentSongPreviewProps) {
    const [ref, { width, height }] = useElementSize();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [aspectRatio, setAspectRatio] = useState(1);

    const updateSize = useCallback(() => {
        const calculateDimensions = (aspectRatio: number) => {
            const parentH = height ? height : 0;
            const parentW = width ? width : 0;
            const w = parentH * aspectRatio;
            const h = parentW / aspectRatio;

            if (parentW < w) return { width: parentW, height: h };
            return { width: w, height: parentH };
        };

        setDimensions(calculateDimensions(aspectRatio));
    }, [aspectRatio, width, height]);

    useEffect(() => {
        function onScreenInfo(data: any) {
            if (!data) return;
            setAspectRatio(data.width / data.height);
        }

        socket.on("screenInfo", onScreenInfo);

        return () => {
            socket.off("screenInfo", onScreenInfo);
        };
    }, [width, height]);

    useEffect(() => {
        updateSize();
    }, [width, height, aspectRatio, props.visible]);

    return (
        <Box
            ref={ref}
            className="preview_box"
            height="30%"
            marginTop="0.5rem"
            marginBottom="0.5rem"
            backgroundColor="black"
            position="relative"
        >
            {props.screen !== null ? (
                <AbsoluteCenter
                    className="preview_box_screen"
                    border="1px solid #fff"
                    height={dimensions.height}
                    width={dimensions.width}
                    fontSize={dimensions.height}
                    overflow="hidden"
                    axis="both"
                >
                    <ScreenView
                        data={props.data}
                        settings={
                            props.screen.settings
                                ? props.screen.settings
                                : new ScreenSettings("null")
                        }
                    />
                </AbsoluteCenter>
            ) : (
                <AbsoluteCenter axis="both">No Screen</AbsoluteCenter>
            )}
        </Box>
    );
}

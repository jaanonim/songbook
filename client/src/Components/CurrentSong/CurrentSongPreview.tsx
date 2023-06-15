import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { socket } from "../../Services/socket";
import ScreenView from "../ScreenView";
import ShowData from "../../Models/ShowData";
import { useElementSize } from "usehooks-ts";

interface CurrentSongPreviewProps {
    data: null | ShowData;
    isScreen: boolean;
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
    }, [width, height, aspectRatio]);

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
            {props.isScreen ? (
                <AbsoluteCenter
                    className="preview_box_screen"
                    border="1px solid #fff"
                    height={dimensions.height}
                    width={dimensions.width}
                    fontSize={dimensions.height}
                    overflow="hidden"
                    axis="both"
                >
                    <ScreenView data={props.data} />
                </AbsoluteCenter>
            ) : (
                <AbsoluteCenter axis="both">No Screen</AbsoluteCenter>
            )}
        </Box>
    );
}

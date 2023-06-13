import { AbsoluteCenter, Box, useDimensions } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../Services/socket";
import ScreenView from "../ScreenView";
import ShowData from "../../Models/ShowData";

interface CurrentSongPreviewProps {
    data: null | ShowData;
    isScreen: boolean;
}

export function CurrentSongPreview(props: CurrentSongPreviewProps) {
    const ref = useRef(null);
    const dimensionsParent = useDimensions(ref);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function onScreenInfo(data: any) {
            if (!data) return;

            const calculateDimensions = (aspectRatio: number) => {
                const parentH = dimensionsParent
                    ? dimensionsParent.contentBox.height
                    : 0;
                const parentW = dimensionsParent
                    ? dimensionsParent.contentBox.width
                    : 0;
                const w = parentH * aspectRatio;
                const h = parentW / aspectRatio;

                if (parentW < w) return { width: parentW, height: h };
                return { width: w, height: parentH };
            };

            setDimensions(calculateDimensions(data.width / data.height));
        }

        socket.on("screenInfo", onScreenInfo);

        return () => {
            socket.off("screenInfo", onScreenInfo);
        };
    }, [dimensionsParent]);

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

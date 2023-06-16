import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { parseCP } from "simplechordpro";
import ShowData from "../../Models/ShowData";
import ScreenSettings from "../../Models/ScreenSettings";
import { useCallback } from "react";

interface ScreenViewProps {
    data: null | ShowData;
    settings: ScreenSettings;
}

function ScreenView(props: ScreenViewProps) {
    const processText = useCallback(
        (text: string | undefined) => {
            if (!text) return "";
            if (!props.settings.showChords) {
                text = text.replace(/\[[^\[\]]*\]/g, "");
            }
            return parseCP(text);
        },
        [props.settings]
    );

    return (
        <Box
            w="100%"
            h="100%"
            backgroundImage={`url(${
                typeof props.settings.background === "string"
                    ? props.settings.background
                    : props.settings.background.url
            })`}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            fontSize={`${props.settings.fontSize / 10}%`}
            position="relative"
            textAlign="center"
            color={props.settings.fontColor}
        >
            {props.data?.isHidden ? null : (
                <AbsoluteCenter axis="both">
                    <pre>{processText(props.data?.part.text)}</pre>
                </AbsoluteCenter>
            )}
        </Box>
    );
}

export default ScreenView;

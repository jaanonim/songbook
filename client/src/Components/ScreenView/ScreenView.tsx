import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { parseCP } from "simplechordpro";
import SongPart from "../../Models/SongPart";

interface ScreenViewProps {
    data: null | SongPart;
}

function ScreenView(props: ScreenViewProps) {
    return (
        <Box
            w="100%"
            h="100%"
            fontSize="5%"
            position="relative"
            textAlign="center"
        >
            <AbsoluteCenter axis="both">
                <pre>{parseCP(props.data ? props.data.text : "")}</pre>
            </AbsoluteCenter>
        </Box>
    );
}

export default ScreenView;

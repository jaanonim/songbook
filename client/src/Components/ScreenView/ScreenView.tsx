import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { parseCP } from "simplechordpro";
import ShowData from "../../Models/ShowData";

interface ScreenViewProps {
    data: null | ShowData;
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
            {props.data?.isHidden ? null : (
                <AbsoluteCenter axis="both">
                    <pre>{parseCP(props.data ? props.data.part.text : "")}</pre>
                </AbsoluteCenter>
            )}
        </Box>
    );
}

export default ScreenView;

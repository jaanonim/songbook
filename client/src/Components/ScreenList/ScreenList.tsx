import { ScreenListCopyInput } from "./ScreenListCopyInput";
import {
    Box,
    Center,
    Flex,
    Heading,
    Input,
    Spacer,
    useOutsideClick,
    useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import "./ScreenList.css";

interface ScreenListProps {
    w?: string;
    h?: string;
}

function ScreenList(props: ScreenListProps) {
    return (
        <Box w={props.w || "100%"} h={props.h || "100%"} padding={2}>
            <Flex alignContent="center" justifyContent="center">
                <Center>
                    <Heading as="h4" size="md">
                        Screens
                    </Heading>
                </Center>
                <Spacer />
                <ScreenListCopyInput />
            </Flex>
        </Box>
    );
}

export default ScreenList;

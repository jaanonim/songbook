import {
    ArrowLeftIcon,
    ArrowRightIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";

interface ControlsProps {
    onPreviousSong?: () => void;
    onNextSong?: () => void;
    onPreviousSlide?: () => void;
    onNextSlide?: () => void;
    onShow?: () => void;
    onHide?: () => void;
}

export function Controls(props: ControlsProps) {
    return (
        <Flex width="100%" marginBottom="0.5rem">
            <IconButton
                marginX={2}
                aria-label="previous song"
                icon={<ArrowLeftIcon></ArrowLeftIcon>}
                onClick={props.onPreviousSong}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="next song"
                icon={<ArrowRightIcon></ArrowRightIcon>}
                onClick={props.onNextSong}
            ></IconButton>

            <Spacer></Spacer>

            <IconButton
                marginX={2}
                aria-label="previous slide"
                icon={<TriangleUpIcon></TriangleUpIcon>}
                onClick={props.onPreviousSlide}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="next slide"
                icon={<TriangleDownIcon></TriangleDownIcon>}
                onClick={props.onNextSlide}
            ></IconButton>

            <Spacer></Spacer>

            <IconButton
                marginX={2}
                aria-label="hide"
                icon={<ViewOffIcon></ViewOffIcon>}
                onClick={props.onHide}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="show"
                icon={<ViewIcon></ViewIcon>}
                onClick={props.onShow}
            ></IconButton>
        </Flex>
    );
}

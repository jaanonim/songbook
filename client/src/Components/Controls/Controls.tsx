import {
    ArrowLeftIcon,
    ArrowRightIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";

interface ControlsProps {
    onPreviousSong?: () => void;
    onNextSong?: () => void;
    onPreviousSlide?: () => void;
    onNextSlide?: () => void;
    onShow?: () => void;
    onHide?: () => void;
    disabled?: boolean;
    isHidden?: boolean;
}

export function Controls(props: ControlsProps) {
    return (
        <Flex width="100%" marginBottom="0.5rem">
            <IconButton
                marginX={2}
                aria-label="previous song"
                icon={<ArrowLeftIcon></ArrowLeftIcon>}
                onClick={props.onPreviousSong}
                isDisabled={props.disabled}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="next song"
                icon={<ArrowRightIcon></ArrowRightIcon>}
                onClick={props.onNextSong}
                isDisabled={props.disabled}
            ></IconButton>

            <Spacer></Spacer>

            <IconButton
                marginX={2}
                aria-label="previous slide"
                icon={<TriangleUpIcon></TriangleUpIcon>}
                onClick={props.onPreviousSlide}
                isDisabled={props.disabled}
            ></IconButton>
            <IconButton
                marginX={2}
                aria-label="next slide"
                icon={<TriangleDownIcon></TriangleDownIcon>}
                onClick={props.onNextSlide}
                isDisabled={props.disabled}
            ></IconButton>

            <Spacer></Spacer>

            {props.isHidden ? (
                <IconButton
                    marginX={2}
                    aria-label="show"
                    icon={<ViewIcon></ViewIcon>}
                    onClick={props.onShow}
                    isDisabled={props.disabled}
                ></IconButton>
            ) : (
                <IconButton
                    marginX={2}
                    aria-label="hide"
                    icon={<ViewOffIcon></ViewOffIcon>}
                    onClick={props.onHide}
                    isDisabled={props.disabled}
                ></IconButton>
            )}
        </Flex>
    );
}

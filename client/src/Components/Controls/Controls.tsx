import {
    ArrowLeftIcon,
    ArrowRightIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Spacer, Tooltip } from "@chakra-ui/react";

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
            <Tooltip label="Previous song [Left Arrow]">
                <IconButton
                    marginX={2}
                    aria-label="previous song"
                    icon={<ArrowLeftIcon></ArrowLeftIcon>}
                    onClick={props.onPreviousSong}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            <Tooltip label="Next song [Right Arrow]">
                <IconButton
                    marginX={2}
                    aria-label="next song"
                    icon={<ArrowRightIcon></ArrowRightIcon>}
                    onClick={props.onNextSong}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            <Spacer></Spacer>

            <Tooltip label="Previous slide [Up Arrow]">
                <IconButton
                    marginX={2}
                    aria-label="previous slide"
                    icon={<TriangleUpIcon></TriangleUpIcon>}
                    onClick={props.onPreviousSlide}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            <Tooltip label="Next slide [Down Arrow]">
                <IconButton
                    marginX={2}
                    aria-label="next slide"
                    icon={<TriangleDownIcon></TriangleDownIcon>}
                    onClick={props.onNextSlide}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            <Spacer></Spacer>

            {props.isHidden ? (
                <Tooltip label="Show screen [.]">
                    <IconButton
                        marginX={2}
                        aria-label="show"
                        icon={<ViewIcon></ViewIcon>}
                        onClick={props.onShow}
                        isDisabled={props.disabled}
                    ></IconButton>
                </Tooltip>
            ) : (
                <Tooltip label="Hide screen [.]">
                    <IconButton
                        marginX={2}
                        aria-label="hide"
                        icon={<ViewOffIcon></ViewOffIcon>}
                        onClick={props.onHide}
                        isDisabled={props.disabled}
                    ></IconButton>
                </Tooltip>
            )}
        </Flex>
    );
}

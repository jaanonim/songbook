import {
    ArrowLeftIcon,
    ArrowRightIcon,
    NotAllowedIcon,
    SunIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    ViewIcon,
    ViewOffIcon,
} from "@chakra-ui/icons";
import { IconButton, SimpleGrid, Tooltip } from "@chakra-ui/react";

interface ControllerProps {
    onPreviousSong?: () => void;
    onNextSong?: () => void;
    onPreviousSlide?: () => void;
    onNextSlide?: () => void;
    onShow?: () => void;
    onHide?: () => void;
    onBlackOn?: () => void;
    onBlackOff?: () => void;
    disabled?: boolean;
    isHidden?: boolean;
    isBlack?: boolean;
    w?: string;
    h?: string;
    visible?: boolean;
}

function Controller(props: ControllerProps) {
    return (
        <SimpleGrid
            columns={2}
            spacing="1rem"
            paddingTop="1rem"
            width={`calc(${props.w} - 1rem)`}
            height={`calc(${props.h} - 1rem)`}
            display={props.visible ? undefined : "none"}
            marginBottom="0.5rem"
        >
            <Tooltip label="Previous song [Left Arrow]">
                <IconButton
                    w="100%"
                    h="100%"
                    marginX={2}
                    aria-label="previous song"
                    icon={<ArrowLeftIcon></ArrowLeftIcon>}
                    onClick={props.onPreviousSong}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            <Tooltip label="Next song [Right Arrow]">
                <IconButton
                    w="100%"
                    h="100%"
                    marginX={2}
                    aria-label="next song"
                    icon={<ArrowRightIcon></ArrowRightIcon>}
                    onClick={props.onNextSong}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            {props.isBlack ? (
                <Tooltip label="Show screen [/]">
                    <IconButton
                        w="100%"
                        h="100%"
                        marginX={2}
                        aria-label="show"
                        icon={<SunIcon></SunIcon>}
                        onClick={props.onBlackOff}
                        isDisabled={props.disabled}
                    ></IconButton>
                </Tooltip>
            ) : (
                <Tooltip label="Make screen black [/]">
                    <IconButton
                        w="100%"
                        h="100%"
                        marginX={2}
                        aria-label="black"
                        icon={<NotAllowedIcon></NotAllowedIcon>}
                        onClick={props.onBlackOn}
                        isDisabled={props.disabled}
                    ></IconButton>
                </Tooltip>
            )}
            <Tooltip label="Previous slide [Up Arrow]">
                <IconButton
                    w="100%"
                    h="100%"
                    marginX={2}
                    aria-label="previous slide"
                    icon={<TriangleUpIcon></TriangleUpIcon>}
                    onClick={props.onPreviousSlide}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>

            {props.isHidden ? (
                <Tooltip label="Show screen [.]">
                    <IconButton
                        w="100%"
                        h="100%"
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
                        w="100%"
                        h="100%"
                        marginX={2}
                        aria-label="hide"
                        icon={<ViewOffIcon></ViewOffIcon>}
                        onClick={props.onHide}
                        isDisabled={props.disabled}
                    ></IconButton>
                </Tooltip>
            )}
            <Tooltip label="Next slide [Down Arrow]">
                <IconButton
                    w="100%"
                    h="100%"
                    marginX={2}
                    aria-label="next slide"
                    icon={<TriangleDownIcon></TriangleDownIcon>}
                    onClick={props.onNextSlide}
                    isDisabled={props.disabled}
                ></IconButton>
            </Tooltip>
        </SimpleGrid>
    );
}

export default Controller;

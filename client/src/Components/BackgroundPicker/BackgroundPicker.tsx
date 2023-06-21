import { BackgroundPickerTextInput } from "./BackgroundPickerTextInput";
import {
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Image,
    useDisclosure,
    FormControl,
    FormLabel,
    Spacer,
    Box,
} from "@chakra-ui/react";
import UnsplashSimpleImg from "../../Models/UnsplashSimpleImg";
import { useCallback, useEffect, useRef, useState } from "react";
import UnsplashImagePicker from "../UnsplashImagePicker/UnsplashImagePicker";
import ColorPicker from "../ColorPicker/ColorPicker";
import getListOfColors from "../../Utilities/colors";
import { isValidUrl } from "../../Utilities/validators";

interface BackgroundPickerProps {
    onSelect: (selected: UnsplashSimpleImg | string) => void;
    selected: UnsplashSimpleImg | string;
}

function BackgroundPicker(props: BackgroundPickerProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);

    const updateOption = useCallback((selected: UnsplashSimpleImg | string) => {
        if (selected === null) return 1;
        if (typeof selected === "string") {
            return isValidUrl(selected) ? 0 : 1;
        }
        return 2;
    }, []);

    const [option, setOption] = useState(updateOption(props.selected));
    useEffect(() => {
        setOption(updateOption(props.selected));
    }, [props.selected]);

    return (
        <>
            <Box bgColor={"#000"} h="2rem" w="3rem" mt={3} borderRadius={5}>
                <Flex
                    alignItems="center"
                    h="2rem"
                    w="3rem"
                    backgroundColor={
                        typeof props.selected === "string"
                            ? props.selected
                            : "#000"
                    }
                    onClick={() => {
                        onOpen();
                    }}
                    _hover={{
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "blue.300",
                    }}
                    display={"inline-block"}
                    borderRadius={5}
                >
                    <Image
                        display={option === 1 ? "none" : "block"}
                        margin="auto"
                        src={
                            typeof props.selected === "string"
                                ? props.selected
                                : props.selected.url
                        }
                        borderRadius={5}
                        h="100%"
                    ></Image>
                </Flex>
            </Box>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Pick Background</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Flex>
                                <FormLabel
                                    mt={2}
                                    mb={0}
                                    display="inline-block"
                                    fontWeight={
                                        option === 0 ? "bold" : undefined
                                    }
                                    color={
                                        option === 0 ? "blue.300" : undefined
                                    }
                                >
                                    Enter url to image:
                                </FormLabel>
                                <Spacer />
                                <BackgroundPickerTextInput
                                    value={
                                        typeof props.selected === "string"
                                            ? props.selected
                                            : ""
                                    }
                                    onSubmit={(value) => {
                                        props.onSelect(value.trim());
                                    }}
                                />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex my={3}>
                                <FormLabel
                                    mt={2}
                                    mb={0}
                                    display="inline-block"
                                    fontWeight={
                                        option === 1 ? "bold" : undefined
                                    }
                                    color={
                                        option === 1 ? "blue.300" : undefined
                                    }
                                >
                                    Or select color:
                                </FormLabel>
                                <Spacer />
                                <ColorPicker
                                    colors={getListOfColors()}
                                    onSelect={(color) => {
                                        props.onSelect(color);
                                    }}
                                    selectedColor={
                                        option === 1 &&
                                        typeof props.selected === "string"
                                            ? props.selected
                                            : "black"
                                    }
                                />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <FormLabel
                                mt={4}
                                mb={1}
                                display="inline-block"
                                fontWeight={option === 2 ? "bold" : undefined}
                                color={option === 2 ? "blue.300" : undefined}
                            >
                                Or pick from those images:
                            </FormLabel>
                            <UnsplashImagePicker
                                onSelect={(v) => {
                                    props.onSelect(v === null ? "" : v);
                                }}
                                selected={
                                    typeof props.selected === "string"
                                        ? null
                                        : props.selected
                                }
                                h="50vh"
                                w="90%"
                            ></UnsplashImagePicker>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={onClose}
                            mr={5}
                            mb={2}
                        >
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default BackgroundPicker;

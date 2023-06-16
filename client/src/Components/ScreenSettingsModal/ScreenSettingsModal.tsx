import { SettingsIcon } from "@chakra-ui/icons";
import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Switch,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ScreenDataNotNull } from "../../Models/ScreenData";
import ScreenSettings from "../../Models/ScreenSettings";
import { socket } from "../../Services/socket";
import getListOfColors from "../../Utilities/colors";
import ColorPicker from "../ColorPicker/ColorPicker";
import UnsplashImagePicker from "../UnsplashImagePicker";

interface ScreenSettingsModalProps {
    data: ScreenDataNotNull;
}

function ScreenSettingsModal(props: ScreenSettingsModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showTooltip, setShowTooltip] = useState(false);
    const initialRef = useRef<HTMLInputElement>(null);
    const [settings, setSettings] = useState(
        ScreenSettings.fromObj(props.data.settings)
    );
    useEffect(() => {
        setSettings(ScreenSettings.fromObj(props.data.settings));
    }, [props.data.settings]);

    const save = useDebouncedCallback((settings) => {
        if (JSON.stringify(settings) !== JSON.stringify(props.data.settings))
            socket.emit("screenSettings", settings);
    }, 300);

    useEffect(() => {
        save(settings);
    }, [settings]);

    return (
        <>
            <IconButton
                aria-label="settings"
                size={"sm"}
                icon={<SettingsIcon></SettingsIcon>}
                marginRight={2}
                onClick={() => {
                    onOpen();
                }}
            ></IconButton>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>Screen settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Title"
                                value={settings.name}
                                onChange={(e) => {
                                    setSettings((s) => {
                                        const sett = s.copy();
                                        sett.name = e.target.value;
                                        return sett;
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel mt={4}>Fontsize</FormLabel>
                            <Slider
                                aria-label="fontsize"
                                value={settings.fontSize}
                                onChange={(val) => {
                                    setSettings((s) => {
                                        const sett = s.copy();
                                        sett.fontSize = val;
                                        return sett;
                                    });
                                }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                min={10}
                                max={100}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                    hasArrow
                                    bg="blue.300"
                                    color="white"
                                    placement="top"
                                    isOpen={showTooltip}
                                    label={`${settings.fontSize}`}
                                >
                                    <SliderThumb />
                                </Tooltip>
                            </Slider>
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                            <FormLabel mb="0">Show chords</FormLabel>
                            <Switch
                                isChecked={settings.showChords}
                                onChange={(e) => {
                                    setSettings((s) => {
                                        const sett = s.copy();
                                        sett.showChords = !!e.target.checked;
                                        return sett;
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <Flex>
                                <FormLabel mt={4} mb={0} display="inline-block">
                                    Background
                                </FormLabel>
                                <UnsplashImagePicker
                                    onSelect={(ele) => {
                                        setSettings((s) => {
                                            const sett = s.copy();
                                            sett.background =
                                                ele === null ? "" : ele;
                                            return sett;
                                        });
                                    }}
                                    selected={
                                        typeof settings.background === "string"
                                            ? null
                                            : settings.background
                                    }
                                ></UnsplashImagePicker>
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex>
                                <FormLabel mt={4} mb={0} display="inline-block">
                                    Font Color
                                </FormLabel>
                                <ColorPicker
                                    mt="3"
                                    colors={getListOfColors()}
                                    selectedColor={settings.fontColor}
                                    onSelect={(color: string) => {
                                        setSettings((s) => {
                                            const sett = s.copy();
                                            sett.fontColor = color;
                                            return sett;
                                        });
                                    }}
                                ></ColorPicker>
                            </Flex>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ScreenSettingsModal;

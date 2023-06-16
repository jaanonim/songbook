import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    SimpleGrid,
    useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import UnsplashSimpleImg from "../../Models/UnsplashSimpleImg";
import { getPhotos } from "../../Services/api";
import "./UnsplashImagePicker.css";
import { UnsplashImagePickerElement } from "./UnsplashImagePickerElement";

interface UnsplashImagePickerProps {
    onSelect: (selected: UnsplashSimpleImg | null) => void;
    selected: UnsplashSimpleImg | null;
}

function UnsplashImagePicker(props: UnsplashImagePickerProps) {
    const [selected, setSelected] = useState<UnsplashSimpleImg | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);

    const { data, error, isFetching, fetchNextPage, hasNextPage } =
        useInfiniteQuery(["photo"], getPhotos, {
            getNextPageParam: (lastPage, pages) =>
                lastPage.total_pages > pages.length ? pages.length : undefined,
        });

    const loadMoreButtonRef = useRef(null);

    const select = useCallback((ele: UnsplashSimpleImg) => {
        setSelected((s) => {
            if (s?.id === ele.id) {
                props.onSelect(null);
                return null;
            }
            props.onSelect(ele);
            return ele;
        });
    }, []);

    useIntersectionObserver({
        target: loadMoreButtonRef,
        onIntersect: fetchNextPage,
        enabled: !!hasNextPage,
    });

    return (
        <>
            <Flex
                alignItems="center"
                h="2rem"
                w="3rem"
                mt={3}
                backgroundColor={"#000"}
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
                    display={"block"}
                    margin="auto"
                    src={selected?.url}
                    borderRadius={5}
                    h="100%"
                ></Image>
            </Flex>
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
                        <Box
                            h="50vh"
                            w="90%"
                            border={1}
                            marginX="auto"
                            marginY="2"
                            overflowY={"scroll"}
                            padding={5}
                        >
                            {error ? (
                                <Alert
                                    status="error"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    m="1rem auto"
                                    borderRadius={5}
                                >
                                    <AlertIcon boxSize="10" mr="0" />
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Error:
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        {(error as Error).message}
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <>
                                    <SimpleGrid columns={5} spacing={2}>
                                        {data
                                            ? data.pages.map((page) =>
                                                  page.results.map(
                                                      (ele: any) => (
                                                          <UnsplashImagePickerElement
                                                              selected={
                                                                  selected
                                                              }
                                                              element={ele}
                                                              select={select}
                                                          />
                                                      )
                                                  )
                                              )
                                            : null}
                                    </SimpleGrid>
                                    <Box
                                        ref={loadMoreButtonRef}
                                        w="100%"
                                        mt={3}
                                        bg="rgba(255,255,255,0.1)"
                                        borderRadius="5px"
                                        textAlign="center"
                                        fontSize="sm"
                                        p={2}
                                    >
                                        {isFetching || hasNextPage ? (
                                            <Progress
                                                size="xs"
                                                isIndeterminate
                                            />
                                        ) : (
                                            "No more photos here"
                                        )}
                                    </Box>
                                </>
                            )}
                        </Box>
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

export default UnsplashImagePicker;

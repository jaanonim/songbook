import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Progress,
    SimpleGrid,
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
    h?: string;
    w?: string;
}

function UnsplashImagePicker(props: UnsplashImagePickerProps) {
    const [selected, setSelected] = useState<UnsplashSimpleImg | null>(null);

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
        <Box
            h={props.h || "100%"}
            w={props.w || "100%"}
            border={1}
            marginX="auto"
            overflowY={"scroll"}
            padding={2}
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
                                  page.results.map((ele: any) => (
                                      <UnsplashImagePickerElement
                                          selected={selected}
                                          element={ele}
                                          select={select}
                                      />
                                  ))
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
                            <Progress size="xs" isIndeterminate />
                        ) : (
                            "No more photos here"
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}

export default UnsplashImagePicker;

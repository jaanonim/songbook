import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Flex,
    Image,
    Progress,
    SimpleGrid,
    Tooltip,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import { getPhotos } from "../../Services/api";
import "./UnsplashImagePicker.css";
import UnsplashSimpleImg from "../../Models/UnsplashSimpleImg";

interface UnsplashImagePickerProps {
    onSelect: (selected: UnsplashSimpleImg | null) => void;
    selected: UnsplashSimpleImg | null;
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
                                  page.results.map((ele: any) => (
                                      <Flex key={ele.id}>
                                          <Tooltip label={ele.user.name}>
                                              <Image
                                                  className="img-hover-effect"
                                                  src={ele.urls.small}
                                                  borderColor={
                                                      selected?.id === ele.id
                                                          ? "blue.300"
                                                          : "transparent"
                                                  }
                                                  borderStyle="solid"
                                                  borderWidth="2px"
                                                  cursor="pointer"
                                                  transform={
                                                      selected?.id === ele.id
                                                          ? "scale(1.1)"
                                                          : undefined
                                                  }
                                                  w="100%"
                                                  onClick={() => {
                                                      select({
                                                          id: ele.id,
                                                          url: ele.urls.full,
                                                          icon: ele.urls.small,
                                                      });
                                                  }}
                                              ></Image>
                                          </Tooltip>
                                      </Flex>
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

import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Center,
    Divider,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    Spinner,
    Table,
    Tbody,
    Td,
    Tooltip,
    Tr,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import Song from "../../Models/Song";
import { getSongs } from "../../Services/api";
import CreateSong from "../CreateSong";
import SearchCloseButton from "../SearchCloseButton";

interface SongTableProps {
    onSongUpdate: (id: string[] | null) => void;
    onDelete?: (song: Song) => void;
    onAdd?: (song: Song) => void;
    h?: string;
    w?: string;
    element: any;
    selected?: string[];
    multiple?: boolean;
    disableAdd?: boolean;
    selectAll?: boolean;
}

function SongTable(props: SongTableProps) {
    const [filter, setFilter] = React.useState<string | undefined>(undefined);
    const debouncedFilter = useDebounce(filter, 500);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const { data, error, isFetching, fetchNextPage, hasNextPage } =
        useInfiniteQuery(["song", debouncedFilter], getSongs, {
            getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
        });

    const loadMoreButtonRef =
        React.useRef() as React.MutableRefObject<HTMLTableRowElement>;

    useIntersectionObserver({
        target: loadMoreButtonRef,
        onIntersect: fetchNextPage,
        enabled: !!hasNextPage,
    });

    const onSelect = (element: Song) => {
        if (songs) {
            if (songs.filter((id) => id === element._id).length === 0) {
                if (multiple) {
                    setSongs([...songs, element._id]);
                } else {
                    setSongs([element._id]);
                }
            } else if (multiple) {
                const s = songs.filter((id) => id !== element._id);
                setSongs(s === undefined ? null : s);
            }
        } else {
            setSongs([element._id]);
        }
    };

    const multiple = props.multiple === undefined ? false : props.multiple;
    const [songs, setSongs] = useState<string[] | null>(
        props.selected === undefined ? null : props.selected
    );

    const [update, setUpdate] = useState(false);
    const [fetchAll, setFetchAll] = useState<
        null | ((d: any) => (d: any) => void)
    >(null);
    useEffect(() => {
        if (fetchAll !== null) {
            if (hasNextPage) {
                fetchNextPage().then(() => {
                    setUpdate(!update);
                });
            } else {
                fetchAll(data);
                setFetchAll(null);
            }
        }
    }, [update]);

    useEffect(() => {
        props.onSongUpdate(songs);
    }, [songs]);

    return (
        <Box
            w={props.w || "100%"}
            h={`calc(${props.h || "100vh"} - 2rem)`}
            border="1px"
            borderColor="rgba(255,255,255,0.1)"
            borderRadius={5}
            m="1rem"
        >
            {fetchAll !== null ? (
                <Box pos="relative" top="0" left="0">
                    <Box
                        top="-2px"
                        left="-2px"
                        pos="absolute"
                        zIndex="100"
                        borderRadius={5}
                        w={`calc(${props.w || "100%"} + 4px)`}
                        h={`calc(${props.h || "100vh"} - 2rem + 4px)`}
                        backgroundColor="rgba(0,0,0,0.4)"
                    >
                        <Center h="100%">
                            <Spinner size="xl" />
                        </Center>
                    </Box>
                </Box>
            ) : null}

            <Box m="1rem" h="2.5rem">
                <Flex justify="center">
                    <Tooltip label="Use # to search by tag 😉">
                        <InputGroup>
                            <Input
                                placeholder="Search"
                                value={filter}
                                onChange={handleChange}
                                className="noKeyHook"
                            />
                            {filter ? (
                                <InputRightElement>
                                    <SearchCloseButton
                                        onClick={() => {
                                            setFilter("");
                                        }}
                                    ></SearchCloseButton>
                                </InputRightElement>
                            ) : null}
                        </InputGroup>
                    </Tooltip>
                    {props.disableAdd ? null : (
                        <CreateSong
                            onCreate={(song) => {
                                setSongs([song._id]);
                            }}
                        />
                    )}
                    {props.selectAll && multiple ? (
                        <IconButton
                            aria-label="select all"
                            ml="2"
                            icon={<MdCheckBox />}
                            onClick={() => {
                                setFetchAll((_d: any) => (d: any) => {
                                    const s = [] as string[];

                                    d?.pages.forEach((page: any) => {
                                        page.docs.forEach((song: Song) => {
                                            if (
                                                songs === null ||
                                                songs.filter(
                                                    (id) => id === song._id
                                                ).length === 0
                                            ) {
                                                s.push(song._id);
                                            }
                                        });
                                    });
                                    if (s) {
                                        if (songs) setSongs([...songs, ...s]);
                                        else setSongs(s);
                                    }
                                });
                                setUpdate(!update);
                            }}
                        ></IconButton>
                    ) : null}
                    {props.selectAll && multiple ? (
                        <IconButton
                            aria-label="unselect all"
                            ml="2"
                            icon={<MdCheckBoxOutlineBlank />}
                            onClick={() => {
                                setFetchAll((_d: any) => (d: any) => {
                                    if (!songs) return;
                                    let s = [...songs];

                                    d?.pages.forEach((page: any) => {
                                        page.docs.forEach((song: Song) => {
                                            if (
                                                songs.filter(
                                                    (id) => id === song._id
                                                ).length > 0
                                            ) {
                                                s = s.filter(
                                                    (id) => id !== song._id
                                                );
                                            }
                                        });
                                    });
                                    setSongs(s);
                                });
                                setUpdate(!update);
                            }}
                        ></IconButton>
                    ) : null}
                </Flex>
            </Box>
            <Divider />

            <Box h={`calc( ${props.h || "100vh"} - 5rem)`} overflowY="scroll">
                {error ? (
                    <Alert
                        status="error"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        minHeight="10rem"
                        width="min(80% , 62em)"
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
                    <Table w="100%">
                        <Tbody w="100%">
                            {data?.pages.map((page) => (
                                <React.Fragment key={page.nextPage}>
                                    {page.docs.map((element: Song) => {
                                        element = new Song(element);
                                        return (
                                            <props.element
                                                onAdd={props.onAdd}
                                                key={element._id}
                                                song={element}
                                                onDelete={props.onDelete}
                                                selected={
                                                    songs
                                                        ? songs?.filter(
                                                              (id) =>
                                                                  id ===
                                                                  element._id
                                                          ).length > 0
                                                        : false
                                                }
                                                onSelect={() =>
                                                    onSelect(element)
                                                }
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                            <Tr ref={loadMoreButtonRef}>
                                <Td colSpan={3}>
                                    <Box
                                        w="100%"
                                        bg="rgba(255,255,255,0.1)"
                                        borderRadius="5px"
                                        textAlign="center"
                                        fontSize="sm"
                                        p="1rem"
                                    >
                                        {isFetching || hasNextPage ? (
                                            <Progress
                                                size="xs"
                                                isIndeterminate
                                            />
                                        ) : (
                                            "No songs here"
                                        )}
                                    </Box>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                )}
            </Box>
        </Box>
    );
}
export default SongTable;

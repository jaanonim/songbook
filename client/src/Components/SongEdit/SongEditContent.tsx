import { AddIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Song from "../../Models/Song";
import DeleteSongButton from "../DeleteSongButton";
import SongEditableInput from "../EditableInput";
import EditSongData from "../EditSongData";
import SongPartBox from "../SongPartBox";
import SongTagList from "../SongTagList";
import TagList from "../TagList";
import UpdateSongPart from "../UpdateSongPart";

interface SongEditContentProps {
    song: Song;
    preview?: boolean;
    headingSize?: string;
    h?: string;
}

export function SongEditContent(props: SongEditContentProps) {
    return (
        <>
            <Center>
                <Heading
                    as="h3"
                    size={props.headingSize || "xl"}
                    mt="5"
                    textAlign="center"
                >
                    {props.preview ? (
                        props.song.title
                    ) : (
                        <SongEditableInput
                            id={props.song._id}
                            name="title"
                            value={props.song.title}
                            textAlign="center"
                            getObject={(value) => {
                                return {
                                    title: value,
                                };
                            }}
                        />
                    )}
                </Heading>
            </Center>
            <Center mt="4">
                <Text display="inline-block">Author:</Text>
                {props.preview ? (
                    props.song.author ? (
                        <Text marginLeft="1ch">{props.song.author}</Text>
                    ) : (
                        <Text color="gray.500" marginLeft="1ch">
                            empty
                        </Text>
                    )
                ) : (
                    <SongEditableInput
                        id={props.song._id}
                        name="author"
                        value={props.song.author}
                        ml="1"
                        canBeEmpty={true}
                        display="inline-block"
                        getObject={(value) => {
                            return {
                                author: value,
                            };
                        }}
                    />
                )}
            </Center>
            <Center mt="2" minH="2" mb="2">
                {props.preview ? (
                    <TagList tags={props.song.tags} editable={false} />
                ) : (
                    <SongTagList song={props.song} />
                )}
            </Center>
            {props.preview ? null : (
                <Center m="2">
                    <EditSongData song={props.song} />
                    <UpdateSongPart song={props.song} part={undefined}>
                        <AddIcon />
                    </UpdateSongPart>
                    <DeleteSongButton song={props.song} />
                </Center>
            )}
            <Center>
                {props.song.parts ? (
                    <Box
                        w={"min(100% , calc(70ch + 1rem))"}
                        overflowY="scroll"
                        overflowX="hidden"
                        h={`calc( ${props.h || "100vh"} - ${
                            props.preview ? "11rem" : "30vh"
                        })`}
                        borderBottom="1px"
                        borderTop="1px"
                        borderColor="rgba(255,255,255,0.1)"
                    >
                        {props.song.parts.map((part) => (
                            <SongPartBox
                                key={part.id}
                                part={part}
                                song={props.song}
                                preview={props.preview}
                            />
                        ))}
                    </Box>
                ) : (
                    <Alert
                        status="info"
                        m={2}
                        borderRadius={5}
                        ml="auto"
                        mr="auto"
                        w="sm"
                    >
                        <AlertIcon />
                        No song parts here.
                    </Alert>
                )}
            </Center>
        </>
    );
}

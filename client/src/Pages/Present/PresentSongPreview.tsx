import { EditIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Stack } from "@chakra-ui/react";
import { SongEdit } from "../../Components/SongEdit";

interface PresentSongPreviewProps {
    preview: string | null;
}

export function PresentSongPreview(props: PresentSongPreviewProps) {
    return (
        <Box w="25%" h="100vh">
            <Stack position="relative">
                <Heading as="h3" textAlign="center" margin="1.5rem">
                    Preview
                </Heading>
                {props.preview ? (
                    <IconButton
                        position="absolute"
                        top="1.75rem"
                        right="1rem"
                        size={"sm"}
                        aria-label="edit"
                        icon={<EditIcon></EditIcon>}
                        onClick={() => {
                            window.open(
                                `/manage/?id=${props.preview}`,
                                "_blank"
                            );
                        }}
                    ></IconButton>
                ) : null}
            </Stack>
            <SongEdit
                headingSize="l"
                w="calc(100% - 2rem)"
                h="calc(100vh - 6rem)"
                id={props.preview ? props.preview : undefined}
                preview={true}
            ></SongEdit>
        </Box>
    );
}

import SongEditContent from "./SongEditContent";
import { SongEditNoSong } from "./SongEditNoSong";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Song from "../../Models/Song";
import { getSong } from "../../Services/api";
import { SongEditLoading } from "./SongEditLoading";
import { SongEditError } from "./SongEditError";

interface SongEditProps {
    h?: string;
    w?: string;
    id?: string;
    headingSize?: string;
    preview?: boolean;
    selected?: number | null;
    onSelect?: (id: number) => void;
}

interface SongEditNoApiProps {
    h?: string;
    w?: string;
    song: Song | null;
    headingSize?: string;
    preview?: boolean;
    selected?: number | null;
    onSelect?: (id: number) => void;
}

export interface SongEditRef {
    setSelected: (id: number | null) => void;
}

function SongEditInner(props: SongEditProps) {
    const { isLoading, isError, data, error } = useQuery(
        ["song", props.id],
        getSong,
        {
            enabled: !!props.id,
        }
    );

    if (!props.id) return <SongEditNoSong />;
    if (isLoading) return <SongEditLoading />;
    if (isError) return <SongEditError error={error as Error} />;

    const song = new Song(data);
    return (
        <SongEditContent
            song={song}
            preview={props.preview}
            headingSize={props.headingSize}
            h={props.h}
            onSelect={props.onSelect}
            selected={props.selected !== undefined ? props.selected : null}
        />
    );
}

function SongEdit(props: SongEditProps) {
    return (
        <Box
            margin="1rem"
            w={props.w || "100vw"}
            h={`calc(${props.h || "100vh"} - 2rem)`}
        >
            <SongEditInner
                id={props.id}
                preview={props.preview}
                headingSize={props.headingSize}
                h={props.h}
                onSelect={props.onSelect}
                selected={props.selected !== undefined ? props.selected : null}
            ></SongEditInner>
        </Box>
    );
}

function SongEditNoApiInner(props: SongEditNoApiProps) {
    if (!props.song) return <SongEditNoSong />;
    return (
        <SongEditContent
            song={props.song}
            preview={props.preview}
            headingSize={props.headingSize}
            h={props.h}
            onSelect={props.onSelect}
            selected={props.selected !== undefined ? props.selected : null}
        />
    );
}

function SongEditNoApi(props: SongEditNoApiProps) {
    return (
        <Box
            margin="1rem"
            w={props.w || "100vw"}
            h={`calc(${props.h || "100vh"} - 2rem)`}
        >
            <SongEditNoApiInner
                song={props.song}
                preview={props.preview}
                headingSize={props.headingSize}
                h={props.h}
                onSelect={props.onSelect}
                selected={props.selected !== undefined ? props.selected : null}
            />
        </Box>
    );
}

export { SongEdit, SongEditNoApi };

import SongPartBox from "../SongPartBox";
import { Box } from "@chakra-ui/react";
import Song from "../../Models/Song";
import { useCallback, useEffect, useState } from "react";
import SongPart from "../../Models/SongPart";
import update from "immutability-helper";

interface SongEditPartsListProps {
    song: Song;
    preview?: boolean;
    h?: string;
}

export function SongEditPartsList(props: SongEditPartsListProps) {
    const [parts, setParts] = useState<SongPart[]>(props.song.parts);
    useEffect(() => {
        setParts(props.song.parts);
    }, [props.song.parts]);

    const movePart = useCallback((dragIndex: number, hoverIndex: number) => {
        setParts((p: SongPart[]) =>
            update(p, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, p[dragIndex] as SongPart],
                ],
            })
        );
    }, []);

    return (
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
            {parts.map((part, i) => (
                <SongPartBox
                    key={part.id}
                    part={part}
                    parts={parts}
                    index={i}
                    song={props.song}
                    preview={props.preview}
                    movePart={movePart}
                />
            ))}
        </Box>
    );
}

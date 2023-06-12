import { Box } from "@chakra-ui/react";
import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import Song from "../../Models/Song";
import SongPart from "../../Models/SongPart";
import SongPartBox from "../SongPartBox";

interface SongEditPartsListProps {
    song: Song;
    preview?: boolean;
    selectable?: boolean;
    h?: string;
    onSelect?: (id: number) => void;
    selected: number | null;
}

function SongEditPartsList(props: SongEditPartsListProps) {
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
            scrollBehavior="smooth"
        >
            {parts.map((part, i) => (
                <SongPartBox
                    key={part.id}
                    selected={props.selected === part.id}
                    part={part}
                    parts={parts}
                    index={i}
                    song={props.song}
                    preview={props.preview}
                    movePart={movePart}
                    onClick={
                        props.onSelect
                            ? () => {
                                  if (props.onSelect) props.onSelect(part.id);
                              }
                            : undefined
                    }
                />
            ))}
        </Box>
    );
}

export default SongEditPartsList;

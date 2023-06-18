import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import ExportModal from "../../Components/ExportModal";
import ImportModal from "../../Components/ImportModal";
import { SongEdit } from "../../Components/SongEdit";
import SongTable from "../../Components/SongTable";
import SongTableElement from "../../Components/SongTableElement";
import TopRightCorner from "../../Components/TopRightCorner";
import { useSearchParams } from "react-router-dom";

function Manage() {
    const [song, setSong] = useState<string | null>(null);
    const [params, setParams] = useSearchParams();

    const getSelected = useCallback(() => {
        const id = params.get("id");
        return id ? [id] : undefined;
    }, []);

    return (
        <>
            <Flex>
                <SongTable
                    onSongUpdate={(s) => {
                        setSong(s !== null ? s[0] : null);
                        setParams(s !== null ? { id: s[0] } : {});
                    }}
                    onDelete={(s) => {
                        if (s._id == song) {
                            setSong(null);
                            setParams({});
                        }
                    }}
                    element={SongTableElement}
                    selected={getSelected()}
                />
                <SongEdit key={song} id={song ? song : undefined}></SongEdit>
            </Flex>
            <TopRightCorner>
                <ImportModal />
                <ExportModal />
            </TopRightCorner>
        </>
    );
}

export default Manage;

import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { MdList } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import BottomNavBar from "../../Components/BottomNavBar";
import ExportModal from "../../Components/ExportModal";
import ImportModal from "../../Components/ImportModal";
import { SongEdit } from "../../Components/SongEdit";
import SongTable from "../../Components/SongTable";
import SongTableElement from "../../Components/SongTableElement";
import TopRightCorner from "../../Components/TopRightCorner";

function Manage() {
    const [song, setSong] = useState<string | null>(null);
    const [params, setParams] = useSearchParams();

    const getSelected = useCallback(() => {
        const id = params.get("id");
        return id ? [id] : undefined;
    }, []);
    const [tab, setTab] = useState(params.get("id") ? 1 : 0);
    const [moreThen1100] = useMediaQuery(["(min-width: 1100px)"]);
    const h = useMemo(
        () => (moreThen1100 ? "100%" : "calc(100% - 4rem)"),
        [moreThen1100]
    );

    return (
        <>
            <Flex h="100vh" w="100vw">
                <Box
                    h={h}
                    w={moreThen1100 ? "50%" : "100%"}
                    display={moreThen1100 || tab === 0 ? undefined : "none"}
                >
                    <SongTable
                        h="100%"
                        w="calc(100% - 2rem)"
                        onSongUpdate={(s) => {
                            setSong(s !== null ? s[0] : null);
                            setParams(s !== null ? { id: s[0] } : {});
                            if (!moreThen1100 && s !== null) setTab(1);
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
                </Box>
                <Box
                    h={h}
                    w={moreThen1100 ? "50%" : "100%"}
                    display={moreThen1100 || tab === 1 ? undefined : "none"}
                >
                    <SongEdit
                        h="100%"
                        w="calc(100% - 2rem)"
                        key={song}
                        id={song ? song : undefined}
                    ></SongEdit>
                </Box>
            </Flex>
            {moreThen1100 ? null : (
                <BottomNavBar
                    onChange={(value) => {
                        if (typeof value === "string")
                            throw Error("Bottom bar invalid value");
                        setTab(value);
                    }}
                    value={tab}
                    elements={[
                        {
                            icon: MdList,
                            name: "Songs",
                        },
                        {
                            icon: EditIcon,
                            name: "Edit",
                        },
                    ]}
                ></BottomNavBar>
            )}
            {moreThen1100 || tab === 1 ? (
                <TopRightCorner>
                    <ImportModal />
                    <ExportModal />
                </TopRightCorner>
            ) : null}
        </>
    );
}

export default Manage;

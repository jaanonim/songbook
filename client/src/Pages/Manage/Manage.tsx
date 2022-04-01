import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ExportModal from "../../Components/ExportModal";
import ImportModal from "../../Components/ImportModal";
import SongEdit from "../../Components/SongEdit";
import SongTable from "../../Components/SongTable";
import SongTableElement from "../../Components/SongTableElement";
import TopRightCorner from "../../Components/TopRightCorner";
import Song from "../../Models/Song";

function Manage() {
	const [song, setSong] = useState<Song | null>(null);

	return (
		<>
			<Flex>
				<SongTable
					onSongUpdate={(s) => {
						setSong(s !== null ? s[0] : null);
					}}
					onDelete={(s) => {
						if (s._id == song?._id) {
							setSong(null);
						}
					}}
					element={SongTableElement}
				/>
				<SongEdit key={song?._id} id={song?._id}></SongEdit>
			</Flex>
			<TopRightCorner>
				<ImportModal />
				<ExportModal />
			</TopRightCorner>
		</>
	);
}

export default Manage;

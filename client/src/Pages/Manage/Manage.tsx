import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ImportModal from "../../Components/ImportModal";
import SongEdit from "../../Components/SongEdit";
import SongTable from "../../Components/SongTable";
import TopRightCorner from "../../Components/TopRightCorner";
import Song from "../../Models/Song";

function Manage() {
	const [song, setSong] = useState<Song | null>(null);

	return (
		<>
			<Flex>
				<SongTable
					onSongClick={(s) => {
						setSong(s);
					}}
					onDelete={(s) => {
						if (s._id == song?._id) {
							setSong(null);
						}
					}}
				/>
				<SongEdit key={song?._id} id={song?._id}></SongEdit>
			</Flex>
			<TopRightCorner>
				<ImportModal />
			</TopRightCorner>
		</>
	);
}

export default Manage;

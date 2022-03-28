import SongTable from "../../Components/SongTable";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Song from "../../Models/Song";
import SongEdit from "../../Components/SongEdit";
import ImportModal from "../../Components/ImportModal";

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
			<ImportModal></ImportModal>
		</>
	);
}

export default Manage;

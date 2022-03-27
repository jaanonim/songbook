import SongTable from "../../Components/SongTable";
import { Flex } from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
import { useState } from "react";
import Song from "../../Models/Song";
import SongEdit from "../../Components/SongEdit";
import ImportDropzone from "../../Components/ImportDropzone";

function Manage() {
	const [song, setSong] = useState<Song | null>(null);

	return (
		<>
			<Flex>
				<ImportDropzone></ImportDropzone>
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
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

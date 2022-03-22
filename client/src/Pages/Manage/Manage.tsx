import SongTable from "../../Components/SongTable";
import { Flex } from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
import { useState } from "react";
import Song from "../../Models/Song";
import SongEdit from "../../Components/SongEdit";

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
				<SongEdit id={song?._id}></SongEdit>
			</Flex>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

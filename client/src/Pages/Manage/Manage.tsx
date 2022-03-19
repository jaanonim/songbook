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
						setSong(null);
						setTimeout(() => {
							setSong(s);
						}, 1);
					}}
					onDelete={(s) => {
						if (s._id == song?._id) {
							setSong(null);
						}
					}}
				/>
				<SongEdit
					song={song}
					onDelete={(s) => {
						setSong(null);
					}}
				></SongEdit>
			</Flex>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

import { Tr, Td, useToast } from "@chakra-ui/react";
import Song from "../../Models/Song";
import DeleteSongButton from "../DeleteSongButton";
import TagList from "../SongTagList";

interface SongTableElementProps {
	song: Song;
	selected: boolean;
	onDelete?: (song: Song) => void;
	onDoubleClick?: (e: any) => void;
}

function SongTableElement(props: SongTableElementProps) {
	return (
		<Tr
			className="noselect"
			backgroundColor={
				props.selected ? "var(--chakra-colors-blue-800)" : "none"
			}
			key={props.song._id}
			onDoubleClick={props.onDoubleClick}
			_hover={
				props.selected
					? {}
					: {
							backgroundColor: "rgba(0,0,0,0.5)",
					  }
			}
			cursor="pointer"
		>
			<Td>
				{props.song.title} ({props.song.author})
			</Td>
			<Td>
				<TagList song={props.song} />
			</Td>
			<Td>
				<DeleteSongButton onDelete={props.onDelete} song={props.song} />
			</Td>
		</Tr>
	);
}

export default SongTableElement;

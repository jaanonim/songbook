import { Tr, Td, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import Song from "../../Models/Song";
import { delSong } from "../../Services/api";
import DeleteButton from "../DeleteButton";
import TagList from "../TagList";

interface SongTableElementProps {
	song: Song;
	selected: boolean;
	onDoubleClick?: (e: any) => void;
}

function SongTableElement(props: SongTableElementProps) {
	const queryClient = useQueryClient();
	const toast = useToast();

	const del = useMutation(delSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Deleted ${props.song.title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

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
				<DeleteButton
					onClick={(e) => {
						e.preventDefault();
						del.mutate({
							id: props.song._id,
						});
						return true;
					}}
				/>
			</Td>
		</Tr>
	);
}

export default SongTableElement;

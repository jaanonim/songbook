import { useToast } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import Song from "../../Models/Song";
import { delSong } from "../../Services/api";
import DeleteButton from "../DeleteButton";

interface SongEditProps {
	song: Song;
	onDelete?: (song: Song) => void;
}

function DeleteSongButton(props: SongEditProps) {
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
		<DeleteButton
			onClick={(e) => {
				e.preventDefault();
				if (props.onDelete) props.onDelete(props.song);
				del.mutate({
					id: props.song._id,
				});
				return true;
			}}
		/>
	);
}

export default DeleteSongButton;

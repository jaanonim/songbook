import { AddIcon } from "@chakra-ui/icons";
import {
	Tag,
	TagLabel,
	TagCloseButton,
	Input,
	IconButton,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import Song from "../../Models/Song";
import { updateSong } from "../../Services/api";
import processTag from "../../Utilities/tag";

interface TagListProps {
	song: Song;
}

function TagList(props: TagListProps) {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [edit, setEdit] = useState(false);

	const saveTag = (str: string) => {
		setEdit(false);
		str = processTag(str);
		if (props.song.tags.filter((t) => t === str).length === 0) {
			if (str.length > 0) {
				props.song.tags = [...props.song.tags, str];
				update.mutate({
					id: props.song._id,
					song: {
						tags: props.song.tags,
					},
				});
			}
		} else {
			toast({
				title: "This song already has this tag",
				status: "error",
			});
		}
	};

	const update = useMutation(updateSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Updated ${props.song.title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	return (
		<>
			{props.song.tags.map((n: string) => (
				<Tag m="1" key={n}>
					<TagLabel>{n}</TagLabel>
					<TagCloseButton
						onClick={(e) => {
							e.preventDefault();
							props.song.tags = props.song.tags.filter(
								(e) => e !== n
							);
							update.mutate({
								id: props.song._id,
								song: {
									tags: props.song.tags,
								},
							});
						}}
					/>
				</Tag>
			))}
			{edit ? (
				<Input
					placeholder="Tag name"
					size="sm"
					width="auto"
					htmlSize={5}
					onBlur={(e) => {
						saveTag(e.target.value);
					}}
					onKeyDown={(e: any) => {
						if (e.key === "Enter") {
							saveTag(e.target.value);
						}
					}}
					autoFocus={true}
				/>
			) : (
				<IconButton
					aria-label="Add tag"
					icon={<AddIcon />}
					h="1.5rem"
					w="1.5rem"
					m="1"
					onClick={(e) => {
						e.preventDefault();
						setEdit(true);
					}}
				/>
			)}
		</>
	);
}

export default TagList;

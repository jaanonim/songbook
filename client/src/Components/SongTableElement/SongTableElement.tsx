import { AddIcon } from "@chakra-ui/icons";
import {
	Tr,
	Td,
	Tag,
	TagLabel,
	TagCloseButton,
	IconButton,
	useToast,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Song from "../../Models/Song";
import { updateSong, delSong } from "../../Services/api";
import processTag from "../../Utilities/tag";
import DeleteButton from "../DeleteButton";

interface SongTableElementProps {
	element: Song;
}

function SongTableElement(props: SongTableElementProps) {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [edit, setEdit] = useState(false);

	const saveTag = (str: string) => {
		setEdit(false);
		str = processTag(str);
		if (str.length > 0) {
			update.mutate({
				id: props.element._id,
				song: {
					tags: [...props.element.tags, str],
				},
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
					title: `Updated song`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	const del = useMutation(delSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Deleted song sucessfully`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	return (
		<Tr key={props.element._id}>
			<Td>
				{props.element.title} ({props.element.author})
			</Td>
			<Td>
				{props.element.tags.map((n: string) => (
					<Tag m="1">
						<TagLabel>{n}</TagLabel>
						<TagCloseButton
							onClick={() => {
								update.mutate({
									id: props.element._id,
									song: {
										tags: props.element.tags.filter(
											(e) => e !== n
										),
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
						onClick={() => setEdit(true)}
					/>
				)}
			</Td>
			<Td>
				<DeleteButton
					onClick={() => {
						del.mutate({
							id: props.element._id,
						});
						return true;
					}}
				/>
			</Td>
		</Tr>
	);
}

export default SongTableElement;

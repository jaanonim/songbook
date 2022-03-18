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
	selected: boolean;
	onDoubleClick?: (e: any) => void;
}

function SongTableElement(props: SongTableElementProps) {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [edit, setEdit] = useState(false);

	const saveTag = (str: string) => {
		setEdit(false);
		str = processTag(str);
		if (props.element.tags.filter((t) => t === str).length === 0) {
			if (str.length > 0) {
				update.mutate({
					id: props.element._id,
					song: {
						tags: [...props.element.tags, str],
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
					title: `Updated ${props.element.title}`,
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
		<Tr
			className="noselect"
			backgroundColor={
				props.selected ? "var(--chakra-colors-blue-800)" : "none"
			}
			key={props.element._id}
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
				{props.element.title} ({props.element.author})
			</Td>
			<Td>
				{props.element.tags.map((n: string) => (
					<Tag m="1" key={n}>
						<TagLabel>{n}</TagLabel>
						<TagCloseButton
							onClick={(e) => {
								e.preventDefault();
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
						onClick={(e) => {
							e.preventDefault();
							setEdit(true);
						}}
					/>
				)}
			</Td>
			<Td>
				<DeleteButton
					onClick={(e) => {
						e.preventDefault();
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

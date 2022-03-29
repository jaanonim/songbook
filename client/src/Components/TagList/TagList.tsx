import { AddIcon } from "@chakra-ui/icons";
import {
	IconButton,
	Input,
	Tag,
	TagCloseButton,
	TagLabel,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import processTag from "../../Utilities/tag";

interface TagListProps {
	tags: string[];
	saveTags?: (str: string[]) => void;
}

function TagList(props: TagListProps) {
	const [edit, setEdit] = useState(false);
	const [tags, setTags] = useState(props.tags);
	const toast = useToast();

	useEffect(() => {
		setTags(props.tags);
	}, [props.tags]);

	const saveTag = (str: string) => {
		setEdit(false);
		str = processTag(str);
		if (tags.filter((t) => t === str).length === 0) {
			if (str.length > 0) {
				props.saveTags ? props.saveTags([...tags, str]) : null;
				setTags([...tags, str]);
			}
		} else {
			toast({
				title: "This song already has this tag",
				status: "error",
			});
		}
	};

	return (
		<>
			{tags.map((n: string) => (
				<Tag m="1" key={n}>
					<TagLabel>{n}</TagLabel>
					<TagCloseButton
						onClick={(e) => {
							e.preventDefault();
							props.saveTags
								? props.saveTags(tags.filter((e) => e !== n))
								: null;
							setTags(tags.filter((e) => e !== n));
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

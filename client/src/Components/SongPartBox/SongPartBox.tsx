import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	IconButton,
	Spacer,
	Text,
	toast,
	useToast,
} from "@chakra-ui/react";
import Song from "../../Models/Song";
import SongPart from "../../Models/SongPart";
import AddSongPart from "../UpdateSongPart";
import DeleteButton from "../DeleteButton";

import firstUpper from "../../Utilities/text";
import useUpdateSong from "../../Hooks/useUpdateSong";

interface SongPartBoxInterface {
	part: SongPart;
	song: Song;
}

function SongPartBox(props: SongPartBoxInterface) {
	const update = useUpdateSong(props.song.title);

	return (
		<Container border="2px" borderRadius="5" mt="4" mb="4">
			<Flex justify="center" mt="2" mb="2">
				<Box p="2">
					<Heading as="h3" size="sm">
						{firstUpper(props.part.type)}
					</Heading>
				</Box>
				<Spacer />
				<Box>
					<AddSongPart song={props.song} part={props.part}>
						<EditIcon />
					</AddSongPart>
					<DeleteButton
						onClick={(e) => {
							update.mutate({
								id: props.song._id,
								song: {
									parts: props.song.parts.filter(
										(part) => part.id !== props.part.id
									),
								},
							});
							return true;
						}}
					/>
				</Box>
			</Flex>
			<Divider />
			<Text mt="2" mb="2" whiteSpace="pre">
				{props.part.text}
			</Text>
		</Container>
	);
}

export default SongPartBox;

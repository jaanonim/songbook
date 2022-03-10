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
} from "@chakra-ui/react";
import DeleteButton from "../DeleteButton";

interface SongPartBoxInterface {
	name: string;
	text: string;
}

function SongPartBox(props: SongPartBoxInterface) {
	return (
		<Container border="2px" borderRadius="5" mt="4" mb="4">
			<Flex justify="center" mt="2" mb="2">
				<Box p="2">
					<Heading as="h3" size="sm">
						{props.name}
					</Heading>
				</Box>
				<Spacer />
				<Box>
					<IconButton
						size="sm"
						aria-label="edit"
						icon={<EditIcon />}
					></IconButton>
					<DeleteButton />
				</Box>
			</Flex>
			<Divider />
			<Text mt="2" mb="2">
				{props.text}
			</Text>
		</Container>
	);
}

export default SongPartBox;

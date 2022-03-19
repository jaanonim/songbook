import { EditIcon, AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	Heading,
	Editable,
	EditablePreview,
	EditableInput,
	IconButton,
	Text,
	Alert,
	AlertIcon,
	useToast,
} from "@chakra-ui/react";
import Song from "../../Models/Song";
import DeleteButton from "../DeleteButton";
import SongEditableInput from "../EditableInput";
import SongPartBox from "../SongPartBox";

interface SongEditProps {
	song: Song | null;
}

function SongEdit(props: SongEditProps) {
	if (!props.song)
		return (
			<Box
				w="100vw"
				h="100vh"
				display="flex"
				alignItems="center"
				flexDirection="row"
			>
				<Alert
					status="info"
					m={2}
					borderRadius={5}
					ml="auto"
					mr="auto"
					w="sm"
				>
					<AlertIcon />
					Select a song.
				</Alert>
			</Box>
		);
	else {
		return (
			<Box w="100vw" h="100vh">
				<Center>
					<Heading as="h2" size="xl" mt="5">
						<SongEditableInput
							id={props.song._id}
							name="title"
							value={props.song.title}
							textAlign="center"
							getObject={(value) => {
								return {
									title: value,
								};
							}}
						/>
					</Heading>
				</Center>
				<Center mt="4">
					<Text display="inline-block">Author:</Text>
					<SongEditableInput
						id={props.song._id}
						name="author"
						value={props.song.author}
						ml="1"
						canBeEmpty={true}
						display="inline-block"
						getObject={(value) => {
							return {
								author: value,
							};
						}}
					/>
				</Center>
				<Center m="2">
					<IconButton
						m="2"
						size="sm"
						aria-label="edit"
						icon={<EditIcon />}
					></IconButton>
					<IconButton
						m="2"
						size="sm"
						aria-label="add part"
						icon={<AddIcon />}
					></IconButton>
					<DeleteButton />
				</Center>
				<Center>
					<Box
						w="calc(70ch + 1rem)"
						overflowY="scroll"
						maxHeight="70vh"
						borderBottom="1px"
						borderTop="1px"
						borderColor="rgba(255,255,255,0.1)"
					>
						<SongPartBox
							name="Chorus"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
						/>
						<SongPartBox
							name="Chorus"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
						/>
					</Box>
				</Center>
			</Box>
		);
	}
}

export default SongEdit;

import { AddIcon } from "@chakra-ui/icons";
import {
	Alert,
	AlertIcon,
	Box,
	Center,
	Heading,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Song from "../../Models/Song";
import { getSong } from "../../Services/api";
import DeleteSongButton from "../DeleteSongButton";
import SongEditableInput from "../EditableInput";
import EditSongData from "../EditSongData";
import SongPartBox from "../SongPartBox";
import TagList from "../SongTagList";
import UpdateSongPart from "../UpdateSongPart";

interface SongEditProps {
	id?: string;
}

function SongEdit(props: SongEditProps) {
	const { isLoading, isError, data, error } = useQuery(
		["song", props.id],
		getSong,
		{
			enabled: !!props.id,
		}
	);

	if (!props.id)
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
		if (isLoading) {
			return (
				<Center w="100%">
					<Spinner size="xl" />
				</Center>
			);
		} else if (isError) {
			return (
				<Box
					w="100vw"
					h="100vh"
					display="flex"
					alignItems="center"
					flexDirection="row"
				>
					<Alert
						status="error"
						m={2}
						borderRadius={5}
						ml="auto"
						mr="auto"
						w="sm"
					>
						<AlertIcon />
						{(error as Error).message}
					</Alert>
				</Box>
			);
		} else {
			const song = new Song(data);
			return (
				<Box w="100vw" h="100vh">
					<Center>
						<Heading as="h2" size="xl" mt="5">
							<SongEditableInput
								id={song._id}
								name="title"
								value={song.title}
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
							id={song._id}
							name="author"
							value={song.author}
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
					<Center mt="2">
						<TagList song={song} />
					</Center>
					<Center m="2">
						<EditSongData song={song} />
						<UpdateSongPart song={song} part={undefined}>
							<AddIcon />
						</UpdateSongPart>
						<DeleteSongButton song={song} />
					</Center>
					<Center>
						{song.parts ? (
							<Box
								w="calc(70ch + 1rem)"
								overflowY="scroll"
								maxHeight="70vh"
								borderBottom="1px"
								borderTop="1px"
								borderColor="rgba(255,255,255,0.1)"
							>
								{song.parts.map((part) => (
									<SongPartBox
										key={part.id}
										part={part}
										song={song}
									/>
								))}
							</Box>
						) : (
							<Alert
								status="info"
								m={2}
								borderRadius={5}
								ml="auto"
								mr="auto"
								w="sm"
							>
								<AlertIcon />
								No song parts here.
							</Alert>
						)}
					</Center>
				</Box>
			);
		}
	}
}

export default SongEdit;

import {
	Button,
	Center,
	Heading,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDownload } from "react-icons/md";
import { ExportTypes } from "../../Models/ExportTypes";
import Song from "../../Models/Song";
import SongTable from "../SongTable";
import SongTableElementSmall from "../SongTableElementSmall";

enum States {
	SONG,
	TYPE,
	EXPORT,
}

function ExportModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [state, setState] = useState(States.SONG);
	const [type, setType] = useState(Object.entries(ExportTypes)[0][0]);
	const [songs, setSongs] = useState<Song[] | null>(null);

	const myClose = () => {
		setState(States.SONG);
		setSongs(null);
		setType(Object.entries(ExportTypes)[0][0]);
		onClose();
	};

	return (
		<>
			<IconButton
				aria-label="Import"
				icon={<MdDownload />}
				onClick={onOpen}
			></IconButton>
			<Modal size="xl" isOpen={isOpen} onClose={myClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Export songs</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{state === States.SONG ? (
							<Center w="100%">
								<Stack>
									<Text mb={3}>Select songs to export.</Text>
									<SongTable
										onSongUpdate={(s) => {
											setSongs(s);
										}}
										selected={
											songs == null ? undefined : songs
										}
										h={"50vh"}
										element={SongTableElementSmall}
										multiple={true}
										disableAdd={true}
										selectAll={true}
									/>
								</Stack>
							</Center>
						) : (
							<Center>
								<Stack>
									<Text mb={3}>
										Select format of exportet songs.
									</Text>
									<RadioGroup onChange={setType} value={type}>
										<Stack>
											{Object.entries(ExportTypes).map(
												([key, value]) => (
													<Radio value={key}>
														<Heading
															size="md"
															ml={1}
														>
															{value.name}
														</Heading>
														<Text ml={1}>
															{value.description}
														</Text>
													</Radio>
												)
											)}
										</Stack>
									</RadioGroup>
								</Stack>
							</Center>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							mr={3}
							variant="ghost"
							onClick={() => {
								if (state === States.SONG) {
									myClose();
								} else {
									setState(States.SONG);
								}
							}}
						>
							{state === States.SONG ? "Cancel" : "Back"}
						</Button>
						<Button
							colorScheme="blue"
							onClick={() => {
								setState(States.TYPE);
							}}
							disabled={songs?.length === 0 || songs == null}
						>
							{state === States.SONG ? "Next" : "Export"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ExportModal;

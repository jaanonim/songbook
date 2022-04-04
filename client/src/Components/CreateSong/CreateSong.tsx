import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { RefObject, useRef, useState } from "react";
import useCreateSong from "../../Hooks/useCreateSong";
import Song from "../../Models/Song";

interface CreateSongProps {
	onCreate: (song: Song) => void;
}

function CreateSong(props: CreateSongProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLInputElement>;
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const create = useCreateSong((song) => {
		props.onCreate(song);
	});

	return (
		<>
			<IconButton
				aria-label="Add tag"
				icon={<AddIcon />}
				ml="2"
				onClick={() => {
					onOpen();
					setAuthor("");
					setTitle("");
				}}
			/>
			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>Create song</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl isRequired>
							<FormLabel>Title</FormLabel>
							<Input
								ref={initialRef}
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Author</FormLabel>
							<Input
								placeholder="Author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onClose} mr={3}>
							Cancel
						</Button>
						<Button
							colorScheme="blue"
							onClick={() => {
								onClose();
								create.mutate({
									song: {
										title,
										author,
										parts: [],
										other: "",
									},
								});
							}}
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CreateSong;

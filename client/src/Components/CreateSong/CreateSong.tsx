import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	useDisclosure,
	IconButton,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import { useRef, RefObject, useState } from "react";
import useCreateSong from "../../Hooks/useCreateSong";

const CreateSong = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLInputElement>;
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const create = useCreateSong();

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
						<Button
							colorScheme="blue"
							mr={3}
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
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateSong;

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
import { useQueryClient, useMutation } from "react-query";
import { createSong, updateSong } from "../../Services/api";

const CreateSong = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLInputElement>;
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const queryClient = useQueryClient();
	const toast = useToast();

	const create = useMutation(createSong, {
		onSettled: (newItem, error, variables, context) => {
			if (error) {
				toast({
					title: (error as Error).message,
					status: "error",
				});
			} else {
				toast({
					title: `Created ${variables.song.title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	return (
		<>
			<IconButton
				aria-label="Add tag"
				icon={<AddIcon />}
				ml="2"
				onClick={() => onOpen()}
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
									song: { title, author, parts: [] },
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

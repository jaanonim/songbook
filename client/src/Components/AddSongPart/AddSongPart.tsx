import { AddIcon } from "@chakra-ui/icons";
import {
	useDisclosure,
	IconButton,
	Modal,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalContent,
	ModalOverlay,
	FormControl,
	Radio,
	RadioGroup,
	Stack,
	Textarea,
	Button,
	ModalFooter,
	useToast,
} from "@chakra-ui/react";
import React, { RefObject, useRef } from "react";
import { useQueryClient, useMutation } from "react-query";
import PartType from "../../Models/PartTypes";
import Song from "../../Models/Song";
import { updateSong } from "../../Services/api";

interface AddSongPartProps {
	song: Song;
}

function AddSongPart(props: AddSongPartProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLInputElement>;
	const PartTypesArr = Object.keys(PartType) as Array<keyof typeof PartType>;
	const queryClient = useQueryClient();
	const toast = useToast();
	const [value, setValue] = React.useState(PartType.VERSE);
	let [text, setText] = React.useState("");
	let handleInputChange = (e: any) => {
		let inputValue = e.target.value;
		setText(inputValue);
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
					title: `Updated ${props.song.title}`,
					status: "success",
				});
				queryClient.invalidateQueries("song");
			}
		},
	});

	return (
		<>
			<IconButton
				m="2"
				size="sm"
				aria-label="add part"
				icon={<AddIcon />}
				onClick={() => onOpen()}
			></IconButton>
			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>Create song part</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl p={3} display="block">
							<RadioGroup
								onChange={(v: any) => setValue(v)}
								value={value}
							>
								<Stack direction="row">
									{PartTypesArr.map((key) => (
										<Radio
											key={key}
											value={PartType[key]}
											name="partType"
										>
											{PartType[key]}
										</Radio>
									))}
								</Stack>
							</RadioGroup>
						</FormControl>
						<FormControl p={3} display="block">
							<Textarea
								value={text}
								onChange={handleInputChange}
								placeholder="Enter lyrics"
								size="md"
								height="50vh"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								props.song.parts.push({
									id: props.song.parts.length,
									type: value,
									lirycs: text,
								});
								update.mutate({
									id: props.song._id,
									song: { parts: props.song.parts },
								});
								onClose();
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
}

export default AddSongPart;

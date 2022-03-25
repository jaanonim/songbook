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
import SongPart from "../../Models/SongPart";
import { updateSong } from "../../Services/api";
import firstUpper from "../../Utilities/text";

interface UpdateSongPartProps {
	song: Song;
	part?: SongPart;
	children: React.ReactNode;
}

function UpdateSongPart(props: UpdateSongPartProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLTextAreaElement>;
	const PartTypesArr = Object.keys(PartType) as Array<keyof typeof PartType>;
	const queryClient = useQueryClient();
	const toast = useToast();
	const [value, setValue] = React.useState(
		props.part ? props.part.type : PartType.VERSE
	);
	let [text, setText] = React.useState(props.part ? props.part.lirycs : "");
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
				icon={<>{props.children}</>}
				onClick={() => onOpen()}
			></IconButton>
			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				size="3xl"
			>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>
						{props.part ? "Update" : "Create"} song part
					</ModalHeader>
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
											{firstUpper(PartType[key])}
										</Radio>
									))}
								</Stack>
							</RadioGroup>
						</FormControl>
						<FormControl p={3} display="block">
							<Textarea
								ref={initialRef}
								value={text}
								onChange={handleInputChange}
								placeholder="Enter lyrics"
								size="md"
								height="50vh"
								width="100%"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								if (props.part != undefined) {
									props.song.parts.map((part) => {
										if (part.id === props.part?.id) {
											part.type = value;
											part.lirycs = text;
										}
										return part;
									});
								} else {
									props.song.parts.push(
										new SongPart({
											id: props.song.parts.length,
											type: value,
											lirycs: text,
										})
									);
								}

								update.mutate({
									id: props.song._id,
									song: { parts: props.song.parts },
								});
								onClose();
							}}
						>
							{props.part ? "Update" : "Create"}
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default UpdateSongPart;

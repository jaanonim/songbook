import {
	Button,
	FormControl,
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
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import React, { RefObject, useRef } from "react";
import useUpdateSong from "../../Hooks/useUpdateSong";
import PartType from "../../Models/PartTypes";
import Song from "../../Models/Song";
import SongPart from "../../Models/SongPart";
import { firstUpper } from "../../Utilities/text";

interface UpdateSongPartProps {
	song: Song;
	part?: SongPart;
	children: React.ReactNode;
}

function UpdateSongPart(props: UpdateSongPartProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLTextAreaElement>;
	const PartTypesArr = Object.keys(PartType) as Array<keyof typeof PartType>;
	const [value, setValue] = React.useState(
		props.part ? props.part.type : PartType.VERSE
	);
	let [text, setText] = React.useState(props.part ? props.part.text : "");
	let handleInputChange = (e: any) => {
		let inputValue = e.target.value;
		setText(inputValue);
	};

	const update = useUpdateSong(props.song.title);

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
						<Button onClick={onClose} mr={3}>
							Cancel
						</Button>
						<Button
							colorScheme="blue"
							onClick={() => {
								if (props.part != undefined) {
									props.song.parts.map((part) => {
										if (part.id === props.part?.id) {
											part.type = value;
											part.text = text;
										}
										return part;
									});
								} else {
									props.song.parts.push(
										new SongPart({
											id: props.song.parts.length,
											type: value,
											text: text,
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
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default UpdateSongPart;

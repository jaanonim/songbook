import { EditIcon, QuestionIcon } from "@chakra-ui/icons";
import {
	useDisclosure,
	useToast,
	IconButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	Textarea,
	ModalFooter,
	Button,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	TabPanels,
	Radio,
	RadioGroup,
	Stack,
	Flex,
	Spacer,
	HStack,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/react";
import { useRef, RefObject, useState } from "react";
import useUpdateSong from "../../Hooks/useUpdateSong";
import PartType from "../../Models/PartTypes";
import Song from "../../Models/Song";
import { typeToDirective } from "../../Utilities/chordpro";
import firstUpper from "../../Utilities/text";

interface SongPartBoxProps {
	song: Song;
}

function EditSongData(props: SongPartBoxProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const lirycsRef = useRef() as RefObject<HTMLTextAreaElement>;
	const [selectedType, setSelectedType] = useState(PartType.VERSE);
	const PartTypesArr = Object.keys(PartType) as Array<keyof typeof PartType>;

	let [lirycs, setLirycs] = useState(props.song.partsToChrodPro());

	let [other, setOther] = useState(props.song.other);

	const update = useUpdateSong(props.song.title);

	const handleInsert = () => {
		if (lirycsRef.current) {
			lirycsRef.current.focus();
			const startPos = lirycsRef.current.selectionStart;
			const endPos = lirycsRef.current.selectionEnd;

			const before = lirycs.substring(0, startPos);
			const center = lirycs.substring(startPos, endPos);
			const after = lirycs.substring(endPos, lirycs.length);

			const directives = typeToDirective(selectedType);

			setLirycs(
				`${before}${directives[0]}\n${center}\n${directives[1]}${after}`
			);
		}
	};

	return (
		<>
			<IconButton
				size="sm"
				aria-label="add part"
				icon={<EditIcon></EditIcon>}
				onClick={() => onOpen()}
			></IconButton>
			<Modal
				initialFocusRef={lirycsRef}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				size="3xl"
			>
				<ModalOverlay backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>Edit song</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Tabs>
							<TabList>
								<Tab>Lyrics</Tab>
								<Tab>Other</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<FormControl p={3} display="block">
										<Textarea
											ref={lirycsRef}
											value={lirycs}
											onChange={(e) =>
												setLirycs(e.target.value)
											}
											placeholder="Enter lyrics"
											size="md"
											height="50vh"
											width="100%"
										/>
									</FormControl>
									<HStack>
										<FormControl p={3} w="auto">
											<RadioGroup
												onChange={(v: any) =>
													setSelectedType(v)
												}
												value={selectedType}
											>
												<Stack direction="row">
													{PartTypesArr.map((key) => (
														<Radio
															key={key}
															value={
																PartType[key]
															}
															name="partType"
														>
															{firstUpper(
																PartType[key]
															)}
														</Radio>
													))}
												</Stack>
											</RadioGroup>
										</FormControl>
										<Button onClick={handleInsert}>
											Insert
										</Button>
										<Spacer></Spacer>
										<Popover>
											<PopoverTrigger>
												<IconButton
													size="md"
													variant="ghost"
													aria-label="help"
													icon={<QuestionIcon />}
												></IconButton>
											</PopoverTrigger>
											<PopoverContent>
												<PopoverArrow />
												<PopoverCloseButton />
												<PopoverHeader
													pt={4}
													fontWeight="bold"
													border="0"
												>
													Help
												</PopoverHeader>
												<PopoverBody>
													Lorem ipsum dolor, sit amet
													consectetur adipisicing
													elit. Assumenda ad
													praesentium cum nobis.
													Fugiat provident dolor
													harum. Inventore magnam
													consectetur dolorum totam
													voluptatem. Non odio aliquid
													totam quae vero consectetur!{" "}
												</PopoverBody>
											</PopoverContent>
										</Popover>
									</HStack>
								</TabPanel>
								<TabPanel>
									<FormControl p={3} display="block">
										<Textarea
											value={other}
											onChange={(e) =>
												setOther(e.target.value)
											}
											placeholder="Enter other song data"
											size="md"
											height="50vh"
											width="100%"
										/>
									</FormControl>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								onClose();
								props.song.parts =
									props.song.setPartsFromChrodPro(lirycs);
								update.mutate({
									id: props.song._id,
									song: {
										other: other,
										parts: props.song.parts,
									},
								});
							}}
						>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditSongData;

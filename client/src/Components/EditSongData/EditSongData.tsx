import { EditIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useRef, RefObject, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PartType from "../../Models/PartTypes";
import { updateSong } from "../../Services/api";
import firstUpper from "../../Utilities/text";
import text from "../../Utilities/text";

function EditSongData(props: any) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef() as RefObject<HTMLTextAreaElement>;
	const queryClient = useQueryClient();
	const toast = useToast();
	const [value, setValue] = useState(
		props.part ? props.part.type : PartType.VERSE
	);
	const PartTypesArr = Object.keys(PartType) as Array<keyof typeof PartType>;

	let [text, setText] = useState(props.part ? props.part.lirycs : "");
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
				size="sm"
				aria-label="add part"
				icon={<EditIcon></EditIcon>}
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
											ref={initialRef}
											value={text}
											onChange={handleInputChange}
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
													setValue(v)
												}
												value={value}
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
										<Button>Insert</Button>
									</HStack>
								</TabPanel>
								<TabPanel>
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
								</TabPanel>
							</TabPanels>
						</Tabs>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
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

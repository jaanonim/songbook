import { AddIcon, QuestionIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Checkbox,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Heading,
	IconButton,
	Input,
	Table,
	Tag,
	TagCloseButton,
	TagLabel,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
} from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
import DeleteButton from "../../Components/DeleteButton";
import SongPartBox from "../../Components/SongPartBox";
import "./Manage.css";

function Manage() {
	interface Song {
		id: string;
		title: string;
		author: string;
		tags: string[];
	}
	const columns = ["title", "author", "tags"];

	const data = [
		{
			id: "1",
			title: "Manage",
			author: "jaanonim",
			tags: ["tag1", "tag2"],
		},
		{
			id: "2",
			title: "Manage1",
			author: "jaanonim",
			tags: ["tag1", "tag2", "tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
		{
			id: "3",
			title: "Manage2",
			author: "jaanonim",
			tags: ["tag3"],
		},
	];

	return (
		<>
			<Flex>
				<Box
					w="100vw"
					h="calc(100vh - 2rem)"
					border="1px"
					borderColor="rgba(255,255,255,0.1)"
					borderRadius={5}
					m="1rem"
				>
					<Box m="1rem" h="2.5rem">
						<Flex justify="center">
							<Tooltip label="Use # to search by tag 😉">
								<Input placeholder="Search" />
							</Tooltip>
							<IconButton
								aria-label="Add tag"
								icon={<AddIcon />}
								ml="2"
							/>
						</Flex>
					</Box>
					<Divider />

					<Box h="calc(100vh - 1px - 6.5rem)" overflowY="scroll">
						<Table>
							<Tbody>
								{data.map((element: Song) => (
									<Tr>
										<Td>
											{element.title} ({element.author})
										</Td>
										<Td>
											{element.tags.map((n: string) => (
												<Tag m="1">
													<TagLabel>{n}</TagLabel>
													<TagCloseButton />
												</Tag>
											))}

											<IconButton
												aria-label="Add tag"
												icon={<AddIcon />}
												h="1.5rem"
												w="1.5rem"
												m="1"
											/>
										</Td>
										<Td>
											<DeleteButton />
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				</Box>
				<Box w="100vw" h="100vh">
					<Center>
						<Heading as="h2" size="xl" mt="5">
							<Editable defaultValue="Title">
								<EditablePreview />
								<EditableInput textAlign="center" />
							</Editable>
						</Heading>
					</Center>
					<Center m="4">
						<Text display="inline-block">Author:</Text>
						<Editable
							defaultValue="Author"
							display="inline-block"
							ml="1ch"
						>
							<EditablePreview />
							<EditableInput />
						</Editable>
					</Center>
					<Center>
						<Box
							w="calc(70ch + 1rem)"
							overflowY="scroll"
							maxHeight="70vh"
							borderBottom="1px"
							borderTop="1px"
							borderColor="rgba(255,255,255,0.1)"
						>
							<SongPartBox
								name="Chorus"
								text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
							/>
							<SongPartBox
								name="Chorus"
								text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
							/>
						</Box>
					</Center>
					<Center>
						<Button variant="ghost" m="2">
							Edit other data
						</Button>
					</Center>
				</Box>
			</Flex>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

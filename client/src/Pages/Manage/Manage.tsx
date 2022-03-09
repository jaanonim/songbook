import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Heading,
	IconButton,
	Table,
	Tag,
	TagCloseButton,
	TagLabel,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
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
	];

	return (
		<>
			<Flex>
				<Box w="100vw" h="100vh">
					<Table>
						<Thead>
							<Tr>
								{columns.map((name: string) => (
									<Th>{name}</Th>
								))}
							</Tr>
						</Thead>
						<Tbody h="vh" overflowY="scroll">
							{data.map((element: Song) => (
								<Tr>
									<Td>{element.title}</Td>
									<Td>{element.author}</Td>
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
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
				<Box w="100vw" h="100vh">
					<Center>
						<Heading as="h2" size="xl">
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
					<Box>
						<SongPartBox
							name="Chorus"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
						/>
						<SongPartBox
							name="Chorus"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos ea excepturi incidunt maiores corporis culpa, perspiciatis suscipit aliquam, dolorem itaque. Corporis aliquid minus, dolores natus officia animi voluptatum temporibus."
						/>
					</Box>
				</Box>
			</Flex>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

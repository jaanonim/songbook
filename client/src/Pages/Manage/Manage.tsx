import SongTable from "../../Components/SongTable";
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
import SongPartBox from "../../Components/SongPartBox";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import DeleteButton from "../../Components/DeleteButton";

function Manage() {
	return (
		<>
			<Flex>
				<SongTable />
				<Box w="100vw" h="100vh">
					<Center>
						<Heading as="h2" size="xl" mt="5">
							<Editable defaultValue="Title">
								<EditablePreview />
								<EditableInput textAlign="center" />
							</Editable>
						</Heading>
					</Center>
					<Center mt="4">
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
					<Center m="2">
						<IconButton
							m="2"
							size="sm"
							aria-label="edit"
							icon={<EditIcon />}
						></IconButton>
						<IconButton
							m="2"
							size="sm"
							aria-label="add part"
							icon={<AddIcon />}
						></IconButton>
						<DeleteButton />
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
				</Box>
			</Flex>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

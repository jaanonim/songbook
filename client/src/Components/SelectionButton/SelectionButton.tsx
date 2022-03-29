import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { ThemeTypings } from "@chakra-ui/styled-system";
import { Link } from "react-router-dom";

interface SelectionButtonInterface {
	color: ThemeTypings["colorSchemes"];
	url: string;
	title: string;
	subtitle: string;
}

function SelectionButton(props: SelectionButtonInterface) {
	return (
		<Link to={props.url}>
			<Button
				colorScheme={props.color}
				variant="outline"
				m="5"
				p="7"
				h="auto"
				w="3xs"
			>
				<Stack>
					<Heading as="h3">{props.title}</Heading>
					<Text as="p">{props.subtitle}</Text>
				</Stack>
			</Button>
		</Link>
	);
}

export default SelectionButton;

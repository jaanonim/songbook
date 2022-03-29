import { Center, Container, Flex, Heading, Stack } from "@chakra-ui/react";
import ColorModeButton from "../../Components/ColorModeButton";
import SelectionButton from "../../Components/SelectionButton";
import "./Selection.css";

function Selection() {
	return (
		<div id="container">
			<Container as="main">
				<Center>
					<Stack spacing={5}>
						<Center>
							<Heading as="h1" size="2xl">
								SongBook
							</Heading>
						</Center>
						<Center>
							<Heading as="h2" size="md">
								Select what you will do:
							</Heading>
						</Center>
					</Stack>
				</Center>
				<Center>
					<Flex>
						<SelectionButton
							color="orange"
							url="/manage"
							title="Manage"
							subtitle="Manage your songs"
						></SelectionButton>
						<SelectionButton
							color="blue"
							url="/present"
							title="Present"
							subtitle="Present your songs"
						></SelectionButton>
						<SelectionButton
							color="green"
							url="/screen"
							title="Screen"
							subtitle="Screen for presentation"
						></SelectionButton>
					</Flex>
				</Center>
			</Container>
			<ColorModeButton fixed={true} />
		</div>
	);
}

export default Selection;

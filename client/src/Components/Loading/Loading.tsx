import { Flex, Spinner } from "@chakra-ui/react";

function Loading() {
	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
		>
			<Spinner size="lg" />
		</Flex>
	);
}

export default Loading;

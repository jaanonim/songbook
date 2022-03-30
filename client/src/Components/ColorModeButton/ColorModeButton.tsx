import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

function ColorModeButton() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button onClick={toggleColorMode}>
			{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
}

export default ColorModeButton;

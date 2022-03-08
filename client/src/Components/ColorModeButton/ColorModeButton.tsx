import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Button, position } from "@chakra-ui/react";

interface ColorModeButtonInterface {
	fixed?: boolean;
}

function ColorModeButton(props: ColorModeButtonInterface) {
	const { colorMode, toggleColorMode } = useColorMode();

	if (props?.fixed)
		return (
			<Button
				onClick={toggleColorMode}
				style={{ position: "fixed", top: "10px", right: "10px" }}
			>
				{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			</Button>
		);
	else
		return (
			<Button onClick={toggleColorMode}>
				{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			</Button>
		);
}

export default ColorModeButton;

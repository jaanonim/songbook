import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Link, useColorMode } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";
import ColorModeButton from "../../Components/ColorModeButton";

function Manage() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Link as={RLink} to="/">
				Home
			</Link>
			<ColorModeButton fixed={true} />
		</>
	);
}

export default Manage;

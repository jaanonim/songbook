import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Link, useColorMode } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";
import "./App.css";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Link as={RLink} to="/home">
				Home
			</Link>
			<Button onClick={toggleColorMode}>
				{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			</Button>
		</>
	);
}

export default App;

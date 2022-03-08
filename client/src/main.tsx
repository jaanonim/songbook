import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import Manage from "./Pages/Manage";
import Selection from "./Pages/Selection";
import "./index.css";
import theme from "./theme";

render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Selection />} />
					<Route path="/manage" element={<Manage />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

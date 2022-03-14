import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";
import Manage from "./Pages/Manage";
import Selection from "./Pages/Selection";
import "./index.css";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<ChakraProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Selection />} />
						<Route path="/manage" element={<Manage />} />
					</Routes>
				</BrowserRouter>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

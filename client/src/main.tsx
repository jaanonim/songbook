import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import "./index.css";
import theme from "./theme";
const Manage = React.lazy(() => import("./Pages/Manage"));
const Selection = React.lazy(() => import("./Pages/Selection"));
const Present = React.lazy(() => import("./Pages/Present"));
const Screen = React.lazy(() => import("./Pages/Screen"));
const ScreenCode = React.lazy(() => import("./Pages/ScreenCode"));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <Selection />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="/manage"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <Manage />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="/present"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <Present />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="/screen"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <ScreenCode />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="/screen/:code"
                            element={
                                <React.Suspense fallback={<Loading />}>
                                    <Screen />
                                </React.Suspense>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

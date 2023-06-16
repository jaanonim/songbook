import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import "./index.css";
import theme from "./theme";
import config from "./Config/config";

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

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                {config.reactQueryDevtools ? (
                    <ReactQueryDevtools initialIsOpen={false} />
                ) : null}
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <ChakraProvider theme={theme}>
                    <DndProvider backend={HTML5Backend}>
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
                    </DndProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { MantineProvider } from "@mantine/core";
import Nav from "../components/Nav";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
function Pagerouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MantineProvider defaultColorScheme="dark">
					<img
						className="fixed left-0 top-0 w-dvw h-dvh brightness-50 contrast-100 blur-sm -z-10"
						src="/intro.png"
					></img>
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</MantineProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default Pagerouter;

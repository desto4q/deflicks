import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { MantineProvider } from "@mantine/core";
import Nav from "../components/Nav";
import { QueryClientProvider, QueryClient } from "react-query";
import SearchPage from "../pages/SearchPage";
import Series from "../pages/Series";
import MovieWatch from "../pages/MovieWatch";

const queryClient = new QueryClient();
function Pagerouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MantineProvider defaultColorScheme="dark">
					<div className="fixed -z-10 h-dvh w-full top-0 left-0">
						<img
							src="/intro.png"
							className="h-full w-full object-cover blur-sm"
						></img>
						<div className="absolute h-full w-full bg-black left-0 top-0 opacity-80"></div>
					</div>
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/series" element={<Series />} />
						<Route path="/movie/:name/:id" element={<MovieWatch />} />
						<Route path="/search/:searchParam" element={<SearchPage />} />
					</Routes>
				</MantineProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default Pagerouter;

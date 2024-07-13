import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { MantineProvider, createTheme } from "@mantine/core";
import Nav from "../components/Nav";
import { QueryClientProvider, QueryClient } from "react-query";
import SearchPage from "../pages/SearchPage";
import Series from "../pages/Series";
import MovieWatch from "../pages/MovieWatch";
import SeriesName from "../pages/SeriesName";
import SeriesWatch from "../pages/SeriesWatch";
import Nopage from "../pages/Nopage";

const queryClient = new QueryClient();
let theme = createTheme({
	breakpoints: { mmd: "65rem" },
});
function Pagerouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MantineProvider defaultColorScheme="dark" theme={theme}>
					<div className="fixed -z-10 h-dvh w-full top-0 left-0">
						<img
							src="https://i.postimg.cc/LXvymB15/intro.jpg"
							className="h-full w-full object-cover blur-sm"
						></img>
						<div className="absolute h-full w-full bg-black left-0 top-0 opacity-80"></div>
					</div>
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/series" element={<Series />} />
						<Route path="/movie/:name/:id" element={<MovieWatch />} />
						<Route path="/series/:name/:id" element={<SeriesName />} />
						<Route path="/search/:searchParam" element={<SearchPage />} />
						<Route
							path="/watch/:name/:id/season/:seasonid/episode/:episodeid"
							element={<SeriesWatch />}
						/>
						<Route path="/404" element={<Nopage />} />
					</Routes>
				</MantineProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default Pagerouter;

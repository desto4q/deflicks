import { useQuery } from "react-query";
import Slidecaro from "../components/SlideCaro";
import { useSearchParams } from "react-router-dom";
import { now_playing } from "../api/api";
import { Movies } from "../types/typedeclaration";
import { ReactNode } from "react";
import MovieCard from "../components/sub/MovieCard";
import { Center, Grid, Loader, Pagination } from "@mantine/core";
import Feed from "../components/Feed";
import Trends from "../components/Trends";
function Home() {

	
	let [searchParams, setSearchParams] = useSearchParams();
	let pageNum: number = Number(searchParams.get("page"));

	let { data, isLoading } = useQuery<Movies>([pageNum], () => {
		return now_playing({ page: pageNum ? pageNum : 1 });
	});
	let Card: ReactNode[] | undefined = data?.results?.map(
		({ title, id, poster_path }) => {
			return <MovieCard title={title} key={id} poster_path={poster_path} />;
		}
	);
	return (
		<>
			<Slidecaro />
			<Grid className="container mx-auto " overflow="hidden">
				<Grid.Col span={{ base: 12, md: "content" }}>
					{isLoading ? (
						<Center className="mt-4 bg-neutral-900 rounded-sm p-6">
							<Loader color="yellow" />
						</Center>
					) : (
						<Feed className="w-max" content={Card} title="Recents Movies" />
					)}
					<Center className="container  mx-auto  my-6 ">
						<Pagination
							color="orange"
							value={pageNum}
							onChange={(e) => {
								setSearchParams({ page: `${e}` });
							}}
							total={data ? data?.total_pages : 0}
						></Pagination>
					</Center>
				</Grid.Col>

				<Grid.Col span={{ base: 0, md: "auto" }} visibleFrom="md">
					<Trends />
				</Grid.Col>
			</Grid>
		</>
	);
}

export default Home;

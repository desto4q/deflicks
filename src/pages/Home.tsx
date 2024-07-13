import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { now_playing } from "../api/api";
import { Movies } from "../types/typedeclaration";
import { ReactNode } from "react";
import MovieCard from "../components/sub/MovieCard";
import { Center, Grid, Loader, Pagination } from "@mantine/core";
import Feed from "../components/Feed";
import Trends from "../components/Trends";
import NewSlider, { Refetcher } from "../components/NewSlider";
function Home() {
	let [searchParams, setSearchParams] = useSearchParams();
	let pageNum: number = Number(searchParams.get("page"));

	let { data, isLoading, isError, refetch } = useQuery<Movies>(
		[pageNum],
		() => {
			return now_playing({ page: pageNum ? pageNum : 1 });
		}
	);
	let Card: ReactNode[] | undefined = data?.results?.map(
		({ title, id, poster_path, release_date, vote_average }) => {
			return (
				<MovieCard
					title={title}
					key={id}
					id={id}
					poster_path={poster_path}
					vote_average={vote_average}
					release_date={release_date}
				/>
			);
		}
	);
	return (
		<>
			<NewSlider />
			<Grid className="container mx-auto " overflow="hidden">
				<Grid.Col span={{ base: 12, md: "content" }}>
					{isError ? (
						<Center className="mt-4 min-w-96 min-h-96  bg-neutral-900 rounded-md p-6">
							<Refetcher refetch={refetch} />
						</Center>
					) : isLoading ? (
						<Center className="mt-4 min-w-96 min-h-96  bg-neutral-900 rounded-md p-6">
							<Loader color="yellow" />
						</Center>
					) : (
						<Feed className="w-max" content={Card} title="Recent Movies" />
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

				<Grid.Col span={{ base: 0, md: "auto" }} className="" visibleFrom="md">
					<Trends />
				</Grid.Col>
			</Grid>
		</>
	);
}

export default Home;

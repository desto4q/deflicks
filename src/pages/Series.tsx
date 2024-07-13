import { Center, Grid, Loader, Pagination, Stack } from "@mantine/core";
import SearchFeed from "../components/SearchFeed";
import { useQuery } from "react-query";
import { fetch_series } from "../api/api";
import { ReactNode } from "react";
import SeriesCard, { Iseries } from "../components/sub/SeriesCard";
import { Movies } from "../types/typedeclaration";
import { useSearchParams } from "react-router-dom";
import TrendsTv from "../components/TrendsTv";

function Series() {
	let [searchParams, setSearchParams] = useSearchParams();
	let pageNum: number = Number(searchParams.get("page"));

	interface IseriesData extends Omit<Movies, "results"> {
		results: Iseries[];
	}
	let { data, isLoading } = useQuery<IseriesData>([pageNum], () => {
		return fetch_series({ page: pageNum ? pageNum : 1 });
	});
	let Cards: ReactNode | undefined = data?.results.map(
		({ name, poster_path, id, vote_average, original_language }) => {
			return (
				<SeriesCard
					name={name}
					poster_path={poster_path}
					id={id}
					key={id}
					vote_average={vote_average}
					original_language={original_language}
				></SeriesCard>
			);
		}
	);

	return (
		<Stack className="container mx-auto mt-20  p-2 md:p-0      ">
			<Grid overflow="hidden ">
				<Grid.Col span={{ base: 12, md: "content" }} component={Stack}>
					<div className="text-xl p-2 bg-neutral-900 rounded-md">Series</div>
					{isLoading ? (
						<Center className="mt-4 min-w-96 min-h-96  bg-neutral-900 rounded-md p-6">
							<Loader color="yellow" />
						</Center>
					) : (
						<SearchFeed child={Cards && Cards} />
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
					<TrendsTv overwrite="mt-0" />
				</Grid.Col>
			</Grid>
		</Stack>
	);
}

export default Series;

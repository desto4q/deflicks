import { Center, Flex, Grid, Loader, Pagination, Stack } from "@mantine/core";
import { useParams, useSearchParams } from "react-router-dom";
import SearchFeed from "../components/SearchFeed";
import { useQuery } from "react-query";
import { queryIMDB } from "../api/api";
import { ReactNode, useEffect } from "react";
import { Searches } from "../types/typedeclaration";
import SearchCard from "../components/sub/SearchCard";
import Trends from "../components/Trends";

function SearchPage() {
	let [searchParams, setSearchParams] = useSearchParams();
	let { searchParam } = useParams();
	let pageNum: number = Number(searchParams.get("page"));

	console.log(document.location);

	let { data, isLoading } = useQuery<Searches>([searchParam, pageNum], () => {
		return queryIMDB({ keyword: String(searchParam), page: pageNum | 1 });
	});
	useEffect(() => {
		console.log(data && data);
	}, []);

	let Cards: ReactNode | undefined = data?.results.map(
		({
			id,
			name,
			poster_path,

			vote_average,
			media_type,
			title,
		}) => {
			return (
				<SearchCard
					key={id}
					name={name}
					poster_path={poster_path}
					vote_average={vote_average}
					media_type={media_type}
					title={title}
					id={id}
				></SearchCard>
			);
		}
	);
	return (
		<Stack className=" mt-20 container mx-auto p-2  ">
			<Grid overflow="hidden">
				<Grid.Col span={{ base: 12, md: "content" }}>
					<Stack>
						<Flex
							className="p-2 rounded-md bg-neutral-900 "
							align={"baseline"}
							gap={"xs"}
						>
							<h2 className="text-md">Search:</h2>
							<p className="text-xl capitalize text-orange-400">
								{searchParam}
							</p>
						</Flex>
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
					</Stack>
				</Grid.Col>
				<Grid.Col span={{ base: 0, md: "auto" }} visibleFrom="md">
					<Trends overwrite="mt-0" />
				</Grid.Col>
			</Grid>
		</Stack>
	);
}

export default SearchPage;

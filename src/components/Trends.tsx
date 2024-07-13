import { Badge, Button, Center, Flex, Loader, Stack } from "@mantine/core";
import { useQuery } from "react-query";
import { trendings } from "../api/api";
import { Movies } from "../types/typedeclaration";
import { genreListMovies } from "../doc/doc";
import { Link } from "react-router-dom";

function Trends({ overwrite }: { overwrite?: string }) {
	let { data, isLoading, refetch, isError } = useQuery<Movies>(
		["trends"],
		trendings
	);

	return (
		<Stack gap={"md"} className={overwrite ? overwrite : "mt-4"}>
			<h1 className="text-xl p-2 bg-neutral-900 rounded-md">Trending Movies</h1>
			<Stack className="bg-neutral-900 p-2 rounded-md">
				{isError ? (
					<Center className="py-4">
						<Button onClick={()=>refetch}>refetch</Button>
					</Center>
				) : isLoading ? (
					<Center>
						<Loader color="orange" />
					</Center>
				) : (
					data?.results.map(({ id, title, genre_ids, poster_path }, index) => {
						if (index > 10) {
							return null;
						}
						return (
							<Flex
								component={Link}
								to={`/movie/${title}/${id}`}
								className="h-32 p-2"
								key={id}
								gap={"md"}
								justify={{ base: "center", mmd: "flex-start" }}
							>
								<img
									className="w-20 rounded-md"
									src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
								></img>
								<Stack gap={0}>
									<h1>{title}</h1>
									<Stack gap={0} visibleFrom="mmd">
										<h2 className="text-neutral-500">Genres:</h2>
										<Flex wrap={"wrap"} gap={"xs"}>
											{genre_ids?.map((item, index) => {
												if (index < 5) {
													for (let i of genreListMovies) {
														if (item == Number(i.id)) {
															return (
																<Badge
																	radius={"sm"}
																	key={i.id}
																	autoContrast
																	color="gray"
																>
																	{i.name}
																</Badge>
															);
														}
													}
												}
											})}
										</Flex>
									</Stack>
								</Stack>
							</Flex>
						);
					})
				)}
			</Stack>
		</Stack>
	);
}

export default Trends;

import { Badge, Flex, Stack } from "@mantine/core";
import { useQuery } from "react-query";
import { trendings } from "../api/api";
import { Movies } from "../types/typedeclaration";
import { genreListMovies } from "../doc/doc";

function Trends({ overwrite }: { overwrite?: string }) {
	let { data } = useQuery<Movies>(["trends"], trendings);
	return (
		<Stack gap={"md"} className={overwrite ? overwrite : "mt-4"}>
			<h1 className="text-xl p-2 bg-neutral-900 rounded-md">Trending</h1>
			<Stack className="bg-neutral-900 p-2 rounded-md">
				{data?.results.map(({ id, title, genre_ids, poster_path }, index) => {
					if (index > 10) {
						return null;
					}
					return (
						<Flex className="h-32 p-2" key={id} gap={"md"}>
							<img
								className="w-20 rounded-md"
								src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
							></img>
							<Stack gap={0}>
								<h1>{title}</h1>
								<Stack gap={0}>
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
				})}
			</Stack>
		</Stack>
	);
}

export default Trends;

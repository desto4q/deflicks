import { Badge, Flex, Stack } from "@mantine/core";
import { useQuery } from "react-query";
import { trending_tv } from "../api/api";
import { Movies, results } from "../types/typedeclaration";
import { genreListTv } from "../doc/doc";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function TrendsTv({ overwrite }: { overwrite?: string }) {
	interface Itrends extends results {
		name: string;
	}
	interface Imovies extends Omit<Movies, "results"> {
		results: Itrends[];
	}
	let { data } = useQuery<Imovies>(["trends"], trending_tv);
	useEffect(() => {
		console.log(data);
	}, []);
	return (
		<Stack gap={"md"} className={overwrite ? overwrite : "mt-4"}>
			<h1 className="text-xl p-2 bg-neutral-900 rounded-md">Trending Series</h1>
			<Stack className="bg-neutral-900 p-2 rounded-md">
				{data?.results.map(
					({ id, title, name, genre_ids, poster_path }, index) => {
						if (index > 10) {
							return null;
						}
						return (
							<Flex
								className="h-32 p-2"
								key={id}
								component={Link}
								gap={"md"}
								to={`/series/${name?.replace(" ", "-")}/${id}`}
								justify={{ base: "center", mmd: "flex-start" }}
							>
								<img
									className="w-20 rounded-md"
									src={`https://image.tmdb.org/t/p/w500//${poster_path}`}
								></img>
								<Stack gap={0} visibleFrom="mmd">
									<h1>{title ? title : name}</h1>
									<Stack gap={0}>
										<h2 className="text-neutral-500">Genres:</h2>
										<Flex wrap={"wrap"} gap={"xs"}>
											{genre_ids?.map((item, index) => {
												if (index < 5) {
													for (let i of genreListTv) {
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
					}
				)}
			</Stack>
		</Stack>
	);
}

export default TrendsTv;

import { Badge, Flex, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_episode_number, get_series } from "../api/api";
import { TVShow } from "../types/typedeclaration";
import { useQuery } from "react-query";

interface Ielist {
	air_date: string;
	episodes: [];
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
	_id: string;
}
function SeriesWatch() {
	let { name, id, seasonid, episodeid } = useParams();
	let series_id = id;
	
	let [season, setSeason] = useState<number>(Number(seasonid));

	let { data: seriesInfo } = useQuery<TVShow>([], () => {
		return get_series({ id: Number(id) });
	});
	const { data: episode_list, isLoading: epload } = useQuery<Ielist>(
		[season, id],
		async () => get_episode_number({ id: Number(id), season: season })
	);

	return (
		<Stack className="mt-20 p-2 ">
			<Flex className="container mx-auto gap-8">
				<Stack className="w-full md:w-[800px]">
					<Stack>
						<Title order={3} className="bg-neutral-950 rounded-sm w-full p-2">
							{name}:{" "}
							<span>
								Season {seasonid} Episode {episodeid}
							</span>
						</Title>
					</Stack>
					<iframe
						className="w-full h-96"
						src={`https://vidsrc.to/embed/tv/${id}/${seasonid}/${episodeid}`}
						allowFullScreen
					></iframe>

					<Stack  className="bg-neutral-950 rounded-sm w-full p-2 ">
						<Group>
							season:
							{seriesInfo?.seasons.map(({ id, season_number }) => {
								if (season_number == season) {
									return (
										<Badge
											key={id}
											radius={"sm"}
											color="orange"
											className="!cursor-pointer"
											onClick={() => {
												setSeason(season_number);
											}}
										>
											{season_number}
										</Badge>
									);
								}
								return (
									<Badge
										key={id}
										radius={"sm"}
										className="!bg-neutral-700 !cursor-pointer"
										onClick={() => {
											setSeason(season_number);
										}}
									>
										{season_number}
									</Badge>
								);
							})}
						</Group>
						<Group>
							Episodes
							{epload ? (
								<Loader color="yellow" size={"sm"} />
							) : (
								episode_list?.episodes.map(
									({ id, episode_number }) => {
										return (
											<Badge
												component={Link}
												to={`/watch/${seriesInfo?.name.replace(
													" ",
													"-"
												)}/${series_id}/season/${season}/episode/${episode_number}`}
												radius={"sm"}
												className="!bg-neutral-700 !cursor-pointer"
												key={id}
											>
												{episode_number}
											</Badge>
										);
									}
								)
							)}
						</Group>
					</Stack>
				</Stack>
				<Stack visibleFrom="md" className=" bg-neutral-950 rounded-sm p-2 w-[400px] ">
					<img
						className="w-52 rounded-sm"
						src={`https://image.tmdb.org/t/p/w300//${seriesInfo?.poster_path}`}
						alt=""
					/>
					<Group align="baseline">
						<h2 className="text-xl p-0">{seriesInfo?.name}</h2>
						<p className="text-yellow-500">{seriesInfo?.vote_average}</p>
						<p className="bg-yellow-500 text-xs text-black p-1 rounded-sm">
							{seriesInfo?.original_language.toUpperCase()}
						</p>
					</Group>
					<Text>{seriesInfo?.overview}</Text>
					<Group>
						{seriesInfo?.genres.map(({ name }) => {
							return (
								<Badge radius={"xs"} className="!bg-stone-800">
									{name}
								</Badge>
							);
						})}
					</Group>
				</Stack>
			</Flex>
		</Stack>
	);
}

export default SeriesWatch;

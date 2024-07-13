import {
	Badge,
	Divider,
	Flex,
	Group,
	Loader,
	Stack,
	Text,
	Title
} from "@mantine/core";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
	fetch_similar_series,
	get_episode_number,
	get_series
} from "../api/api";
import { Searches, TVShow } from "../types/typedeclaration";
import { ReactNode, useEffect, useState } from "react";
import SimilarFeed from "../components/SimilarFeed";
import SeriesCard from "../components/sub/SeriesCard";
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
function SeriesName() {
	let { name, id } = useParams();
	let [season, setSeason] = useState<number>(1);
	let series_id = id;

	document.title = String(name)

	let { data: seriesInfo, isFetching: siload } = useQuery<TVShow>([], () => {
		return get_series({ id: Number(id) });
	});
	const { data: episode_list, isFetching: epload } = useQuery<Ielist>(
		[season, id],
		async () => get_episode_number({ id: Number(id), season: season })
	);

	const { data: sim } = useQuery<Searches>([id], () => {
		return fetch_similar_series({ id: Number(id) });
	});

	let SimCards: ReactNode | undefined = sim?.results.map(
		({ id, name, poster_path, original_language, vote_average}) => {
			return (
				<SeriesCard
					key={id}
					name={String(name?.replace(" ", "-"))}
					poster_path={poster_path}
					vote_average={vote_average}
					original_language={original_language}
					id={id}
					reloadDoc={true}
				></SeriesCard>
			);
		}
	);
	useEffect(() => {
		console.log(siload);
	}, [siload]);

	return (
		<Stack className="mt-20 container mx-auto p-2 md:p-0">
			<Flex className="gap-10 p-2 py-4 bg-neutral-900 rounded-sm  flex-col lg:flex-row">
				<div className="min-w-[300px] h-[400px] bg-yellow-600  rounded-lg self-center lg:self-start">
					{siload ? (
						<div className="w-full h-full bg-neutral-950"></div>
					) : (
						<img
							key={series_id}
							src={`https://image.tmdb.org/t/p/w300//${seriesInfo?.poster_path}`}
							className="w-full h-full rounded-lg	object-cover"
						></img>
					)}
				</div>

				<Stack key={id} className="gap-2  self-center lg:self-start 	">
					<Group>
						<Title>
							{siload ? (
								<span>
									<Loader size={"xs"} color="yellow"></Loader>
								</span>
							) : (
								name
							)}
						</Title>
						<Divider orientation="vertical" size={"xs"} />
						<Badge radius={"sm"} color="orange">
							{seriesInfo?.languages[0]}
						</Badge>
						<Divider orientation="vertical" size={"xs"} />
						<p>{seriesInfo?.vote_average}</p>
					</Group>
					<Group>
						<p>{seriesInfo?.episode_run_time} mins</p>
					</Group>
					<Group>
						{seriesInfo?.genres.map(({ id, name }) => {
							return (
								<Badge radius={"sm"} className="!bg-neutral-700" key={id}>
									{name}
								</Badge>
							);
						})}
					</Group>
					<Text>{seriesInfo?.overview}</Text>
					<Group>
						Season:{" "}
						{siload ? (
							<Loader color="yellow" size={"xs"} />
						) : (
							<Group>
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
						)}
					</Group>
					<Group>
						Episodes:{" "}
						<Group>
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
					</Group>
				</Stack>
			</Flex>

			<Stack>
				<Title order={2} className="bg-neutral-900 p-2 rounded-sm">
					{" "}
					Similar: series
				</Title>
				<SimilarFeed child={SimCards && SimCards} />
			</Stack>
		</Stack>
	);
}

export default SeriesName;

import { Badge, Flex, Group, Stack, Text} from "@mantine/core";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { get_movie_details } from "../api/api";
import { useEffect } from "react";
interface IMovie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: { id: number; name: string }[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
function MovieWatch() {
	let { id, name } = useParams();
	let { data: movieInfo } = useQuery<IMovie>([name, id], () => {
		return get_movie_details({ id: Number(id) });
	});
	useEffect(() => {
		console.log(movieInfo);
	}, [movieInfo]);
	return (
		<Stack className="container mt-20 mx-auto p-2 md:p-0">
			<Flex className="gap-4 ">
				<Stack className="w-full md:w-[800px]">
					<Flex
						className="bg-neutral-900 p-2 rounded-md  gap-2"
						align={"baseline"}
					>
						<h2 className="text-lg">Movie:</h2>
						<h2 className="text-xl text-orange-400">{name}</h2>
					</Flex>
					<iframe
						allowFullScreen
						frameBorder={0}
						allow="fullscreen"
						className="w-full h-96"
						src={`https://vidsrc.to/embed/movie/${id}`}
					></iframe>
				</Stack>
				<Stack
					visibleFrom="md"
					className=" bg-neutral-950 rounded-md p-3 w-[450px]"
				>
					
					<img className="w-[200px] rounded-md" src={`https://image.tmdb.org/t/p/w300//${movieInfo?.poster_path}`}/>
					<Group align="baseline">
						<h2 className="text-xl p-0">{movieInfo?.title}</h2>
						<p className="text-yellow-500">{movieInfo?.vote_average}</p>
						<p className="bg-yellow-500 text-xs text-black p-1 rounded-sm">
							{movieInfo?.original_language.toUpperCase()}
						</p>
					</Group>
					<Text>
						{movieInfo?.overview}
					</Text>
					<Group>
						{movieInfo?.genres.map(({ name }) => {
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

export default MovieWatch;

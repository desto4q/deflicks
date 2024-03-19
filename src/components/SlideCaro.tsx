import { Carousel } from "@mantine/carousel";
import { useQuery } from "react-query";
import { popular } from "../api/api";
import {
	Badge,
	Button,
	Divider,
	Group,
	Image,
	Stack,
	Text,
} from "@mantine/core";
import { PlayCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Slidecaro() {
	type results = {
		adult: boolean;
		backdrop_path: string;
		genre_ids: number[];
		id: number;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		release_date: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	};
	type Movies = {
		page: number;
		results: results[];
		total_pages: number;
	};
	let { data, isLoading, isError, refetch } = useQuery<Movies>(
		["querydata"],
		popular
	);

	return (
		<div className="w-full  2xl:container mx-auto h-dvh max-[1080px] isolate">
			<Carousel loop  className="h-full bg-neutral-800 w-full">
				{data?.results.map(
					({
						backdrop_path,
						title,
						overview,
						release_date,
						vote_average,
						id,
					}) => {
						return (
							<Carousel.Slide className=" h-dvh max-[1080px] " key={id}>
								<Image
									fit="cover"
									loading="lazy"
									className="h-full w-full brightness-50"
									src={`https://image.tmdb.org/t/p/w1280//${backdrop_path}`}
								/>
								<Stack className=" px-12 md:px-20  absolute bottom-0 h-80 bg-gradient-to-t from-black  to-transparent  w-full drop-shadow-lg">
									<h1
										className="font-semibold text-3xl  md:text-5xl "
										style={{ textShadow: "0 2px 5px black " }}
									>
										{title}
									</h1>
									<Group>
										<Badge
											radius="xs"
											size="lg"
											className="!text-black !bg-orange-500"
										>
											HD
										</Badge>

										<Text style={{ textShadow: "0 2px 5px black " }}>
											{" "}
											{release_date}
										</Text>
										<Divider orientation="vertical" />
										<Text
											style={{ textShadow: "0 2px 5px black " }}
											className="!text-orange-500"
										>
											{vote_average}
										</Text>
									</Group>
									<Text
										lineClamp={3}
										fs={{ base: "xs", md: "lg" }}
										className="max-w-[600px]"
										style={{ textShadow: "0 2px 5px black " }}
									>
										{overview}
									</Text>
									<Group>
										<Button
											component={Link}
											to={"/"}
											size="md"
											className=" !bg-orange-500 hover:!bg-orange-600   text-black p-2 rounded-sm "
											rightSection={<PlayCircle size={"24"} />}
										>
											watch now
										</Button>
										<Button
											size="md"
											variant="outline"
											component={Link}
											color="orange"
											to={"/"}
											className=" outline-1 p-2 rounded-sm px-4"
										>
											See more
										</Button>
									</Group>
								</Stack>
							</Carousel.Slide>
						);
					}
				)}
			</Carousel>
		</div>
	);
}

export default Slidecaro;

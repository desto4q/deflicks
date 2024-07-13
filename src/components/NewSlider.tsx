import { useEffect, useMemo } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import "./sliderstyle.scss";
import { useQuery } from "react-query";
import { popular } from "../api/api";
import {
	Badge,
	Button,
	Center,
	Divider,
	Group,
	Loader,
	Stack,
	Text,
} from "@mantine/core";
import { PlayCircle, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import withAutoplay from "react-awesome-slider/dist/autoplay";

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

type direction = boolean | undefined;
const arrowSize = 28;
let NewBtn = ({ direction }: { direction: direction }) => {
	return (
		<div className="bg-white opacity-70 animate-pulse hover:animate-none aspect-auto p-2 rounded-full bg-opacity-75">
			{direction ? (
				<ArrowRight size={arrowSize} />
			) : (
				<ArrowLeft size={arrowSize} />
			)}
		</div>
	);
};

export let Refetcher = ({ refetch }: { refetch: () => void }) => {
	return (
		<Center>
			<Button onClick={refetch}>refetch</Button>
		</Center>
	);
};
let temp_array = Array(10).fill(() => {
	return <Button>refetch</Button>;
});
let dummy_items = temp_array.map((e, i) => {
	return <div key={i}>{e}</div>;
});
const NewSlider = () => {
	const AutoplaySlider = useMemo(() => withAutoplay(AwesomeSlider), []);
	let { data, isError, refetch, isFetching } = useQuery<Movies>(
		["querydata"],
		popular
	);
	useEffect(() => {
		console.log(isError);
	}, [isError]);

	return (
		<div className="w-full 2xl:container mx-auto h-dvh max-h-[1080px] isolate mb-12 mt-16">
			<AutoplaySlider
				play={isError ? false : true}
				interval={5000}
				organicArrows={false}
				buttonContentRight={<NewBtn direction={true} />}
				buttonContentLeft={<NewBtn direction={undefined} />}
				transitionDelay={25}
				bullets={false}
				animation="scaleOutAnimation"
				className="myslider h-full "
				activityColor="black"
			>
				{isError ? (
					<div className="bg-neutral-800 w-full h-full flex">
						<Button  className="m-auto" onClick={()=>refetch}>reftech</Button>
					</div>
				) : // <Refetcher refetch={refetch} />
				isFetching ? (
					<div className="w-full h-full rounded-md   bg-neutral-900  flex">
						<Loader color="yellow" className="m-auto " />
					</div>
				) : (
					data?.results.map(
						({
							backdrop_path,
							title,
							overview,
							release_date,
							vote_average,
							id,
						}) => {
							return (
								<div className="w-full h-full " key={id}>
									<img
										loading="lazy"
										className="h-full w-full brightness-50 pointer-events-none object-cover"
										src={`https://image.tmdb.org/t/p/w1280//${backdrop_path}`}
									/>
									<Stack className=" px-6 md:px-20  absolute bottom-0 h-80 bg-gradient-to-t from-black  to-transparent  w-full drop-shadow-lg">
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
								</div>
							);
						}
					)
				)}
			</AutoplaySlider>
		</div>
	);
};

export default NewSlider;
